'use client';

import React,{useState} from 'react'
import { Flex, Text,Box, Input, Button,  } from '@chakra-ui/react'
import Image from 'next/image'
const Form = ({handleLogin}) => {

  const [phone, setPhone] = useState("");

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
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
          {/* Providers */}
          <Flex
            w={"100%"}
            flexDir={"column"}
            gap={"16px"}
            fontFamily={"roboto"}
            fontWeight={"300"}
            fontSize={"16px"}
            lineHeight={"24px"}
            color={"rgba(51, 51, 51, 1)"}
          >
            <Flex
              flexDir={"row"}
              gap={"16px"}
              alignItems={"center"}
              justifyContent={"center"}
              py={"13px"}
              border={"1px solid rgba(54, 54, 54, 1)"}
              borderRadius={"10px"}
            >
              <Image
                src={"/google-icon.svg"}
                alt={"google"}
                width={24}
                height={24}
              />

              <Text>Вход через Google</Text>
            </Flex>
            <Flex
              flexDir={"row"}
              gap={"16px"}
              alignItems={"center"}
              justifyContent={"center"}
              py={"13px"}
              border={"1px solid rgba(54, 54, 54, 1)"}
              borderRadius={"10px"}
            >
              <Image
                src={"/apple-icon.svg"}
                alt={"google"}
                width={24}
                height={24}
              />

              <Text>Вход через Apple</Text>
            </Flex>
          </Flex>

          {/* Divider */}
          <Box
            position={"relative"}
            width={"100%"}
            _after={{
              content: "''",
              position: "absolute",
              width: "100%",
              height: "2px",
              backgroundColor: "rgba(223, 223, 223, 1)",
              top: "calc(50% - 1px)",
              left: "0",
              zIndex: "1",
            }}
          >
            <Text
              width={"max-content"}
              px={"23px"}
              bg={"#fff"}
              fontFamily={"roboto"}
              fontWeight={"300"}
              fontSize={"16px"}
              lineHeight={"24px"}
              pos={"relative"}
              zIndex={2}
              mx={"auto"}
            >
              Или
            </Text>
          </Box>
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
            <Text>Введите номер</Text>
            <Input
              placeholder="+996"
              py={"13.5px"}
              height={"auto"}
              borderRadius={"10px"}
              borderColor={"rgba(160, 160, 160, 1)"}
              onChange={handlePhoneChange}
              value={phone}
              _focus={{ borderColor: "orange" }}
              _hover={{ borderColor: "orange" }}
              _focusVisible={{ borderColor: "orange" }}
            />

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
            >
              Получить код
            </Button>
          </Flex>
        </Flex>
  )
}

export default Form