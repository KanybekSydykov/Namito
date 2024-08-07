"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Input,
  Box,
  useMediaQuery,
  List,
  ListItem,
  Text,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";

const Search = ({ handleCatalogDrawer }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isDesktop] = useMediaQuery("(min-width: 992px)");
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { locale } = useParams();
  const [isRequestPending, setIsRequestPending] = useState(false);
  const ref = useRef(null);

  function handleInputFocus(e, show = false) {
    window.scrollTo(0, 0);
   setTimeout(() => {
    if (isDesktop) {
      handleCatalogDrawer(false);
    }
    e.stopPropagation();
    setIsFocused(show);
   },500)
  }
  useEffect(() => {
    if (isFocused) {
      document.body.style.width = "100dvw";
      document.body.style.height = "100dvh";
      document.body.style.overflow = "hidden";
      if (!searchValue.trim()) {
        setSearchResults([]);
      }
    } else {
      document.body.style.overflow = "unset";
      document.body.style.width = "100dvw";
      document.body.style.height = "auto";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFocused]);

  const fetchSearchResults = async (query) => {
    setIsRequestPending(true);
    try {
      const response = await fetch(
        `https://namito.tatadev.pro/api/products/search/?name=${query}`
      );
      const data = await response.json();
      setSearchResults(data || []);
      setIsRequestPending(false);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value.trim()) {
      fetchSearchResults(value);
    } else {
      setSearchResults([]);
    }
  };

  const handleInputBlur = (e) => {
    // Handle actions after "Done" is clicked
    handleInputFocus(e, false);

  };

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
          type="search"
          placeholder={locale === "en" ? "Search" : "Я ищу..."}
          bg={isFocused ? "fff" : "transparent"}
          border={"1px solid #A4A4A4"}
          borderRadius={"10px"}
          w={{
            base: isFocused ? "300px" : "226px",
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
          onChange={handleSearchChange}
          onBlur={handleInputBlur}
          ps={isFocused ? "16px" : "54px"}
          transition={"all 0.1s linear .1s"}
          zIndex={isFocused ? "3010" : "10"}
          h={"auto"}
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
          top={"calc(50% - 10px)"}
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
          overflowY={'auto'}
        >
          {isRequestPending ? (
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              width={"200px"}
              height={"200px"}
              position="absolute"
              top={{ base: "120px", lg: "80px" }}
              left="calc(50% - 100px)"
              right="calc(50% - 100px)"
            >
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="orange.500"
                size="xl"
              />
            </Flex>
          ) : (
            <>
              {searchResults.length > 0 ? (
                <Box
                  position="absolute"
                  top={{ base: "120px", lg: "80px" }}
                  left="20px"
                  right="20px"
                  width="auto"
                  padding={"20px"}
                  borderRadius={"10px"}
                  bg="white"
                  boxShadow="lg"
                  zIndex="3000"
                  pb={'50px'}
                >
                  <List spacing={2} 
                  overflowY={'auto'}
                  >
                    {searchResults.map((result) => (
                      <ListItem
                        position={"relative"}
                        display={"flex"}
                        flexDir={"row"}
                        gap={"20px"}
                        justifyContent={"flex-start"}
                        alignItems={"center"}
                        key={result.id}
                        p={2}
                        borderBottom="1px solid #eaeaea"
                        _hover={{ bg: "#f5f5f5" }}
                      >
                        <Image
                          src={
                            result.images.length > 0
                              ? result.images[0]
                              : "/placeholder.jpeg"
                          }
                          alt={result.name}
                          width={50}
                          height={50}
                        />
                        <Text fontSize="16px">{result.name}</Text>

                        <Link
                          prefetch={true}
                          href={`/${locale}/product/${result.id}`}
                          style={{
                            position: "absolute",
                            top: "0px",
                            left: "0px",
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>)
                : 
                <Box
                position="absolute"
                top={{ base: "120px", lg: "80px" }}
                left="20px"
                right="20px"
                width="auto"
                padding={"20px"}
                borderRadius={"10px"}
                bg="white"
                boxShadow="lg"
                zIndex="3000"
                >
               {!searchValue && !searchResults.length ? 
                 
                 <Text textAlign={'center'}>
                 {" "}
               </Text>
                 :<Text textAlign={'center'}>
                 {locale === "ru" ? "Ничего не найдено" : "Nothing found"}
               </Text> 
              }
                </Box>
              }
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Search;
