import React from 'react'
import { Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
const ButtonText = ({item}) => {
  return (
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
        //   onClick={() => handleItemQuantity(false,true)}
        >
          <Image
            src={'/minus-icon.svg'}
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
          {item.quantity}
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
        //   onClick={() => handleItemQuantity(true)}
        >
          <Image
            src={'/plus-icon.svg'}
            width={20}
            height={20}
            alt={"plus"}
            style={{
              transition: "all 0.2s ease-in-out",
            }}
          />
        </Button>
      </Flex>
  )
}

export default ButtonText