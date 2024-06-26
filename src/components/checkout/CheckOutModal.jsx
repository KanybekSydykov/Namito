"use client";

import { useState, useRef, useEffect } from "react";
import {
  Box,
  useDisclosure,
  Radio,
  RadioGroup,
  Stack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";

export default function CheckOutModal({ children, handleSelectedPayment, createOrder }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [paymentMethod, setPaymentMethod] = useState("картой");
  const { locale } = useParams();

  // Ensure the keys match exactly with the values being used
  const paymentText = {
    картой: locale === 'ru' ? "Оплата картой" : "Pay with card",
    наличкой: locale === 'ru' ? "Оплата наличными" : "Pay with cash",
  };

  useEffect(() => {
    handleSelectedPayment(paymentMethod, paymentText[paymentMethod]);
  }, [isOpen]);

  function handlePayment(value) {
    setPaymentMethod(value);
    handleSelectedPayment(value, paymentText[value]);
    createOrder();
    onClose();
  }

  function handlePaymentValue(value) {
    console.log(value, paymentText[value]);
    setPaymentMethod(value);
    handleSelectedPayment(value, paymentText[value]);
  }

  return (
    <>
      <Box ref={btnRef} width={"100%"} onClick={onOpen}>
        {children}
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          py={"35px"}
          bottom={{ base: "0px", lg: "20% !important" }}
          width={{ base: "100%", lg: "400px" }}
          mx={"auto"}
          fontFamily={"roboto"}
        >
          <DrawerCloseButton />
          <DrawerHeader
            textAlign={"center"}
            fontSize={"20px"}
            fontWeight={"600"}
            lineHeight={"28px"}
            color={"#000"}
          >
            {locale === "ru" ? "Выберите способ оплаты" : "Choose payment method"}
          </DrawerHeader>

          <DrawerBody display={'flex'} flexDir={'column'} alignItems={'center'}>
            <RadioGroup onChange={(value) => handlePaymentValue(value)} value={paymentMethod}>
              <Stack direction="row" gap={"30px"} justifyContent={"center"}>
                <Radio value="картой" size={"lg"} colorScheme={"red"}>
                  {locale === "ru" ? "Оплата картой" : "Pay with card"}
                </Radio>
                <Radio value="наличкой" size={"lg"} colorScheme={"red"}>
                  {locale === "ru" ? "Оплата наличными" : "Pay with cash"}
                </Radio>
              </Stack>
            </RadioGroup>

            <Button
              mx={"auto"}
              mt={"30px"}
              width={"100%"}
              bg={"orange"}
              color={"#fff"}
              maxW={'300px'}
              onClick={() => handlePayment(paymentMethod)}
            >
              {locale === "ru" ? "Оформить заказ" : "Confirm order"}
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
