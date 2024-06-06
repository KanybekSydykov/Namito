"use client";
import React from "react";
import {
  Drawer,
  Box,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Button,
  Flex,
  Text,
  Divider,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";
import Image from "next/image";
import HeaderProfileLinks from "./HeaderProfileLinks";
import { useParams } from "next/navigation";
import LocaleSwitcher from "@/components/Locale/Locale";

const Navmenu = ({ isAuth }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { locale } = useParams();
  return (
    <>
      <Box
        bg={"transparent"}
        w={"31px"}
        h={"31px"}
        p={"7px 5px"}
        onClick={onOpen}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        cursor={"pointer"}
      >
        <Box
          position={"relative"}
          w={"100%"}
          h={"3px"}
          bg={"black"}
          borderRadius={"5px"}
          _after={{
            content: "''",
            position: "absolute",
            w: "100%",
            h: "100%",
            borderRadius: "5px",
            bg: "black",
            top: "-8px",
            left: "0",
          }}
          _before={{
            content: "''",
            position: "absolute",
            w: "100%",
            h: "100%",
            borderRadius: "5px",
            bg: "black",
            top: "8px",
            left: "0",
          }}
        ></Box>
      </Box>
      <Drawer
        placement={"right"}
        size={"full"}
        onClose={onClose}
        isOpen={isOpen}
      >
        <DrawerOverlay />
        <DrawerContent bg={"rgba(33, 37, 40, 1)"} fontFamily={"roboto"}>
          <DrawerHeader display={"flex"} justifyContent={"flex-end"}>
            <Button
              w={"24px"}
              h={"24px"}
              minH={"none"}
              p={"4px"}
              bg={"transparent"}
              border={"none"}
              onClick={onClose}
            >
              <CloseIcon w={"16px"} h={"16px"} color={"#fff"} />
            </Button>
          </DrawerHeader>
          <DrawerBody position={"relative"}>
            <Image
              src={"/decor-star.png"}
              width={40}
              height={40}
              style={{
                position: "absolute",
                top: "110px",
                left: "70px",
                rotate: "52deg",
              }}
            />
            <Image
              src={"/decor-star.png"}
              width={20}
              height={20}
              style={{
                position: "absolute",
                top: "340px",
                right: "70px",
                rotate: "52deg",
              }}
            />
            <Flex
              mt={"70px"}
              width={"max-content"}
              flexDir={"column"}
              mx={"auto"}
              gap={"50px"}
              color={"#fff"}
              fontSize={"16px"}
              fontWeight={"400"}
              textTransform={"uppercase"}
              textAlign={"center"}
              // onClick={onClose}
            >
              <Link href={`/${locale}/`} >
                {locale === "en" ? "Home" : "Главная"}
              </Link>
              <Link href={`/${locale}/catalog`} >
                {locale === "en" ? "Catalog" : "Каталог"}
              </Link>
              <Link href={`/${locale}/delivery`} >
                {locale === "en" ? "Delivery" : "Доставка"}
              </Link>
            </Flex>

            <Flex
              flexDir={"row"}
              my={"60px"}
              gap={"10px"}
              fontSize={"18px"}
              fontWeight={"400"}
              lineHeight={"25px"}
              h={"22px"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              {/* <Text color={"#fff"}>РУ</Text>
              <Divider orientation="vertical" />
              <Text color={"rgba(160, 160, 160, 1)"}>EN</Text> */}
              <LocaleSwitcher isWhite={true}/>
            </Flex>

            <HeaderProfileLinks
              isAuth={isAuth}
              locale={locale}
              onClose={onClose}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navmenu;
