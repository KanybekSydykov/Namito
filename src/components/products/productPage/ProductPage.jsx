"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  List,
  ListItem,
} from "@chakra-ui/react";
import ProductReview from "@/components/products/product-reviews/ProductReview";
import ProductsSection from "@/components/products/products-section/ProductsSection";
import CartButton from "@/components/ui/CartButton";
import Thumbnails from "./Thumbnails";
import ColorVariants from "./ColorVariants";
import VariantSizes from "./VariantSizes";

const ProductPage = ({ params, details, similarProds }) => {
  const [colorVariant, setColorVariant] = useState(undefined);
  const [uniqueVariantColors, setUniqueVariantColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [sliderImages, setSliderImages] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState({});
  const [colors, setColors] = useState([]);

  useEffect(() => {
    function getVariants() {
      const uniqueColors = new Set();
      return details.variants.filter((variant) => {
        if (!uniqueColors.has(variant.color.id)) {
          uniqueColors.add(variant.color.id);
          return true;
        }
        return false;
      });
    }

    setUniqueVariantColors(getVariants());
    setColorVariant(getVariants()[0].color.id);

    setColors([]);
    function getVariantColors(colorId, colorName, variantId) {
      console.log(colorId);
      return {
        image: details.images.find((image) => image.color === colorId),
        colorName,
        variantId: variantId,
      };
    }

    getVariants().map((variant) => {
      setColors((prevItems) => [
        ...prevItems,
        getVariantColors(variant.color.id, variant.color.name, variant.id),
      ]);
    });

    setSelectedVariant(details.variants[0]);
  }, [details]);

  useEffect(() => {
    if (colorVariant) {
      function getVariantSizes(id) {
        return details.variants.filter((variant) => variant.color.id === id);
      }

      setSizes(
        getVariantSizes(colorVariant).sort(
          (a, b) => Number(a.size.name) - Number(b.size.name)
        )
      );
    }
    function filterImagesByColor(colorID) {
      return details.images.filter((image) => image.color === colorID);
    }

    setSliderImages(filterImagesByColor(colorVariant));
  }, [colorVariant]);


  function handleChoosedVariant(colorId, variantId) {
    setColorVariant(colorId);
    handleSelectedVariant(variantId);
  }

  function handleSelectedVariant(variantId) {
    setSelectedVariant(
      details.variants.find((variant) => variant.id === variantId)
    );
  }

  return (
    <>
      <Text
        my={"40px"}
        fontWeight={400}
        fontSize={"16px"}
        lineHeight={"24px"}
        fontFamily={"roboto"}
        color={"rgb(160, 160, 160)"}
        ps={"16px"}
      ></Text>
      <Flex flexDir={"column"} gap={"100px"} fontFamily={"roboto"}>
        <Flex
          width={"100%"}
          flexDir={{ base: "column", lg: "row" }}
          justifyContent={{ base: "unset", lg: "space-between" }}
          gap={{ base: "40px", lg: "30px" }}
          pos={"relative"}
          overflow={"visible"}
        >
          {/* prod imgs */}
          <Flex
            width={{ base: "100%", lg: "530px" }}
            height={{ base: "auto", lg: "500px" }}
            flexDir={{ base: "column", lg: "row-reverse" }}
            gap={"16px"}
            position={{ base: "relative", lg: "sticky" }}
            top={{ base: "unset", lg: "0px" }}
          >
            <Thumbnails images={sliderImages} tags={details.tags} />
          </Flex>

          {/* prod info */}
          <Flex flexDir={"column"} px={{ base: "16px", lg: "0px" }}>
            {/* product title */}

            <Text
              fontFamily={"roboto"}
              fontWeight={{ base: "600", lg: "700" }}
              fontSize={{ base: "20px", lg: "22px" }}
              lineHeight={{ base: "28px", lg: "30px" }}
              color={"rgba(54, 54, 54, 1)"}
            >
              {details.name}
            </Text>

            <Flex mt={"20px"} flexDir={"row"} alignItems={"center"}>
              <Text w={"50%"} color={"rgba(134, 134, 134, 1)"}>
                Артикул: {details.sku}
              </Text>

              {/* Product reviews count*/}

              <Flex w={"50%"} flexDir={"row"} alignItems={"center"} gap={"2px"}>
                {[1, 2, 3, 4, 5].map((item) => (
                  <Box key={item} width={"14px"} h={"14px"}>
                    <svg
                      width="12"
                      height="13"
                      viewBox="0 0 12 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.46557 1.04722C5.68826 0.610865 6.31174 0.610865 6.53443 1.04722L7.95965 3.83994C8.04683 4.01077 8.21042 4.12963 8.39984 4.15975L11.4963 4.65222C11.9801 4.72916 12.1728 5.32214 11.8266 5.66876L9.61096 7.88722C9.47543 8.02293 9.41294 8.21524 9.44283 8.40469L9.93132 11.5018C10.0076 11.9857 9.50323 12.3522 9.0666 12.13L6.27205 10.7084C6.10111 10.6214 5.89889 10.6214 5.72795 10.7084L2.9334 12.13C2.49677 12.3522 1.99235 11.9857 2.06868 11.5018L2.55717 8.40469C2.58705 8.21524 2.52457 8.02293 2.38904 7.88722L0.173418 5.66876C-0.172763 5.32214 0.0199063 4.72916 0.503714 4.65222L3.60016 4.15975C3.78958 4.12963 3.95317 4.01077 4.04035 3.83994L5.46557 1.04722Z"
                        fill={
                          details?.avarage_rating >= item
                            ? "#FCB900"
                            : "rgba(205, 205, 205, 1)"
                        }
                      />
                    </svg>
                  </Box>
                ))}

                <Text
                  fontFamily={"roboto"}
                  fontWeight={"300"}
                  fontSize={"14px"}
                  lineHeight={"21px"}
                  color={"rgba(134,134,134,1)"}
                  ms={"4px"}
                >
                  {details.reviews_count ? details.reviews_count : "0 отзывов"}
                </Text>
              </Flex>
            </Flex>
            {/* Product price */}
            <Flex
              flexDir={"row"}
              mt={{ base: "40px", lg: "30px" }}
              gap={"16px"}
              alignItems={{ base: "flex-end", lg: "center" }}
            >
              <Text
                fontFamily={"roboto"}
                fontWeight={"700"}
                fontSize={"26px"}
                lineHeight={"36.4px"}
                color={"orange"}
              >
                {selectedVariant.discounted_price
                  ? selectedVariant.discounted_price
                  : selectedVariant.price}{" "}
                сом
              </Text>
              {selectedVariant.discounted_price && <Text
                fontFamily={"roboto"}
                fontWeight={"700"}
                fontSize={"16px"}
                lineHeight={"22.4px"}
                color={"rgb(160,160,160)"}
                textDecoration={"line-through"}
              >
                {selectedVariant.price } сом
              </Text>}
            </Flex>
            {/* product color variants */}
          {colors.length > 1 && <ColorVariants
              colors={colors}
              variant={colorVariant}
              setVariant={handleChoosedVariant}
            />}
            {/* product size variants */}

            <VariantSizes
              sizes={sizes}
              handleSelectedVariant={handleSelectedVariant}
            />

            <CartButton />

            {/* Product desc */}

            <Box
              fontFamily={"roboto"}
              lineHeight={"24px"}
              fontSize={"16px"}
              color={"rgba(11, 11, 11, 1)"}
              mt={"50px"}
            >
              {details.description}
            </Box>

            {/* Product specs */}

            <Accordion
              defaultIndex={[0]}
              mt={"51px"}
              allowMultiple
              border={"none"}
            >
              <AccordionItem border={"none"}>
                <h2>
                  <AccordionButton
                    bg={"transparent"}
                    _hover={{ bg: "transparent" }}
                    px={0}
                    width={"auto"}
                  >
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      fontFamily={"roboto"}
                      fontSize={{ base: "16px", lg: "18px" }}
                      lineHeight={"22px"}
                      fontWeight={"700"}
                    >
                      Все характеристики
                    </Box>
                    <AccordionIcon width={"22px"} h={"22px"} ms={"6px"} />
                  </AccordionButton>
                </h2>
                <AccordionPanel mt={"14px"} px={0}>
                  <List
                    fontFamily={"roboto"}
                    fontSize={"16px"}
                    lineHeight={"24px"}
                  >
                    <ListItem
                      display={"flex"}
                      flexDir={{base:"column",lg:'row'}}
                      gap={"20px"}
                      borderBottom={"1px solid rgba(237, 237, 237, 1)"}
                      pt={"16px"}
                      pb={"16px"}
                      justifyContent={{base:'unset',lg:'space-between'}}

                    >
                      <Text w={{base:'auto',lg:'50%'}} fontWeight={"300"}>Цвет</Text>
                      <Text w={{base:'auto',lg:'50%'}} fontWeight={"400"}>Бежевый</Text>
                    </ListItem>
                  </List>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Flex>
        </Flex>

        <ProductReview productId={details.id} params={params} />

        <ProductsSection
          title={{ru:"ПОХОЖИЕ ТОВАРЫ",en:"RELATED PRODUCTS"}}
          listOptions={{
            flexWrap: "wrap",
            overflowX: "unset",
          }}
          locale={params.locale}
          productWidth={"calc(50% - 8px)"}
          products={similarProds}
        />
      </Flex>
    </>
  );
};

export default ProductPage;
