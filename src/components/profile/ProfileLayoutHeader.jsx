"use client";
import { useParams } from "next/navigation";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function ProfileLayoutHeader({title}) {
  const { locale, orderId } = useParams();
  return (
    <Flex
      flexDir={"row"}
      gap={"16px"}
      py={"4px"}
      px={"16px"}
      alignItems={"center"}
    >
      <Link href={orderId ? `/${locale}/profile/orders` : `/${locale}/profile`}>
        <Flex
          w={"32px"}
          h={"32px"}
          boxShadow={"0 0 4px 0 rgba(151, 151, 151, 0.25)"}
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius={"50%"}
        >
          <ChevronLeftIcon w={"25px"} h={"25px"} color={"#000"} />
        </Flex>
      </Link>

      <Text
        fontFamily={"roboto"}
        fontWeight={"700"}
        fontSize={"16px"}
        lineHeight={"22px"}
      >
        {title ? title : orderId ? "Мои заказы" : "Личные данные"}
      </Text>
    </Flex>
  );
}
