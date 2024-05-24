"use client";
import React, { useEffect, useState } from "react";
import { Input, Box, useMediaQuery } from "@chakra-ui/react";
import { motion, useAnimate } from "framer-motion";

const Search = ({ handleCatalogDrawer }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isDesktop] = useMediaQuery("(min-width: 992px)");

  const [searchValue, setSearchValue] = useState("");

  function handleInputFocus(e, show = false) {
    if (isDesktop) {
      handleCatalogDrawer(false);
    }
    e.stopPropagation();
    setIsFocused(show);
  }

  return (
    <>
      <Box
        role="group"
        position={"relative"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Input
          type="text"
          placeholder="Я ищу..."
          bg={isFocused ? "fff" : "transparent"}
          border={"1px solid #A4A4A4"}
          borderRadius={"10px"}
          w={{
            base: isFocused ? "450px" : "226px",
            lg: isFocused ? "450px" : "280px",
            xl: isFocused ? "450px" : "387px",
          }}
          py={"3px"}
          fontSize={"22px"}
          fontFamily={"roboto"}
          lineHeight={"30px"}
          color={isFocused ? "#000" : "#A4A4A4"}
          outline={"none"}
          onClick={(e) => handleInputFocus(e, true)}
          onChange={(e) => setSearchValue(e.target.value)}
          ps={isFocused ? "16px" : "54px"}
          transition={"all 0.1s linear .1s"}
          zIndex={isFocused ? "3010" : "10"}
          h={"auto"}
          // transform={
          //   isFocused
          //     ? "translateY(100px) translateX(-50px) scale(1.2)"
          //     : "translateY(0px) translateX(0px) scale(1)"
          // }
          _placeholder={{
            color: "#A4A4A4",
            fontFamily: "roboto",
            fontWeight: "400",
            fontSize: "14px",
            lineHeight: "21px",
          }}
          _focus={{
            borderColor: isFocused ? "orange" : "#A4A4A4",
            outline: "none",
            boxShadow: "none",
            zIndex: "2010",
          }}
        />
        <Box
          position={"absolute"}
          w={"20px"}
          h={"20px"}
          top={'calc(50% - 10px)'}
          left={"17px"}
          zIndex={"10"}
          bgImage={"/search-icon.svg"}
          bgSize={"cover"}
          opacity={isFocused ? "0" : "1"}
        ></Box>

        <Box
          w={"100vw"}
          h={"100vh"}
          bg={"rgba(0, 0, 0, 0.5)"}
          position={"fixed"}
          top={"0"}
          left={"0"}
          display={isFocused ? "block" : "none"}
          zIndex={isFocused ? "2001" : "-10"}
          opacity={isFocused ? "1" : "0"}
          transition={"opacity .1s ease .15s"}
          backdropFilter={"blur(1px)"}
          onClick={(e) => handleInputFocus(e, false)}
        />
      </Box>
    </>
  );
};

export default Search;
