"use client";
import React from "react";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { useParams } from "next/navigation";

const OrangeButton = ({ text }) => {
  const { locale } = useParams();
  return (
      <Button
        w={"100%"}
        h={"52px"}
        borderRadius={"10px"}
        bg={"orange"}
        color={"#fff"}
        fontFamily={"roboto"}
        fontWeight={"400"}
        fontSize={"18px"}
        lineHeight={"25px"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"10px"}
        py={"18px"}
        height={"auto"}
        maxW={{ base: "unset", lg: "355px" }}
        mx={"auto"}
      >
        {text}
      </Button>
  );
};

export default OrangeButton;
