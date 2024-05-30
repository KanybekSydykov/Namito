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
import React, { useState } from "react";
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
  const [error, setError] = useState("");
  const [isRequesting, setIsRequesting] = useState(false);
  const toast = useToast();

  params.locale === 'ru' ? setError('Номер телефона должен начинаться с +996') : setError('Phone number must start with +996');
  const handleLogin = async (phone) => {
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
        title: error,
        status: "error",
        duration: 3000,
        position: "top-left",
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
        left={0}
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


        {isCodeSent ? <Otp phone={phone} handleChangeNumber={handleChangeNumber} handleResendOtp={handleResendOtp} isCodeSent={isCodeSent} statusOtp={statusOtp}/> : <Form isRequesting={isRequesting} isError={error} handleLogin={handleLogin}/>}
       

       
      </Flex>
    </Flex>
  );
};

export default Login;
