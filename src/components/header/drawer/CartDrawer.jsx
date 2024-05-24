"use client";
import React from "react";
import {
  Drawer,
  Box,
  Flex,
  DrawerBody,
  Text,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Button,
  Radio,
  RadioGroup,
  Stack,
  Highlight,
} from "@chakra-ui/react";
import Image from "next/image";
import { CloseIcon } from "@chakra-ui/icons";
import CartItem from "@/components/cart/CartItem";
import Link from "next/link";
import OrangeButton from "@/components/ui/OrangeButton";
import { useParams } from "next/navigation";
import {useAuth} from "@/lib/auth-content";
const data = true;
const CartDrawer = ({ isDesktop = false, locale }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isAuthenticated } = useAuth();

  console.log(isAuthenticated);


  return (
    <>
      <Box
        w={{ base: "auto", lg: "65px" }}
        maxW={{ base: "50px", lg: "65px" }}
        maxH={{ base: "37px", lg: "44px" }}
        cursor={"pointer"}
        h={{ base: "auto", lg: "44px" }}
        borderRadius={"10px"}
        bg={"transparent"}
        onClick={onOpen}
        display={"flex"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={{ base: "2px", lg: "7px" }}
        color={{ lg: "rgba(54, 54, 54, 1)", base: "#fff" }}
        _hover={{ color: "orange" }}
        role="group"
      >
        <Box
          w={"20px"}
          h={"17px"}
          filter={{ base: "unset", lg: "grayscale(100%)" }}
          _groupHover={{ filter: "unset" }}
          transition={"all 0.2s ease-in-out"}
        >
          <Image
            src="/cart-icon.svg"
            alt="catalog icon"
            width={20}
            height={17}
            style={{
              transition: "all 0.2s ease-in-out",
            }}
          />
        </Box>
        <Text
          fontFamily={"roboto"}
          fontWeight={"300"}
          fontSize={"12px"}
          lineHeight={"16px"}
          transition={"all 0.2s ease-in-out"}
        >
          Корзина
        </Text>
      </Box>
      <Drawer
        placement={"right"}
        onClose={onClose}
        size={isDesktop ? "lg" : "full"}
        isOpen={isOpen}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            display={"flex"}
            flexDir={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            fontSize={"20px"}
            fontWeight={"600"}
            fontFamily={"roboto"}
            pos={"relative"}
          >
            <Text width={"auto"} flexGrow={1} textAlign={"center"}>
              Корзина
            </Text>
            <Flex
              onClick={onClose}
              w={"16px"}
              h={"16px"}
              justifyContent={"center"}
              cursor={"pointer"}
              alignItems={"center"}
            >
              <CloseIcon width={"100%"} height={"100%"} />
            </Flex>
          </DrawerHeader>
          <DrawerBody
            p={0}
            fontFamily={"roboto"}
            display={"flex"}
            flexDir={"column"}
            gap={"16px"}
          >
            {data ? (
              <>
                <Flex flexDir={"column"} gap={"16px"} mt={"30px"}>
                  <CartItem />
                  <CartItem />
                </Flex>

                <Text
                  fontFamily={"roboto"}
                  fontWeight={"700"}
                  fontSize={"18px"}
                  lineHeight={"27px"}
                  color={"rgba(35, 133, 109, 1)"}
                  textAlign={"end"}
                  pe={"20px"}
                  mt={"30px"}
                >
                  <Highlight
                    query={"Общая цена"}
                    styles={{
                      fontWeight: "300",
                      color: "rgba(146, 146, 146, 1)",
                      marginRight: "14px",
                    }}
                  >
                    Общая цена 40000 сом
                  </Highlight>
                </Text>
              </>
            ) : (
              <Flex
                flexDir={"column"}
                gap={"26px"}
                justifyContent={"center"}
                alignItems={"center"}
                mt={"140px"}
              >
                <Text
                  fontFamily={"roboto"}
                  fontWeight={"600"}
                  fontSize={"18px"}
                  lineHeight={"25px"}
                  textAlign={"center"}
                >
                  В корзине нет ни одного товара
                </Text>

                <Image src={"/decor-star.png"} width={50} height={50} />
              </Flex>
            )}

            <Box
              as={Link}
              width={"100%"}
              px={"20px"}
              py={"7px"}
              mt={data ? "120px" : "46px"}
              href={data ? `/${locale}/checkout` : "/"}
              onClick={onClose}
            >
              <OrangeButton
                link={data ? "/checkout" : "/"}
                text={data ? "Оформить заказ" : "Главная"}
              />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
