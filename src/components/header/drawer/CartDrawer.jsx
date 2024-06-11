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
import { deleteData, getData, postData, putData } from "@/lib/apiServices";
import { ENDPOINTS } from "@/API/endpoints";
import { useCounter } from "@/lib/auth-content";
import { AnimatePresence, motion } from "framer-motion";
import CartCounter from "./CartCounter";

const CartDrawer = ({ isDesktop = false, locale, isAuth, token, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cartData, setCartData] = useState(undefined);
  const [isCartPending, setIsCartPending] = useState(true);
  const [totalPrice, setTotalPrice] = useState("");
  const {
    counter,
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
    totalAmount,
  } = useCounter();
  // const [totalAmount, setTotalAmount] = useState(0);

  const translate = (enText, ruText) => (locale === "ru" ? ruText : enText);

  console.log(totalPrice);

  useEffect(() => {
    console.log(cart);
    if (token && isOpen) {
      if (cart.length && !cartData) {
        console.log("should send data");
        postCartData();
      } else {
        clearCart();
        setIsCartPending(true);
        fetchCartData();
      }
    } else {
      setIsCartPending(false);
    }
  }, [isOpen, token]);

  useEffect(() => {
    if (!cartData?.length) {
      setCartData(undefined);
    }
  }, [cartData?.length]);

  const fetchCartData = async () => {
    try {
      const response = await getData(token, ENDPOINTS.getCartData());
      if (response.status >= 200 && response.status < 400) {
        setCartData(response.data.items);
        console.log(response);
        setTotalPrice(response.data.total_amount);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setIsCartPending(false);
    }
  };

  const postCartData = async () => {
    if (token) {
      const credentials = {
        items: cart.map((item) => {
          return {
            product_variant: item.product_variant.id,
            quantity: item.quantity,
          };
        }),
      };
      console.log(credentials);
      try {
        const response = await postData(
          credentials,
          token,
          ENDPOINTS.postItemsToCard()
        );
        if (response.status >= 200 && response.status < 400) {
          console.log(response);
          clearCart();
          setCartData(response.data.items);
          setTotalPrice(response.data.total_amount);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    }
  };

  async function updateTotalPrice(id, action) {
    const product = cartData.find((item) => item.id === id);
    console.log(product);

    // Ensure product and product_variant exist
    if (!product || !product.product_variant) {
      console.error(`Product or product_variant not found for id: ${id}`);
      return;
    }

    const price = product.product_variant.discounted_price
      ? product.product_variant.discounted_price
      : product.product_variant.price;

    if (action === "delete") {
      const totalRemovedPrice = price * product.quantity;
      setTotalPrice((prev) => prev - totalRemovedPrice);
    } else if (action === "increase") {
      setTotalPrice((prev) => prev + price);
    } else if (action === "decrease") {
      setTotalPrice((prev) => prev - price);
    }
  }
  const handleDeleteCartItem = async (id) => {
    if (token) {
      await updateTotalPrice(id, "delete");

      try {
        await deleteData(token, ENDPOINTS.deleteCartItem(id));
        setCartData((prevData) => prevData.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Error deleting cart item:", error);
      }
    } else {
      removeItem(id);
    }
  };

  const handleQuantityChange = async (id, quantity, action) => {
    if (token) {
      updateTotalPrice(id, action);
      const payload = { items: [{ id, quantity }] };
      try {
        await putData(payload, token, ENDPOINTS.putCartQuantity());
      } catch (error) {
        console.error("Error updating cart item quantity:", error);
      }
    } else {
      if (action === "increase") {
        increaseQuantity(id);
      } else if (action === "decrease") {
        decreaseQuantity(id);
      }
    }
  };

  return (
    <>
      {children ? (
        <Box onClick={onOpen}>{children}</Box>
      ) : (
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
            position={"relative"}
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
            <CartCounter token={token} />
          </Box>
          <Text
            fontFamily={"roboto"}
            fontWeight={"300"}
            fontSize={"12px"}
            lineHeight={"16px"}
            transition={"all 0.2s ease-in-out"}
          >
            {translate("Cart", "Корзина")}
          </Text>
        </Box>
      )}
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
            mt={{ base: "40px", lg: "0px" }}
          >
            <Text width={"auto"} flexGrow={1} textAlign={"center"}>
              {translate("Cart", "Корзина")}
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
                          query={translate("Total price:", "Общая цена:")}
                          styles={{
                            fontWeight: "300",
                            color: "rgba(146, 146, 146, 1)",
                            paddingRight: "10px",
                          }}
                        >
                          {translate("Total price:", "Общая цена:")}
                        </Highlight>
                        {totalPrice} {translate("kgs", "сом")}
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
                        {translate("Your cart is empty", "Ваша корзина пуста")}
                      </Text>
                      <Image
                        src={"/decor-star.png"}
                        alt="decor star"
                        width={50}
                        height={50}
                      />
                    </Flex>
                  )}
                </>
              ) : (
                <>
                  {cart.length ? (
                    <>
                      <Flex flexDir={"column"} gap={"16px"} mt={"30px"}>
                        {cart.map((item) => (
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
                          query={translate("Total price:", "Общая цена:")}
                          styles={{
                            fontWeight: "300",
                            color: "rgba(146, 146, 146, 1)",
                            paddingRight: "10px",
                          }}
                        >
                          {translate("Total price:", "Общая цена:")}
                        </Highlight>
                        {totalAmount} {translate("kgs", "сом")}
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
                        {translate("Your cart is empty", "Ваша корзина пуста")}
                      </Text>
                      <Image
                        src={"/decor-star.png"}
                        alt="decor image"
                        width={50}
                        height={50}
                      />
                    </Flex>
                  )}
                </>
              )}

              {isAuth ? null : (
                <Text textAlign={'center'} mt={'36px'} fontFamily={'roboto'} fontSize={'18px'} fontWeight={'400'}>
                  {locale === "ru"
                    ? "Для оформления заказа необходимо авторизоваться"
                    : "To order, you need to log in"}
                </Text>
              )}

              <Box
                as={Link}
                width={"100%"}
                px={"20px"}
                py={"7px"}
                mb={"50px"}
                mt={cartData ? "120px" : "46px"}
                href={`/${locale}/checkout`}
                onClick={onClose}
              >
                <OrangeButton
                  link={cartData || cart.length > 0 ? "/checkout" : "/"}
                  text={
                    cartData || cart.length > 0 ? `${isAuth ? 'Оформить заказ' : 'Войти'}` : "Закрыть"
                  }
                  text_en={cartData || cart.length > 0 ? `${isAuth ? 'Checkout' : 'Login'}` : "Close"}
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
