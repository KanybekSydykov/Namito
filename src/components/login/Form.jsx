'use client';

import React,{useEffect, useState} from 'react'
import { Flex, Text,Box, Input, Button,  } from '@chakra-ui/react'
import Image from 'next/image'
import {motion} from 'framer-motion'
const Form = ({handleLogin,isError,isRequesting}) => {

  const [phone, setPhone] = useState("");

  useEffect(() => {
  }, [isError,isRequesting]);

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin(phone);
    }
  };

  return (
    <Flex
          flexDir={"column"}
          bg={"#fff"}
          py={"50px"}
          px={{base:"10px",lg:'60px'}}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"35px"}
          borderRadius={"10px"}
          width={{base:'100%',lg:'550px'}}
          mx={'auto'}
        >
          <Text
            fontFamily={"roboto"}
            fontSize={"18px"}
            fontWeight={"700"}
            lineHeight={"25px"}
            color={"rgba(51, 51, 51, 1)"}
          >
            Вход
          </Text>
          {/* OTP provider */}
          <Flex
            fontFamily={"roboto"}
            fontWeight={"300"}
            lineHeight={"27px"}
            fontSize={"18px"}
            color={"rgba(102, 102, 102, 1)"}
            flexDir={"column"}
            gap={"8px"}
            w={"100%"}
          >
            <Text textAlign={'center'}>Введите номер</Text>
            <Input
              placeholder="+996"
              py={"13.5px"}
              height={"auto"}
              borderRadius={"10px"}
              type='tel'
              borderColor={"rgba(160, 160, 160, 1)"}
              onChange={handlePhoneChange}
              onKeyDown={handleKeyDown}
              value={phone}
              _focus={{ borderColor: "orange" }}
              _hover={{ borderColor: "orange" }}
              _focusVisible={{ borderColor: "orange" }}
            />
                  {isError ? (
        <Text
          as={motion.p}
          initial={{ x: 0 }}
          animate={{ x: [0, 30, -30, 15, -15, 10, -10, 0] }}
          textAlign={"center"}
          color={"red"}
        >
          {isError}
        </Text>
      ) : null}

            <Button
              bg={"orange"}
              color={"#fff"}
              borderRadius={"10px"}
              fontFamily={"roboto"}
              fontWeight={"400"}
              fontSize={"18px"}
              lineHeight={"25px"}
              textAlign={"center"}
              py={"15px"}
              h={"auto"}
              mt={"18px"}
              border={'1px solid #B33E08'}
              _hover={{
                bg:'transparent',
                color:'orange',

              }}
              onClick={()=>handleLogin(phone)}
              isLoading={isRequesting}
              loadingText='Отправка...'
              colorScheme='teal'
            >
              Получить код
            </Button>
          </Flex>
        </Flex>
  )
}

export default Form