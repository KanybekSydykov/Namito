'use client'

import React from 'react'
import { Container, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'

const PromotedCategories = ({data, isDesktop,params}) => {
  return (
    <Container
    w={"100vw"}
    maxW={"100vw"}
    height={"50px"}
    display={"flex"}
    px='0px'
    justifyContent={{ base: "flex-start", lg: "center" }}
    alignItems={"center"}
    position={"relative"}
    boxShadow={{ base: "0 0 7px 0 rgba(115, 115, 115, 0.2)" }}
    _after={{
      content: '""',
      position: "absolute",
      top: "0",
      right: "0",
      width: "16px",
      height: "100%",
      bg: isDesktop
        ? "unset"
        : "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 75%, rgba(0,0,0,0.75) 100%)",
    }}
  >
    <Flex
             maxW={{ base: "100%", lg: "1200px", xl: "1200px", "2xl": "1440px" }}

      flexDir={"row"}
      w={"100%"}
      px={'16px'}
      justifyContent={"space-between"}
      fontFamily={"roboto"}
    >
      <Flex
        flexDir={"row"}
        h={"100%"}
        flexWrap={"nowrap"}
        overflowX={"auto"}
        gap={"20px"}
        position={"relative"}
        alignItems={"center"}
        maxW={{ base: "100%", lg: "900px" }}
        fontSize={"14px"}
        fontWeight={"400"}
        flexGrow={1}
      >

        {data?.map((item, index) => (
          
        <Link key={index} prefetch={true} href={`/${params.locale}/category/${item.slug}`} style={{
          minWidth:'max-content'
        }}>{item.name}</Link>
        ))}
      </Flex>

      {isDesktop && (
        <Flex
          width={"max-content"}
          flexDir={"row"}
          gap={"20px"}
          color={"#000"}
          fontSize={"14px"}
          fontWeight={"400"}
        >
          <Link href={"/"}>
            <Text>
              {params.locale === "en" ? "Home" : "Главная"}
            </Text>
          </Link>
          <Link href={`/${params.locale}/about`}>
            <Text>
              {params.locale === "en" ? "About" : "О нас"}
            </Text>
          </Link>
          <Link href={`/${params.locale}/catalog`}>
            <Text>
              {params.locale === "en" ? "Catalog" : "Каталог"}
            </Text>
          </Link>
          <Link href={`/${params.locale}/delivery`}>
            <Text>
              {params.locale === "en" ? "Delivery" : "Доставка"}
            </Text>
          </Link>
        </Flex>
      )}
    </Flex>
  </Container>
  )
}

export default PromotedCategories