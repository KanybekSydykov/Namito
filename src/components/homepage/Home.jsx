"use client";
import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Text,
  Highlight,
  AspectRatio,
  useMediaQuery,
} from "@chakra-ui/react";
import ContainerBox from "@/components/ui/Container";
import Link from "next/link";
import Image from "next/image";
import ProductsSection from "@/components/products/products-section/ProductsSection";
import Advantages from "./Advantages";
import BannerSlider from "./BannerSlider";
import DesktopHero from "./DesktopHero";
import MobileHero from "./MobileHero";
import HomePageSkeleton from "../Skeletons/HomePageSkeleton";

const Home = ({ data = undefined, locale, newProducts, products, token }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <>
      </>
    );
  }

  // if(!isLoaded) return <HomePageSkeletonClient isLoaded={isLoaded} />

  return (
    <>
      <ContainerBox>
        <Box display={{ base: "none", lg: "block" }}>
          <DesktopHero data={data} />
        </Box>
        <Box display={{ base: "block", lg: "none" }}>
          <MobileHero data={data} />
        </Box>

        {data.slider.length > 0 ? (
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
        ) : null}
      </ContainerBox>

      <Flex flexDir={"column"} gap={"90px"}>
        {/* Featured Prods       */}
        <ProductsSection
          products={data.top_products}
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
