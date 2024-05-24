"use client";

import React from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import Image from "next/image";
import DeleteIcon from "@/../public/profile-icons/delete-icon.svg";
import PlusIcon from "@/../public/plus-icon.svg";
import MinusIcon from "@/../public/minus-icon.svg";

const CartItem = () => {
  return (
    <Flex
      flexDir={"column"}
      gap={"16px"}
      px={"20px"}
      pb={"16px"}
      pos={"relative"}
      _after={{
        content: '""',
        position: "absolute",
        bottom: 0,
        left: "16px",
        right: "16px",
        width: "auto",
        height: "1px",
        background: "rgba(232, 236, 239, 1)",
      }}
    >
      <Flex flexDir={"row"} gap={"16px"} pos={"relative"}>
        <Flex flexDir={"column"} gap={"16px"}>
          <Box
            width={"99px"}
            h={"113px"}
            borderRadius={"10px"}
            boxShadow={"0 0 1px 0 rgba(135, 135, 135, 0.25)"}
            pos={"relative"}
            overflow={"hidden"}
          >
            <Image
              src={"/product.png"}
              width={99}
              height={113}
              alt={"product"}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </Box>
        </Flex>
        <Flex
          flexDir={"column"}
          gap={"16px"}
          fontWeight={"300"}
          color={"rgba(146, 146, 146, 1)"}
          fontSize={"16px"}
          lineHeight={"14px"}
        >
          <Text
            noOfLines={1}
            textOverflow={"ellipsis"}
            whiteSpace={"pre-line"}
            fontWeight={"400"}
            color={"rgba(49, 49, 49, 1)"}
            mb={"4px"}
          >
            Шоссейный велосипед Missile Шоссейный велосипед Missile Шоссейный
            велосипед Missile
          </Text>
          <Flex flexDir={"row"} gap={"14px"}>
            <Text>Цена за товар</Text>
            <Text fontWeight={"700"} color={"rgba(49, 49, 49, 1)"}>
              40 000 сом
            </Text>
          </Flex>
          <Flex flexDir={"row"} gap={"14px"}>
            <Text>Размер</Text>
            <Text fontWeight={"700"} color={"rgba(49, 49, 49, 1)"}>
              25 / S
            </Text>
          </Flex>
          <Flex flexDir={"row"} gap={"14px"}>
            <Text>Цвет</Text>
            <Text
              fontWeight={"700"}
              color={"rgba(49, 49, 49, 1)"}
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

      <Flex flexDir={"row"} gap={"8px"}>
        <Button
          w={"40px"}
          h={"40px"}
          borderRadius={"8px"}
          border={"1px solid rgba(226, 226, 226, 1)"}
          bg={"transparent"}
          p={"10px"}
          filter={"grayscale(100%)"}
          _hover={{
            filter: "grayscale(0%)",
          }}
        >
          <Image
            src={MinusIcon}
            width={20}
            height={20}
            alt={"plus"}
            style={{
              transition: "all 0.2s ease-in-out",
            }}
          />
        </Button>

        <Text
          w={"75px"}
          h={"40px"}
          borderRadius={"8px"}
          border={"1px solid rgba(226, 226, 226, 1)"}
          bg={"transparent"}
          color={"#000"}
          textAlign={"center"}
          fontWeight={"400"}
          fontSize={"16px"}
          lineHeight={"24px"}
          fontFamily={"roboto"}
          py={"8px"}
        >
          1
        </Text>
        <Button
          w={"40px"}
          h={"40px"}
          borderRadius={"8px"}
          border={"1px solid rgba(226, 226, 226, 1)"}
          bg={"transparent"}
          p={"10px"}
          filter={"grayscale(100%)"}
          _hover={{
            filter: "grayscale(0%)",
          }}
        >
          <Image
            src={PlusIcon}
            width={20}
            height={20}
            alt={"plus"}
            style={{
              transition: "all 0.2s ease-in-out",
            }}
          />
        </Button>

        <Button
          w={"40px"}
          h={"40px"}
          borderRadius={"8px"}
          border={"1px solid rgba(226, 226, 226, 1)"}
          bg={"transparent"}
          p={"10px"}
          filter={"grayscale(100%)"}
          ml={"auto"}
          _hover={{
            filter: "grayscale(0%)",
          }}
        >
          <Image
            src={DeleteIcon}
            width={20}
            height={20}
            alt={"delete"}
            style={{
              transition: "all 0.2s ease-in-out",
            }}
          />
        </Button>
      </Flex>
    </Flex>
  );
};

export default CartItem;
