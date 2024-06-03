'use client';

import React, { useEffect } from "react";


import { Flex, Box, Container } from "@chakra-ui/react";
import ProductsSection from "@/components/products/products-section/ProductsSection";
import BannerSlider from "./BannerSlider";
import DesktopHero from "./DesktopHero";
import MobileHero from "./MobileHero";

const Home = ({ data = undefined, locale, newProducts, products, token }) => {
  const topProducts = data.top_products.filter(item => item !== null)

  return (
    <>
      <Container
        as="div"
        maxW={{ base: "100%", lg: "1200px", xl: "1200px", "2xl": "1440px" }}
        pb={"90px"}
      >
        <Box display={{ base: "none", lg: "block" }}>
          <DesktopHero data={data} />
        </Box>
        <Box display={{ base: "block", lg: "none" }}>
          <MobileHero data={data} />
        </Box>

          <Flex
            w={"100%"}
            h={{ base: "385px", lg: "300px" }}
            bg={"orange"}
            color={"#fff"}
            mt={"50px"}
            pos={"relative"}
            borderRadius={"10px"}
            overflow={"hidden"}
          >
            <BannerSlider images={data.slider} />
          </Flex>

      </Container>

      <Flex flexDir={"column"} gap={"90px"}>
        {/* Featured Prods       */}
        <ProductsSection
          products={topProducts}
          token={token}
          locale={locale}
          slider={true}
          title={{ en: "FEATURED PRODUCTS", ru: "ТОВАРЫ В ТОПЕ" }}
          productWidth={"219px"}
        />
        {/* New Prods */}
        <ProductsSection
          title={{ ru: "НОВИНКИ", en: "NEW PRODUCTS" }}
          products={newProducts}
          token={token}
        />
        {/* All prods */}
        <ProductsSection
          title={{ ru: "ВСЕ ТОВАРЫ", en: "ALL PRODUCTS" }}
          products={products.products}
          token={token}
        />
      </Flex>
    </>
  );
};

export default Home;
