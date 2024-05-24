"use client";

import {
  Flex,
  Grid,
  GridItem,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import Product from "../product-card/Product";
import SubCategoriesList from "@/components/categories/SubCategoriesList";

const ProdList = ({data,locale}) => {
  const [isDesktop] = useMediaQuery("(min-width: 992px)");

  return (
    <Flex
      flexDir={"column"}
      gap={"20px"}
      width={{ base: "100%", lg: "calc(100% - 330px)" }}
    >
      {!isDesktop && <SubCategoriesList data={data.children} locale={locale} />}

      <Grid templateColumns={{base:"repeat(2, minmax(171px, 171px))",md:"repeat(3, minmax(171px, 1fr))",lg:"repeat(auto-fit, minmax(216px, 300px))"}} gap={"16px"}>
    
        {data?.map((item, index) => (
        <GridItem key={index}>
                 <Product  details={item} /> 
        </GridItem>
        ))}
 
      </Grid>
    </Flex>
  );
};

export default ProdList;
