"use client";

import React,{useState} from "react";
import { Box, Flex, Text, Button, useToast } from "@chakra-ui/react";
import Image from "next/image";
import DeleteIcon from "@/../public/profile-icons/delete-icon.svg";
import PlusIcon from "@/../public/plus-icon.svg";
import MinusIcon from "@/../public/minus-icon.svg";
import { useCounter } from "@/lib/auth-content";
import { useAnimate } from "framer-motion";

const CartItem = ({ item, handleDeleteCartItem, border = true,handleQuantityChange }) => {
  console.log(item);
  const [scope, animate] = useAnimate();
  const [quantity,setQuantity] = useState(item.quantity || 1);
  const { decrement, increment} = useCounter();
  const colorCode = item.product_variant.color.color;
  const colorName = item.product_variant.color.name;
  const size = item.product_variant.size.name;
  const price = item.product_variant.discounted_price ? item.product_variant.discounted_price + " сом" : item.product_variant.price + " сом";
  const image = item.product_image ? item.product_image : '/placeholder.jpeg';
  const name = item.product_name;
  const toast = useToast();

  async function handleDelete() {
    if(scope.current){
      await animate(scope.current, { opacity: 0,x:-200 }, { duration: 0.3 });
      decrement();
      handleDeleteCartItem(item.id);
    }

    toast({
      title: "Товар успешно удален из корзины",
      status: "success",
      duration: 3000,
      position: "top-left",
      isClosable: true,
    })
  }

  function handleItemQuantity(increase = false,decrease = false) {
    if(increase){
      increment();
      handleQuantityChange(item.id, quantity + 1,'increase');
      setQuantity((prev) => prev + 1);
    }else if(decrease){
      if(quantity === 1){
        handleDelete();
        return;
      }
      handleQuantityChange(item.id, quantity - 1,'decrease');
      setQuantity((prev) => prev - 1);
      decrement();
    }

  }



  return (
    <Flex
    ref={scope}
      flexDir={"column"}
      gap={"16px"}
      px={"20px"}
      pb={"16px"}
      pos={"relative"}
      minW={{ base: "100%", lg: "450px" }}
      _after={{
        content: `${border ? '""' : "none"}`,
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
              src={image}
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
            {name}
          </Text>
          <Flex flexDir={"row"} gap={"14px"}>
            <Text>Цена за товар</Text>
            <Text fontWeight={"700"} color={"rgba(49, 49, 49, 1)"}>
              {price}
            </Text>
          </Flex>
          <Flex flexDir={"row"} gap={"14px"}>
            <Text>Размер</Text>
            <Text fontWeight={"700"} color={"rgba(49, 49, 49, 1)"}>
              {size}
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
                background: colorCode,
              }}
            >
              {colorName}{" "}
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
          onClick={() => handleItemQuantity(false,true)}
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
          {quantity}
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
          onClick={() => handleItemQuantity(true)}
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
          onClick={handleDelete}
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
