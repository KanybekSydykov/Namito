"use client";

import {
  Flex,
  Text,
  Box,
  Radio,
  RadioGroup,
  Stack,
  Button,
  Grid,
  Checkbox,
} from "@chakra-ui/react";
import { useState } from "react";
import Image from "next/image";
import CheckOutModal from "./CheckOutModal";
import { useParams } from "next/navigation";
import CartItem from "../cart/CartItem";
import AdressModal from "../shared-components/adress-modal/AddressModal";
const CheckOut = () => {
  const [deliveryValue, setDeliveryValue] = useState("1");
  const [adressValue, setAdressValue] = useState("1");
  const { locale } = useParams();

  return (
    <Flex
      maxW={{ base: "1200px", xl: "1472px" }}
      flexDir={"column"}
      mx={"auto"}
      pb={'120px'}
    >
      <Flex
        display={{ base: "flex", lg: "none" }}
        w={"100%"}
        flexDir={"row"}
        gap={"16px"}
        py={"10px"}
        px={"16px"}
        alignItems={"center"}
        boxShadow={"0 1px 4px 0 rgba(151, 151, 151, 0.25)"}
      >
        <Text
          fontFamily={"roboto"}
          fontWeight={"700"}
          fontSize={"16px"}
          lineHeight={"22px"}
        >
          Корзина
        </Text>
      </Flex>

      <Flex flexDir={{ base: "column", lg: "row" }} gap={"30px"} mt={{base:'20px',lg:'40px'}}>
        {/* Products */}
        <Flex
          fontFamily={"roboto"}
          flexDir={"column"}
          alignItems={"center"}
          maxW={{ base: "100%", lg: "544px" }}
          gap={"16px"}
          p={{ base: "30px 10px", lg: "40px 20px 80px" }}
          mx={{ base: "16px", lg: "0px" }}
          boxShadow={"0 0 4px 0 rgba(151, 151, 151, 0.25)"}
          borderRadius={"10px"}
          height={"max-content"}
        >
          <Text
            fontWeight={"600"}
            fontSize={"18px"}
            lineHeight={"25.2px"}
            color={"#000"}
          >
            Товары
          </Text>

          <Stack direction={'column'} gap={'16px'}>
            <Checkbox colorScheme={'red'} defaultChecked>
            <Flex
              flexDir={{ base: "column", lg: "row" }}
              gap={"20px"}
              pos={"relative"}
              pb={"16px"}
              _after={{
                content: '""',
                position: "absolute",
                bottom: 0,
                left: "10px",
                right: "10px",
                width: "auto",
                height: "1px",
                background: "rgba(232, 236, 239, 1)",
              }}
            >
              <Flex
                flexDir={"column"}
                gap={"16px"}
                mt={{ base: "20px", lg: "0px" }}
              >
                <Box
                  width={"150px"}
                  h={"170px"}
                  borderRadius={"10px"}
                  boxShadow={"0 0 1px 0 rgba(135, 135, 135, 0.25)"}
                  pos={"relative"}
                  overflow={"hidden"}
                >
                  <Image
                    src={"/product.png"}
                    width={150}
                    height={170}
                    alt={"product"}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Box>
              </Flex>
              <Flex flexDir={"column"} gap={"16px"}>
                <Text
                  noOfLines={2}
                  textOverflow={"ellipsis"}
                  whiteSpace={"pre-line"}
                  fontWeight={"400"}
                >
                  Шоссейный велосипед Missile Шоссейный велосипед Missile
                  Шоссейный велосипед Missile
                </Text>
                <Flex flexDir={"row"} gap={"14px"}>
                  <Text>Цена за товар</Text>
                  <Text fontWeight={"700"}>40 000 сом</Text>
                </Flex>
                <Flex flexDir={"row"} gap={"14px"}>
                  <Text>Размер</Text>
                  <Text fontWeight={"700"}>25 / S</Text>
                </Flex>
                <Flex flexDir={"row"} gap={"14px"}>
                  <Text>Цвет</Text>
                  <Text
                    fontWeight={"700"}
                    pos={"relative"}
                    _after={{
                      content: '""',
                      position: "absolute",
                      top: "calc(50% - 5px)",
                      right: "-20px",
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: "rgba(10, 180, 222, 1)",
                    }}
                  >
                    Синий{" "}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            </Checkbox>
          </Stack>
        </Flex>
        <Flex flexDir={"column"} flexGrow={1} gap={'30px'}>
          {/* Delivery method */}
          <Flex
            flexDir={"column"}
            gap={"30px"}
            p={"30px 10px"}
            mx={"16px"}
            boxShadow={"0 0 4px 0 rgba(151, 151, 151, 0.25)"}
            borderRadius={"10px"}
            alignItems={"center"}
          >
            <Text
              fontWeight={"600"}
              fontSize={"18px"}
              lineHeight={"25.2px"}
              color={"#000"}
            >
              Способ доставки
            </Text>

            <RadioGroup
              onChange={(value) => setDeliveryValue(value)}
              value={deliveryValue}
            >
              <Stack direction="row" gap={"30px"}>
                <Radio value="1" size={"lg"} colorScheme={"red"}>
                  Курьер
                </Radio>
                <Radio value="2" size={"lg"} colorScheme={"red"}>
                  Самовывоз
                </Radio>
              </Stack>
            </RadioGroup>
          </Flex>

          {/* Addresses */}
          <Flex
            flexDir={"column"}
            gap={"30px"}
            p={"30px 10px"}
            mx={"16px"}
            boxShadow={"0 0 4px 0 rgba(151, 151, 151, 0.25)"}
            borderRadius={"10px"}
            alignItems={"center"}
          >
            <Text
              fontWeight={"600"}
              fontSize={"18px"}
              lineHeight={"25.2px"}
              color={"#000"}
            >
              Способ доставки
            </Text>

            <RadioGroup
              onChange={(value) => setAdressValue(value)}
              value={adressValue}
            >
              <Stack direction="column" gap={"30px"}>
                <Radio value="1" size={"lg"} colorScheme={"red"}>
                  Бишкек, ул. Абдрахманова 1/1, кв. 12, подъезд 1
                </Radio>
                <Radio value="2" size={"lg"} colorScheme={"red"}>
                  Бишкек, ул. Абдрахманова 1/1, кв. 12, подъезд 2
                </Radio>
              </Stack>
            </RadioGroup>

            <AdressModal>
              <Button
                bg={"#fff"}
                border={"1px solid rgba(160, 160, 160, 1)"}
                borderRadius={"10px"}
                display={"flex"}
                flexDir={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"10px"}
                minW={"338px"}
                maxW={"380px"}
                py={"8px"}
                h={"auto"}
                role="group"
                transition={"all .3s ease"}
                _hover={{
                  bg: "orange",
                  borderColor: "orange",
                }}
              >
                <Flex
                  w={"24px"}
                  h={"24px"}
                  filter={"grayscale(100%)"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  _groupHover={{ filter: "brightness(0) invert(1)" }}
                >
                  <Image src={"/plus-icon.svg"} width={14} height={14} 
                  style={{
                    transition:'all .3s ease'
                  }}
                  />
                </Flex>
                <Text
                  fontFamily={"roboto"}
                  fontWeight={"300"}
                  fontSize={"18px"}
                  lineHeight={"27px"}
                  color={"rgba(54, 54, 54, 1)"}
                  transition={"all .3s ease"}
                  _groupHover={{
                    color: "#fff",
                  }}
                >
                  Добавить адрес
                </Text>
              </Button>
            </AdressModal>
          </Flex>

          {/* Payment Method */}
          <Flex
            flexDir={"column"}
            p={"30px 10px"}
            mx={"16px"}
            boxShadow={"0 0 4px 0 rgba(151, 151, 151, 0.25)"}
            borderRadius={"10px"}
            alignItems={"center"}
          >
            <Text
              fontWeight={"600"}
              fontSize={"18px"}
              lineHeight={"25.2px"}
              color={"#000"}
            >
              Способ оплаты
            </Text>
            <Text
              fontWeight={"300"}
              fontSize={"16px"}
              lineHeight={"24px"}
              color={"#000"}
              mt={"20px"}
            >
              Введите способ оплаты
            </Text>

            <CheckOutModal>
              <Button
                mt={"16px"}
                width={"100%"}
                maxW={{ base: "100%", lg: "355px" }}
                textAlign={"center"}
                py={"15px"}
                borderRadius={"10px"}
                bg={"rgba(203, 70, 9, .75)"}
                color={"#fff"}
                fontSize={"18px"}
                lineHeight={"25px"}
                fontWeight={"400"}
                h={"auto"}
                display={"flex"}
                flexDir={"row"}
                gap={"10px"}
                justifyContent={"center"}
                alignItems={"center"}
                mx={"auto"}
                _hover={{
                  bg: "rgba(203, 70, 9, 1)",
                }}
              >
                <Text>
                  {locale === "ru"
                    ? "Выбрать способ оплаты"
                    : "Choose payment method"}
                </Text>
              </Button>
            </CheckOutModal>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CheckOut;
