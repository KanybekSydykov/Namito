import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Flex, Text } from "@chakra-ui/react";

const HeaderProfileLinks = ({ isDesktop, locale, onClose }) => {
  return (
    <Flex
      flexDir={"row"}
      gap={{base:"20px",lg:'16px'}}
      fontWeight={"300"}
      fontSize={{base:"14px",lg:'12px'}}
      lineHeight={"16px"}
      color={{ base: "#fff", lg: "rgba(54, 54, 54, 1)" }}
      mt={{ base: "70px", lg: "0" }}
      justifyContent={"center"}
      fontFamily={'roboto'}
      alignItems={"center"}
    >
      <Link onClick={onClose} scroll={false} href={`/${locale}/profile/orders#`}>
        <Flex
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={{base:"10px",lg:'7px'}}
          width={{ lg: "65px", base: "75px" }}
          height={{ lg: "44px", base: "51px" }}
          filter={{ base: "grayscale(0)", lg: "grayscale(100%)" }}
          _hover={{ color: "orange",filter:"grayscale(0%)" }}
          role="group"
          transition={"all 0.2s ease-in-out"}
        >
          <Image
            src={"/profile-icons/orders-icon.svg"}
            alt="orders-icon"
            width={20}
            height={20}
          />
          <Text>Заказы</Text>
        </Flex>
      </Link>
      <Link onClick={onClose} scroll={false} href={`/${locale}/login`}>
        <Flex
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={{base:"10px",lg:'7px'}}
          width={{ lg: "65px", base: "75px" }}
          height={{ lg: "44px", base: "51px" }}
          filter={{ base: "grayscale(0)", lg: "grayscale(100%)" }}
          _hover={{ color: "orange",filter:"grayscale(0%)" }}
          role="group"
          transition={"all 0.2s ease-in-out"}
        >
          <Image src={"/profile-icon-colored.svg"} alt="profile-icon" width={20} height={20} />
          <Text>Войти</Text>
        </Flex>
      </Link>
      <Link onClick={onClose} scroll={false} href={`/${locale}/favorites`}>
        <Flex
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={{base:"10px",lg:'7px'}}
          width={{ lg: "65px", base: "75px" }}
          height={{ lg: "44px", base: "51px" }}
          filter={{ base: "grayscale(0)", lg: "grayscale(100%)" }}
          _hover={{ color: "orange",filter:"grayscale(0%)" }}
          role="group"
          transition={"all 0.2s ease-in-out"}
        >
          <Image src={"/favs-icon-colored.svg"} alt="favs-icon" width={20} height={20} />
          <Text>Избранное</Text>
        </Flex>
      </Link>
    </Flex>
  );
};

export default HeaderProfileLinks;
