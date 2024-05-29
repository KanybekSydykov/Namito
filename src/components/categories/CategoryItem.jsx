"use client";

import React, { useEffect } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const CategoryItem = ({ locale, imgUrl = false, onClick, onHover, item }) => {



  useEffect(() => {
  }, [item]);

  return (
    <Flex
      w={"100%"}
      flexDir={"row"}
      p={"14.5px 10px 14.5px 20px"}
      justifyContent={"space-between"}
      alignItems={"center"}
      position={"relative"}
      cursor={"pointer"}
      borderRadius={"10px"}
      boxShadow={"0 0 2px 0 rgba(73, 73, 73, 0.25)"}
      fontFamily={"roboto"}
      fontWeight={"400"}
      fontSize={"18px"}
      lineHeight={"25.2px"}
      color={"rgba(54, 54, 54, 1)"}
      transition={"all 0.2s ease-in-out"}
      _hover={{
        bg: "rgba(203, 70, 9, .75)",
        color: "#fff",
      }}
      role="group"
    >
      <Flex
        width={"auto"}
        flexDir={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"14px"}
      >

          <Box
            width={"24px"}
            h={"24px"}
            pos={"relative"}
            _groupHover={{
              filter: "invert(100%) brightness(200%)",
            }}
          >
            <Image src={item.icon !== null ? item.icon : "/catalog-item-icon.svg"} fill alt="category icon" />
          </Box>

        <Text>{item?.name}</Text>
      </Flex>

      <ChevronRightIcon w={"24px"} h={"24px"} />
      <Link
        href={`/${locale}/category/${item?.slug}`}
        style={{
          width: "100%",
          position: "absolute",
          top: "0",
          left: "0",
          height: "100%",
          zIndex: "1",
        }}
        onClick={onClick}
        onMouseOver={onHover}
      />
    </Flex>
  );
};

export default CategoryItem;
