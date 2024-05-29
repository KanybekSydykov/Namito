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
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
import Form from "./Form";
import Otp from "./Otp";
import { ENDPOINTS } from "@/API/endpoints";
import { requestOtp } from "@/lib/apiServices";

const Login = ({ params }) => {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [statusOtp, setStatusOtp] = useState("");
  const [phone,setPhone]= useState("");

  const handleLogin = async (phone) => {
    setPhone(phone);
    setIsCodeSent((prev) => !prev);
    const credentials = {
      phone_number: phone,
    };
    
    const data = await requestOtp(credentials,ENDPOINTS.postLogin());
    
    setStatusOtp(data.data.status);
    
  };

  const handleResendOtp = async () => {
    const data = await requestOtp({ phone_number: phone },ENDPOINTS.postLogin());
    setStatusOtp(data.status);
  };



  
  

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
        <Text
        position={'absolute'}
        top={'0px'}
        left={0}
        w={'120px'}
        >{params.locale}</Text>

        {isCodeSent ? <Otp phone={phone} handleLogin={handleLogin} handleResendOtp={handleResendOtp} isCodeSent={isCodeSent} statusOtp={statusOtp}/> : <Form handleLogin={handleLogin}/>}
       

       
      </Flex>
    </Flex>
  );
};

export default Login;
