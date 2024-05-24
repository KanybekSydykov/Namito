import { Flex, Text,useMediaQuery } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const ProfileOrders = ({ params }) => {
  const [isDesktop] = useMediaQuery("(min-width: 992px)");

  const mobileOrders = (
    <Link href={`/${params.locale}/profile/order?id=123232`}>
      <Flex
        fontFamily={"roboto"}
        fontSize={"16px"}
        lineHeight={"24px"}
        flexDir={"column"}
        gap={"22px"}
        py={"16px"}
        bg={"#fff"}
        _hover={{
          bg: "rgba(232, 236, 239, 1)",
        }}
        position={"relative"}
        px={"16px"}
        _after={{
          content: '""',
          position: "absolute",
          bottom: 0,
          left: "16px",
          right: "16px",
          width: "calc(100% - 32px)",
          height: "1px",
          background: "rgba(232, 236, 239, 1)",
        }}
      >
        <Flex flexDir={"row"}>
          <Text w={"50%"} fontWeight={"300"}>
            Номер заказа
          </Text>
          <Text w={"50%"} fontWeight={"400"}>
            #3456_768
          </Text>
        </Flex>
        <Flex flexDir={"row"}>
          <Text w={"50%"} fontWeight={"300"}>
            Дата заказа
          </Text>
          <Text w={"50%"} fontWeight={"400"}>
            Октябрь 17, 2023
          </Text>
        </Flex>
        <Flex flexDir={"row"}>
          <Text w={"50%"} fontWeight={"300"}>
            Статус заказа
          </Text>
          <Text w={"50%"} fontWeight={"400"}>
            В процессе
          </Text>
        </Flex>
        <Flex flexDir={"row"}>
          <Text w={"50%"} fontWeight={"300"}>
            Общая цена
          </Text>
          <Text w={"50%"} fontWeight={"400"}>
            1234 сом
          </Text>
        </Flex>
      </Flex>
    </Link>
  );

  const desktopOrders = (
    <Flex
      fontFamily={"roboto"}
      fontSize={"16px"}
      lineHeight={"24px"}
      flexDir={"column"}
      py={"16px"}
      bg={"#fff"}
      position={"relative"}
      px={"16px"}
    >
      <Flex flexDir={"row"} ps={"5px"} mb={'20px'}>
        <Text w={"50%"} fontWeight={"300"}>
          Номер заказа
        </Text>

        <Text w={"50%"} fontWeight={"300"}>
          Дата заказа
        </Text>

        <Text w={"50%"} fontWeight={"300"}>
          Статус заказа
        </Text>

        <Text w={"50%"} fontWeight={"300"}>
          Общая цена
        </Text>
      </Flex>
      <Link href={`/${params.locale}/profile/order?id=123232`}>
        <Flex
          flexDir={"row"}
          bg={"#fff"}
          _hover={{
            bg: "rgba(232, 236, 239, 1)",
          }}
          py={"8px"}
          ps={"5px"}
          borderRadius={"10px"}
          pos={"relative"}
          _after={{
            content: '""',
            position: "absolute",
            bottom: 0,
            left: "8px",
            right: "8px",
            width: "auto",
            height: "1px",
            background: "rgba(232, 236, 239, 1)",
          }}
        >
          <Text w={"50%"} fontWeight={"400"}>
            #3456_768
          </Text>
          <Text w={"50%"} fontWeight={"400"}>
            Октябрь 17, 2023
          </Text>
          <Text w={"50%"} fontWeight={"400"}>
            В процессе
          </Text>
          <Text w={"50%"} fontWeight={"400"}>
            1234 сом
          </Text>
        </Flex>
      </Link>
   
    </Flex>
  );

  return (
    <Flex flexDir={"column"} pb={"30px"} width={{base:'100%',lg:'700px'}}>
      {isDesktop ? desktopOrders : mobileOrders}
    </Flex>
  );
};

export default ProfileOrders;
