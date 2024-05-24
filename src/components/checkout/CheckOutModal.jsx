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
  useMediaQuery,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";

export default function CheckOutModal({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [paymentMethod, setPaymentMethod] = useState("online");
  const { locale } = useParams();

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
          bottom={{ base: "0px", lg: "450px !important" }}
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
            {locale === "ru"
              ? "Выберите способ оплаты"
              : "Choose payment method"}
          </DrawerHeader>

          <DrawerBody
          display={'flex'}
          flexDir={'column'}
          alignItems={'center'}
          >
            <RadioGroup
              onChange={(value) => setPaymentMethod(value)}
              value={paymentMethod}
            >
              <Stack direction="row" gap={"30px"} justifyContent={"center"}>
                <Radio value="online" size={"lg"} colorScheme={"red"}>
                  Онлайн
                </Radio>
                <Radio value="cash" size={"lg"} colorScheme={"red"}>
                  Наличными
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
            >
              Proceed
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
