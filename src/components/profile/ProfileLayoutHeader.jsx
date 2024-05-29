"use client";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function ProfileLayoutHeader({title}) {
  const { locale, orderId } = useParams();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  if(page === null){
    return <></>
  }

  console.log(page);

  function getPageName(page){
    switch (page) {
      case "orders":
        return "Мои заказы";
      case "settings":
        return "Личные данные";
      case "adresses":
        return "Мои адреса";
      case "reviews":
        return "Мои отзывы";
      case "favourites":
        return "Избранное";
    }
  }

  console.log(getPageName());
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
        {getPageName(page)}
      </Text>
    </Flex>
  );
}
