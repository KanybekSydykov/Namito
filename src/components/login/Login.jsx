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

const Login = ({ params }) => {
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleLogin = async (phone) => {
    setIsCodeSent((prev) => !prev);
    const credentials = {
      phone_number: phone,
    };
  
    try {
      const res = await fetch(ENDPOINTS.postLogin(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
  
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      // Handle the fact that res.json() won't work
      const data = await res.json(); // Assume success based on no error
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
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

        {isCodeSent ? <Otp handleLogin={handleLogin} isCodeSent={isCodeSent}/> : <Form handleLogin={handleLogin}/>}
       

       
      </Flex>
    </Flex>
  );
};

export default Login;
