"use client";
import React, { useEffect, useState } from "react";
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
  Highlight,
  Spinner,
} from "@chakra-ui/react";
import Image from "next/image";
import { CloseIcon } from "@chakra-ui/icons";
import CartItem from "@/components/cart/CartItem";
import Link from "next/link";
import OrangeButton from "@/components/ui/OrangeButton";
import {  deleteData, getData, putData } from "@/lib/apiServices";
import { ENDPOINTS } from "@/API/endpoints";
import { useCounter } from "@/lib/auth-content";
import { AnimatePresence,motion } from "framer-motion";
const CartDrawer = ({ isDesktop = false, locale, isAuth, token,children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cartData, setCartData] = useState(undefined);
  const [isCartPending, setIsCartPending] = useState(true);
  const { counter } = useCounter();
  const [totalAmount, setTotalAmount] = useState(0);

  // Getting current cart data 
  useEffect(() => {
    setIsCartPending(true);
    if (isOpen) {
      async function getCart() {
        const response = await getData(token,ENDPOINTS.getCartData());
        if (response.status >= 200 && response.status < 400) {
          setCartData(response.data.items);
          setIsCartPending(false);
          setTotalAmount(response.data.total_amount);
        } else {
          console.log(response);
          setIsCartPending(false);
        }
      }
        getCart();

    }
  }, [isOpen]);
  // Updating local cart state after deleting
  useEffect(() => {
    if (!cartData?.length) {
      setCartData(undefined);
    }
  }, [cartData?.length]);

  // Cart deletion handler

  const handleDeleteCartItem = async (id) => {
    const filteredCartData = cartData.filter((item) => item.id !== id);
    setCartData(filteredCartData);
    try {
      const response = await deleteData(token,ENDPOINTS.deleteCartItem(id));
      if (response.status > 200) {
      }
    } catch (error) {
    }
  };

  // Cart item quantity handler 

  const handleQuantityChange = async (id, quantity) => {
    const payload = {items:[{
      id: id,
      quantity: quantity,
    }]};
    try {
      const response = await putData(payload,token, ENDPOINTS.putCartQuantity());
      if (response.status >= 200) {
      }
    } catch (error) {
    }
  };


  const closeText = locale === 'ru' ? "Закрыть" : "Close";

  const loginText = locale === 'ru' ? "Войти" : "Login";

  const checkOutText = locale === 'ru' ? "Оформить заказ" : "Checkout";

  
  return (
    <>
    {children ? 
    <Box onClick={onOpen}>
      {children}
    </Box>
     :  
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
          position={'relative'}
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
                    <AnimatePresence>
        {counter !== 0 && (

           

            <Text as={motion.p}
             key={counter}
             initial={{ opacity: 0, x:0 ,}}
             animate={{ opacity: 1, x:[30,20,10,0] }}
             transition={{ duration: 0.15 ,type: "spring", }}
              pos={"absolute"}
              top={'-10px'}
              right={'-10px'}
              color={'orange'}
              filter={'unset'}
              fontSize={'14px'}
              fontFamily={'roboto'}
            >
              {counter ? counter : null}
            </Text>
        )}
      </AnimatePresence>
        </Box>
        <Text
          fontFamily={"roboto"}
          fontWeight={"300"}
          fontSize={"12px"}
          lineHeight={"16px"}
          transition={"all 0.2s ease-in-out"}
        >
         {locale === 'en' ? 'Cart' : 'Корзина'}
        </Text>

      </Box>}
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
             {locale === 'en' ? 'Cart' : 'Корзина'}
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
          {isCartPending ? (
            <Flex
              w={"100%"}
              h={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Spinner color="orange" size="xl" />
            </Flex>
          ) : (
            <DrawerBody
              p={0}
              fontFamily={"roboto"}
              display={"flex"}
              flexDir={"column"}
              gap={"16px"}
            >
              {isAuth ? (
                <>
                  {cartData?.length ? (
                    <>
                      <Flex flexDir={"column"} gap={"16px"} mt={"30px"}>
                        {cartData.map((item) => (
                          <CartItem
                            key={item.id}
                            item={item}
                            handleDeleteCartItem={handleDeleteCartItem}
                            handleQuantityChange={handleQuantityChange}
                          />
                        ))}
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
                          query={"Общая цена:"}
                          styles={{
                            fontWeight: "300",
                            color: "rgba(146, 146, 146, 1)",
                            paddingRight: "10px",
                          }}
                        >
                          {params.locale === 'ru' ? 'Общая цена:' : 'Total price:'}</Highlight>{totalAmount} {params.locale === 'ru' ? 'сом' : 'kgs'}
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
                       {locale === "ru" ? "Ваша корзина пуста" : "Your cart is empty"}
                      </Text>

                      <Image src={"/decor-star.png"} width={50} height={50} />
                    </Flex>
                  )}
                </>
              ) : (
                <Text
                  fontFamily={"roboto"}
                  fontWeight={"700"}
                  fontSize={"24px"}
                  lineHeight={"27px"}
                  textAlign={"center"}
                  mt={"30%"}
                  maxW={'390px'}
                  mx={'auto'}
                >
                 {locale === "ru" ? "Необходимо войти в аккаунт чтобы добавить в корзину" : 'You must be logged in to add items to your cart'}
                </Text>
              )}
              <Box
                as={Link}
                width={"100%"}
                px={"20px"}
                py={"7px"}
                mt={cartData ? "120px" : "46px"}
                href={cartData ? `/${locale}/checkout` : "#"}
                onClick={onClose}
              >
                <OrangeButton
                  link={
                    isAuth ? (cartData ? "/checkout" : "/") : `/${locale}/login`
                  }
                  text={
                    isAuth ? (cartData ? checkOutText : closeText) : loginText
                  }
                />
              </Box>
            </DrawerBody>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
