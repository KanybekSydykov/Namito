"use client";

import React, { useEffect, useState } from "react";
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

const PW = "1234";
const Otp = ({ handleLogin, isCodeSent }) => {
  const [time, setTime] = useState(60);
  const [isError, setIsError] = useState(false);

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

  const handleOtpEnter = (value) => {
    console.log(value,PW);

    if(value !== PW ){ 
        console.log('otp doesnt match');
        console.log(value,PW);
        setIsError(true);
    } else {
      console.log('valid and can login');
      setIsError(false);
      setTime(0);
    }
  }

  console.log('is error ' , isError);

  return (
    <Flex
      w={{base:"100%",lg:'550px'}}
      mx={'auto'}
      py={{base:"90px",lg:'107px'}}
      flexDir={"column"}
      gap={"40px"}
      px={{base:"20px",lg:'60px'}}
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
        +996 500 500 500
        </Text>
      </Flex>

      <HStack mx={"auto"} gap={"20px"}>
        <PinInput
          otp={true}
          onComplete={(value)=>handleOtpEnter(value)}
        >
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
        initial={{x:0}}
        animate={{x:[0,30,-30,15,-15,10,-10,0]}}
        textAlign={"center"} 
        color={"red"}>
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
        onClick={()=>handleOtpEnter(PW)}
        disabled={isError}
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
          onClick={() => setTime(60)}
        >
          Отправить код еще раз
        </Text>
      )}
    </Flex>
  );
};

export default Otp;
