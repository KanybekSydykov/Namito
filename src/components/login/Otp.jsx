"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Flex,
  Text,
  PinInput,
  PinInputField,
  HStack,
  Button,
  Mark,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { requestOtp } from "@/lib/apiServices";
import { ENDPOINTS } from "@/API/endpoints";
import {login} from "@/lib/lib";
import { useParams, useRouter } from "next/navigation";

const Otp = ({ handleLogin, isCodeSent, statusOtp ,handleResendOtp,phone}) => {
  const [time, setTime] = useState(60);
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  const {locale} = useParams();
  const [isRequesting, setIsRequesting] = useState(false);
  const [code, setCode] = useState("");


  useEffect(() => {
    // exit early when we reach 0
    if (!time) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTime(time - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add time as a dependency to re-rerun the effect
    // when we update it
  }, [time]);

  const handleOtpEnter = async (value) => {
    setCode(value);
    setIsRequesting(true);
    try {
      const response = await requestOtp({ code: value }, ENDPOINTS.postVerifyCode());
  
      if (response.data.access_token && response.data.refresh_token) {
        await login({
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
          first_visit: response.data.first_visit ? 'true' : 'false'
        });
      }
  
      if (response.status === 200 && response.data.first_visit) {
        router.push(`/${locale}/profile?page=settings`);
      } else if (response.status === 200 && !response.data.first_visit) {
        router.push(`/`);

      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error('An error occurred during OTP verification:', error);
      if (error.response && error.response.status === 400) {
        setIsError(true);
      } else {
        setIsError(true);
      }
      setIsError(true);
    }
  };
  const handleRequestOtp = () => {
    setTime(60);
    handleResendOtp();
  }

  return (
    <Flex
      w={{ base: "100%", lg: "550px" }}
      mx={"auto"}
      py={{ base: "90px", lg: "107px" }}
      flexDir={"column"}
      gap={"40px"}
      px={{ base: "20px", lg: "60px" }}
      fontFamily={"roboto"}
      bg={"#fff"}
      borderRadius={"10px"}
      pos={"relative"}
      zIndex={4}
    >
      <ArrowBackIcon
        pos={"absolute"}
        top={"16px"}
        left={"16px"}
        w={"24px"}
        h={"24px"}
        z={10}
        onClick={handleLogin}
      />
      <Flex
        w={"100%"}
        flexDir={"column"}
        px={"8px"}
        gap={"20px"}
        color={"rgba(51, 51, 51, 1)"}
        textAlign={"center"}
      >
        <Text fontWeight={"700"} fontSize={"22px"} lineHeight={"30px"}>
          Введите код
        </Text>

        <Text fontWeight={"400"} fontSize={"18px"} lineHeight={"25px"}>
          4 - значный код отправлен на номер
        </Text>
        <Text fontWeight={"400"} fontSize={"18px"} lineHeight={"25px"}>
         {phone}
        </Text>
      </Flex>

      <HStack mx={"auto"} gap={"20px"}>
        <PinInput otp={true} onComplete={(value) => handleOtpEnter(value)}>
          <PinInputField
            bg={"rgba(0, 0, 0, 0.1)"}
            color={"orange"}
            _focus={{
              borderColor: "#B33E08",
              boxShadow: "0 0 0 1px #B33E08",
              bg: "#fff",
            }}
          />
          <PinInputField
            bg={"rgba(0, 0, 0, 0.1)"}
            color={"orange"}
            _focus={{
              borderColor: "#B33E08",
              boxShadow: "0 0 0 1px #B33E08",
              bg: "#fff",
            }}
          />
          <PinInputField
            bg={"rgba(0, 0, 0, 0.1)"}
            color={"orange"}
            _focus={{
              borderColor: "#B33E08",
              boxShadow: "0 0 0 1px #B33E08",
              bg: "#fff",
            }}
          />
          <PinInputField
            bg={"rgba(0, 0, 0, 0.1)"}
            color={"orange"}
            _focus={{
              borderColor: "#B33E08",
              boxShadow: "0 0 0 1px #B33E08",
              bg: "#fff",
            }}
          />
        </PinInput>
      </HStack>
      {isError ? (
        <Text
          as={motion.p}
          initial={{ x: 0 }}
          animate={{ x: [0, 30, -30, 15, -15, 10, -10, 0] }}
          textAlign={"center"}
          color={"red"}
        >
          Код введен неверно. Пожалуйста повторите попытку
        </Text>
      ) : null}

      <Button
        bg={"#FFF"}
        border={"1px solid #B33E08"}
        borderRadius={"10px"}
        py={"14px"}
        color={"orange"}
        textAlign={"center"}
        fontWeight={"400"}
        fontSize={"18px"}
        lineHeight={"25px"}
        h={"auto"}
        _hover={{
          bg: "orange",
          color: "#fff",
          border: "1px solid #fff",
        }}
        _focus={{
          bg: "orange",
          color: "#fff",
          border: "1px solid #fff",
        }}
        onClick={() => handleOtpEnter(code)}
        disabled={isRequesting ? true : false}
      >
        Войти
      </Button>

      {time ? (
        <Text
          fontFamily={"roboto"}
          fontWeight={"300"}
          fontSize={"16px"}
          lineHeight={"24px"}
          color={"#333333"}
          textAlign={"center"}
        >
          Повторно код можно отправить через <br />
          <Mark color={"orange"} fontWeight={"400"} display={"inline"}>
            {" "}
            {time}{" "}
          </Mark>
          секунд
        </Text>
      ) : (
        <Text
          fontWeight={"300"}
          fontFamily={"roboto"}
          fontSize={"16px"}
          lineHeight={"24px"}
          color={"orange"}
          textDecoration={"underline"}
          textAlign={"center"}
          textUnderlineOffset={"2px"}
          onClick={handleRequestOtp}
        >
          Отправить код еще раз
        </Text>
      )}
    </Flex>
  );
};

export default Otp;
