"use client";

import { Flex, Grid, GridItem, Text, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import Product from "../product-card/Product";
import SubCategoriesList from "@/components/categories/SubCategoriesList";
import Image from "next/image";

const ProdList = ({ data, locale, token }) => {
  const [isDesktop] = useMediaQuery("(min-width: 992px)");

  return (
    <Flex
      flexDir={"column"}
      gap={"20px"}
      width={{ base: "100%", lg: "calc(100% - 330px)" }}
    >
      {!isDesktop && <SubCategoriesList data={data.children} locale={locale} />}

      {data.length > 0 ? (
        <Grid
          templateColumns={{
            base: "repeat(2, minmax(161px,216px))",
            sm: "repeat(3, minmax(171px,240px))",
            md: "repeat(3, minmax(227px,313px))",
            lg: "repeat(4, minmax(227px,1fr))",
            xl: "repeat(5, minmax(227px,1fr))",
          }}
          gap={"16px"}
        >
          {data.map((item, index) => (
            <GridItem key={index}>
              <Product token={token} details={item} />
            </GridItem>
          ))}
        </Grid>
      ) : (
        <Flex
          flexDir={"column"}
          width={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"16px"}
        >
          <Text
            fontFamily={"roboto"}
            fontSize={"26px"}
            color={"#000"}
            fontWeight={"500"}
            textAlign={"center"}
          >
            Товары отсутствуют
          </Text>
          <Image
            src="/decor-star.png"
            alt="decor-icon"
            width={80}
            height={80}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default ProdList;
