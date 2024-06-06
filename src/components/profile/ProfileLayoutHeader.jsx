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
        return locale === 'ru' ?  "Мои заказы" : "My orders";
      case "settings":
        return locale === 'ru' ? "Личные данные" : "Personal data";
      case "adresses":
        return  locale === 'ru' ? "Мои адреса" : "My addresses";
      case "reviews":
        return locale === 'ru' ? "Мои отзывы" : "My reviews";
      case "favourites":
        return locale === 'ru' ? "Избранные товары" : "Favourites";
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
