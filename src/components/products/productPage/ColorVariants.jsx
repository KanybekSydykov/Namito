'use client';

import React from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useParams } from "next/navigation";

const ColorVariants = ({ colors, setVariant, variant }) => {
  const {locale} = useParams();
  return (
    <Flex
      flexDir={"column"}
      gap={"20px"}
      flexWrap={"nowrap"}
      mt={"50px"}
      overflowX={"auto"}
    >
      <Text
        fontFamily={"roboto"}
        fontWeight={"700"}
        fontSize={"16px"}
        lineHeight={"22.4px"}
        color={"#000"}
      >
        {locale === "ru" ? "Цвет" : "Color"}
      </Text>

      <Flex flexDir={"row"} gap={"16px"}>
        {colors.map((item, index) => (
          <Box key={index} onClick={() => setVariant(item.image.color,item.variantId)}>
            <Box
              w={"71px"}
              borderRadius={"5px"}
              aspectRatio={71 / 85}
              boxShadow={"0 0 1px 2px rgba(203, 70, 9, 1) inset"}
              pos={"relative"}
              border={
                item.image.color === variant
                  ? "1.5px solid rgba(255,152,158,1)"
                  : "1.5px solid transparent"
              }
              cursor={"pointer"}
              _hover={{ borderColor: "rgba(255,152,158,1)" }}
              overflow={"hidden"}
              transition={"all 0.2s ease-in-out"}
            >
              <Image
                src={item.image.small_image}
                alt={item.colorName}
                width={71}
                height={85}
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
            <Text
              mt={"6px"}
              fontFamily={"roboto"}
              textAlign={"center"}
              fontWeight={"400"}
              fontSize={"12"}
            >
              {item.colorName}
            </Text>
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

export default ColorVariants;
