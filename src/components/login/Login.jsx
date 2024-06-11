"use client";

import {
  Box,
  Flex,
  Input,
  Text,
  Button,
  PinInput,
  PinInputField,
  HStack,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Form from "./Form";
import Otp from "./Otp";
import { ENDPOINTS } from "@/API/endpoints";
import { requestOtp } from "@/lib/apiServices";
import Link from "next/link";
import { ChevronRightIcon } from "@chakra-ui/icons";

const Login = ({ params }) => {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [statusOtp, setStatusOtp] = useState("");
  const [phone,setPhone]= useState("");
  const [errorMsg,setErrorMsg] = useState("");
  const [isRequesting, setIsRequesting] = useState(false);
  const toast = useToast();


  useEffect(() => {
    if (params.locale === 'ru') {
      setErrorMsg('Номер телефона должен начинаться с +996');
    } else {
      setErrorMsg('Phone number must start with +996');
    }
  }, [params.locale]);

  const handleLogin = async (phone) => {

    if(phone === ''){
      toast({
        title: params.locale === 'ru' ? 'Номер телефона не может быть пустым' : 'Phone number cannot be empty',
        status: "error",
        duration: 3000,
        position: "bottom",
        isClosable: true,
      })
      return;
    }

    setPhone(phone);
    setIsRequesting(true);
    const credentials = {
      phone_number: phone,
    };

    const data = await requestOtp(credentials,ENDPOINTS.postLogin(),params.locale);
    console.log(data);
    if(data.status >= 200 && data.status < 400){
      setIsCodeSent(true);
      setIsRequesting(false);
    } else {
      setIsCodeSent(false);
      toast({
        title: errorMsg,
        status: "error",
        duration: 3000,
        position: "bottom",
        isClosable: true,
      })
      setIsRequesting(false);
    }
    
    setStatusOtp(data.data.status);
    
  };
  const handleResendOtp = async () => {
    const data = await requestOtp({ phone_number: phone },ENDPOINTS.postLogin());
    setStatusOtp(data.status);
  };


  function handleChangeNumber() {
    setIsCodeSent(false);
  }

  
  

  return (
    <Flex
      width={"100dvw"}
      height={"100dvh"}
      backgroundImage={`url('/login-bg.png')`}
      bgPos={"center"}
      bgSize={"cover"}
      bgRepeat={"no-repeat"}
      pt={"40px"}
      px={"16px"}
      pos={"relative"}
      zIndex={0}
      _after={{
        content: "''",
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        zIndex: "1",
      }}
    >
      <Flex
        position={"relative"}
        maxW={{ base: "100%", lg: "1200px", xl: "1200px", "2xl": "1440px" }}
        mx={'auto'}
        zIndex={3}
        width={"100%"}
        flexDir={"column"}
        justifyContent={'center'}
        gap={"40px"}
      >
        <Flex 
        flexDir={'row'} 
        gap={'1px'}
        position={'absolute'}
        top={'0px'}
        left={'16px'}
        w={'max-content'}
        
        alignItems={'center'}
        >
          <Link href={`/${params.locale}`}>
          <Image src={'/home-icon-bw.svg'} alt="logo" width={20} height={20} />
          </Link>
          <ChevronRightIcon color={'gray.500'} w={'18px'} h={'18px'} />
          <Text

        >
          {params.locale === 'ru' ? 'Вход' : 'Login'}
          </Text>
        </Flex>


        {isCodeSent ? <Otp phone={phone} handleChangeNumber={handleChangeNumber} handleResendOtp={handleResendOtp} isCodeSent={isCodeSent} statusOtp={statusOtp}/> : <Form isRequesting={isRequesting} handleLogin={handleLogin}/>}
       

       
      </Flex>
    </Flex>
  );
};

export default Login;
