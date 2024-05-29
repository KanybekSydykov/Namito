import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Flex, Text } from "@chakra-ui/react";


const HeaderProfileLinks = ({ isDesktop, locale, onClose,isAuth }) => {
  useEffect(() => {}, [isAuth]);
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
      <Link onClick={onClose} scroll={false} href={`/${locale}/profile?page=orders`} style={{
        position: "absolute",
        top : "0px",
        left : "0px",
        width : "100%",
        height : "100%",
      }}/>

        </Flex>

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
          <Text>{isAuth ? 'Профиль' : 'Войти'}</Text>
      <Link onClick={onClose} scroll={false} href={`/${locale}/${isAuth ? 'profile' : 'login'}`} 
      style={{
        position: "absolute",
        top : "0px",
        left : "0px",
        width : "100%",
        height : "100%",
      }}
      />
        </Flex>

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
      <Link onClick={onClose} scroll={false} href={`/${locale}/favorites`} 
      style={{
        position: "absolute",
        top : "0px",
        left : "0px",
        width : "100%",
        height : "100%",
      }}
      />

        </Flex>

    </Flex>
  );
};

export default HeaderProfileLinks;
