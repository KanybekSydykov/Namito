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
    w={'100%'}
    >
      {!isDesktop && <SubCategoriesList data={data.children} locale={locale} />}

      {data.length > 0 ? (
        <Grid
          templateColumns={{
            base: "repeat(2, minmax(161px,199px))",
            sm: "repeat(auto-fit, minmax(199px,210px))",
            md: "repeat(auto-fit, minmax(210px,230px))",
            lg: "repeat(auto-fit, minmax(230px,257px))",
            xl: "repeat(auto-fit, minmax(277px,277px))",
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
