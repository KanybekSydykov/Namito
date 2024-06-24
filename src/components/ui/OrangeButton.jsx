"use client";
import React from "react";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { useParams } from "next/navigation";

const OrangeButton = ({ text,text_en,fn = null }) => {
  const { locale } = useParams();
  return (
      <Button
        w={"100%"}
        h={"52px"}
        borderRadius={"10px"}
        bg={"transparent"}
        border={"1px solid orange"}
        _hover={{ bg: "orange", color: "white" }}
        color={"orange"}
        fontFamily={"roboto"}
        transition={"all 0.3s ease"}
        fontWeight={"400"}
        fontSize={"18px"}
        lineHeight={"25px"}
        display={"flex"}
        alignItems={"center"}
        onClick={fn ? fn : null}
        justifyContent={"center"}
        gap={"10px"}
        py={"18px"}
        height={"auto"}
        maxW={{ base: "unset", lg: "355px" }}
        mx={"auto"}
      >
        {locale === 'ru' ? text : text_en}
      </Button>
  );
};

export default OrangeButton;
