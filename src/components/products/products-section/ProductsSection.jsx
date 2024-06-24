'use client';

import React from "react";
import { Box, Flex, Text, Grid, AspectRatio } from "@chakra-ui/react";
import Product from "@/components/products/product-card/Product";
import Image from "next/image";
import ProductListSlider from "./ProductListSlider";

const ProductsSection = ({
  title,
  products=[],
  locale,
  slider = false,
  allProducts = false,
  token,
}) => {


  if (!Array.isArray(products)) {
    console.error("Products is not an array", products);
    products = [];
  }


  return (
    <>
      <Flex
        flexDir={"column"}
        gap={"26px"}
        pb={"100px"}
        maxW={{ base: "100%", lg: "1200px", xl: "1200px", "2xl": "1440px" }}
        mx={"auto"}
        width={'100dvw'}
      >
        <Box
          pos={"relative"}
          fontFamily={"roboto"}
          fontWeight={"700"}
          fontSize={{ base: "20px", lg: "36px" }}
          lineHeight={{ base: "23.44px", lg: "50px" }}
          color={"rgba(54, 54, 54, 1)"}
          ps={"16px"}
          position={"relative"}
          width={"max-content"}
        >
          {locale === 'ru' ? title.ru : title.en}
          <AspectRatio
            position={"absolute"}
            left={"100%"}
            bottom={{ base: "10px", lg: "unset" }}
            top={{ base: "unset", lg: "0px" }}
            width={{ base: "16px", lg: "22px" }}
            height={{ base: "16px", lg: "22px" }}
            ratio={1}
          >
            <Image
              src="/decor-star.png"
              alt="decor-star"
              width={22}
              height={22}
              style={{ width: "100%", height: "100%" }}
            />
          </AspectRatio>
        </Box>
        {slider ? (
          <Flex w={"100vw"} >
            <ProductListSlider token={token} products={products} />
          </Flex>
        ) : (
          <Grid
            gap={{ base: "16px", xl: "30px" }}
            py={"4px"}
            px={"16px"}
            width={'100%'}
            gridTemplateColumns={{
              base: "repeat(2, minmax(161px,219px))",
              md: "repeat(auto-fit, minmax(220px,250px))",
              lg: "repeat(auto-fit, minmax(240px,250px))",
              xl: "repeat(auto-fit, minmax(237px,237px))",
            }}
          >
            {products.map((item,index) => (
              <Product details={item} key={index} token={token} />
            ))}
          </Grid>
        )}
      </Flex>
    </>
  );
};

export default ProductsSection;
