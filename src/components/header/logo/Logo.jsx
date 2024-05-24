import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

const Logo = ({ color }) => {
  return (
    <Flex
      as={Link}
      href={"/"}
      py={{base:"8px",lg:'0px'}}
      gap={"2px"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Image
        src="/logo.svg"
        alt="logo"
        width={27}
        height={35}
        style={{
          filter: color === "#fff" ? "invert(1)" : "invert(0)",
        }}
      />
      <Text
        fontFamily={"readex"}
        fontWeight={700}
        fontSize={"12.75px"}
        lineHeight={"16px"}
        textTransform={"uppercase"}
        color={color ? color : "rgb(54,54,54)"}
      >
        Namito
      </Text>
    </Flex>
  );
};

export default Logo;
