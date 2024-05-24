"use client";

import { Flex, Box, Text, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import Image from "next/image";

const ProfileSettings = () => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <Flex
      flexDir={"column"}
      gap={"30px"}
      fontFamily={"roboto"}
      position={"relative"}
      pb={'20px'}
      px={'16px'}
      w={"100%"}
    >

        <Box w={"80px"} h={"80px"} pos={"relative"}>
          <Image
            src={"/profile-icons/profile-icon.svg"}
            width={80}
            alt="profile"
            height={80}
          />
          <Image
            src={"/profile-icons/captureIcon.svg"}
            width={30}
            height={30}
            alt="profile caputre icon"
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              cursor: "pointer",
              zIndex: 1,
            }}
          />
        </Box>

      <Flex flexDir={"column"} gap={"16px"}>
        <Flex flexDir={"column"} gap={"9px"}>
          <Text
            fontWeight={"300"}
            fontSize={"16px"}
            lineHeight={"24px"}
            color={"rgba(54, 54, 54, 1)"}
          >
            Ваше ФИО *
          </Text>
          <Input
            placeholder="Например: Асанов Асан"
            py={"13.5px"}
            height={"auto"}
            readOnly={isEdit ? false : true}
            borderRadius={"10px"}
            borderColor={isEdit ? "rgba(160, 160, 160, 1)" : "transparent"}
            _focus={{ borderColor: isEdit ? "orange" : "transparent" }}
            _hover={{ borderColor: isEdit ? "orange" : "transparent" }}
            _focusVisible={{ borderColor: isEdit ? "orange" : "transparent" }}
            transition={"all 0.3s ease"}
          />
        </Flex>
        <Flex flexDir={"column"} gap={"9px"}>
          <Text
            fontWeight={"300"}
            fontSize={"16px"}
            lineHeight={"24px"}
            color={"rgba(54, 54, 54, 1)"}
          >
            Дата рождения *
          </Text>
          <Input
            placeholder="дд.мм.гггг"
            py={"13.5px"}
            height={"auto"}
            readOnly={isEdit ? false : true}
            borderRadius={"10px"}
            borderColor={isEdit ? "rgba(160, 160, 160, 1)" : "transparent"}
            _focus={{ borderColor: isEdit ? "orange" : "transparent" }}
            _hover={{ borderColor: isEdit ? "orange" : "transparent" }}
            _focusVisible={{ borderColor: isEdit ? "orange" : "transparent" }}
            transition={"all 0.3s ease"}
          />
        </Flex>
        <Flex flexDir={"column"} gap={"9px"}>
          <Text
            fontWeight={"300"}
            fontSize={"16px"}
            lineHeight={"24px"}
            color={"rgba(54, 54, 54, 1)"}
          >
            Электронный адрес почты (e-mail) *
          </Text>
          <Input
            placeholder="example@gmail.com"
            py={"13.5px"}
            height={"auto"}
            readOnly={isEdit ? false : true}
            borderRadius={"10px"}
            borderColor={isEdit ? "rgba(160, 160, 160, 1)" : "transparent"}
            _focus={{ borderColor: isEdit ? "orange" : "transparent" }}
            _hover={{ borderColor: isEdit ? "orange" : "transparent" }}
            _focusVisible={{ borderColor: isEdit ? "orange" : "transparent" }}
            transition={"all 0.3s ease"}
          />
        </Flex>
        <Flex flexDir={"column"} gap={"9px"}>
          <Text
            fontWeight={"300"}
            fontSize={"16px"}
            lineHeight={"24px"}
            color={"rgba(54, 54, 54, 1)"}
          >
          Номер телефона *
          </Text>
          <Input
            placeholder="+996 xxx xxx xxx"
            py={"13.5px"}
            height={"auto"}
            readOnly={isEdit ? false : true}
            borderRadius={"10px"}
            borderColor={isEdit ? "rgba(160, 160, 160, 1)" : "transparent"}
            _focus={{ borderColor: isEdit ? "orange" : "transparent" }}
            _hover={{ borderColor: isEdit ? "orange" : "transparent" }}
            _focusVisible={{ borderColor: isEdit ? "orange" : "transparent" }}
            transition={"all 0.3s ease"}
          />
        </Flex>
      </Flex>

      <Button
          width={"100%"}
          maxW={{base:'unset',lg:'355px'}}
          onClick={() => setIsEdit((prev) => !prev)}
          textAlign={'center'}
          py={'15px'}
          borderRadius={'10px'}
          bg={isEdit ? 'rgba(56, 161, 105, 0.5)' : 'rgba(203, 70, 9, .75)'}
          color={'#fff'}
          fontSize={'18px'}
          lineHeight={'25px'}
          fontWeight={'400'}
          mx='auto'
          h={'auto'}
          _hover={{
            bg: isEdit ? 'rgba(56, 161, 105, 1)' : 'rgba(203, 70, 9, 1)',
          }}
        >
          {isEdit ? "Сохранить" : "Редактировать"}
        </Button>
    </Flex>
  );
};

export default ProfileSettings;
