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
  Skeleton,
} from "@chakra-ui/react";
import ProductReview from "@/components/products/product-reviews/ProductReview";
import ProductsSection from "@/components/products/products-section/ProductsSection";
import CartButton from "@/components/ui/CartButton";
import Thumbnails from "./Thumbnails";
import ColorVariants from "./ColorVariants";
import VariantSizes from "./VariantSizes";
import Link from "next/link";
import ProductCharacteristics from "./ProductCharacteristics";
import { notFound } from "next/navigation";
import BreadCrumbs from "@/components/shared-components/breadcrumb/BreadCrumbs";

const ProductPage = ({
  params,
  details,
  similarProds,
  token,
  reviews,
}) => {
  const [colorVariant, setColorVariant] = useState(undefined);
  const [uniqueVariantColors, setUniqueVariantColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [sliderImages, setSliderImages] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState({});
  const [colors, setColors] = useState([]);
  const [showMore, setShowMore] = useState(false);


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

  const moreText = params.locale === 'ru' ? 'Показать больше' : 'Show more'

  const lessText = params.locale === 'ru' ? 'Скрыть' : 'Show less'

  console.log(details);

  return (
    <>
      <Flex flexDir={"column"} mt={'30px'} px={"16px"} gap={"100px"} fontFamily={"roboto"}>
     <BreadCrumbs locale={params.locale} data={{current: details.name, parent: {slug: details.category_slug, name: details.category_name}}} />

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
            {sliderImages.length > 0 ? (
              <Thumbnails images={sliderImages} tags={details.tags} />
            ) : (
              <Image src={"/placeholder.jpeg"} fill alt="placeholder image" />
            )}
          </Flex>

          {/* prod info */}
          {details ? (
            <Flex
              flexDir={"column"}
              px={{ base: "16px", lg: "0px" }}
              flexGrow={1}
            >
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
                 {params.locale === 'ru' ? ' Артикул:' : "Article:"} {details.sku}
                </Text>

                {/* Product reviews count*/}

                <Flex
                  as={Link}
                  href={"#reviews"}
                  w={"50%"}
                  flexDir={"row"}
                  alignItems={"center"}
                  gap={"2px"}
                >
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
                            details?.average_rating >= item
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
                    {details.review_count
                      ? `${details.review_count}${params.locale ==='ru' ? ' отзывов' : ' reviews'}`
                      : `0 ${params.locale ==='ru' ? ' отзывов' : ' review'}`}
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
                  {params.locale === "ru" ? "сом" : "kgs"}
                </Text>
                {selectedVariant.discounted_price && (
                  <Text
                    fontFamily={"roboto"}
                    fontWeight={"700"}
                    fontSize={"16px"}
                    lineHeight={"22.4px"}
                    color={"rgb(160,160,160)"}
                    textDecoration={"line-through"}
                  >
                    {selectedVariant.price}{" "}
                    {params.locale === "ru" ? "сом" : "kgs"}
                  </Text>
                )}
              </Flex>
              {/* product color variants */}
              {colors.length > 1 && (
                <ColorVariants
                  colors={colors}
                  variant={colorVariant}
                  setVariant={handleChoosedVariant}
                />
              )}
              {/* product size variants */}

              <VariantSizes
                sizes={sizes}
                handleSelectedVariant={handleSelectedVariant}
                selectedVariant={selectedVariant}
              />

              <CartButton
                selectedVariant={selectedVariant}
                token={token}
                image={sliderImages[0]}
              />

              {/* Product desc */}
              <Box position={"relative"}>
                <Box
                  fontFamily={"roboto"}
                  lineHeight={"24px"}
                  fontSize={"16px"}
                  color={"rgba(11, 11, 11, 1)"}
                  mt={"50px"}
                  position={"relative"}
                  noOfLines={showMore ? "unset" : 10}
                >
                  {details.description}
                </Box>
                <Button
                  position={"absolute"}
                  top={"100%"}
                  right={0}
                  bg={"transparent"}
                  color={"#000"}
                  border={"unset"}
                  outline={"unset"}
                  boxShadow={"unset"}
                  onClick={() => setShowMore(!showMore)}
                  _hover={{
                    bg: "transparent",
                    border: "unset",
                    outline: "unset",
                    boxShadow: "unset",
                    textDecoration: "underline",
                  }}
                >
                  {showMore ? lessText : moreText}
                </Button>
              </Box>

              {/* Product specs */}
              <ProductCharacteristics
                params={params}
                data={details.characteristics}
              />
            </Flex>
          ) : (
            <Skeleton isLoaded={details} height={"100%"} flexGrow={1} />
          )}
        </Flex>

        <ProductReview
          productId={details.id}
          reviews={details.reviews}
          reviewsAllowed={details.review_allowed}
          params={params}
          token={token}
        />

        <ProductsSection
          title={{ ru: "ПОХОЖИЕ ТОВАРЫ", en: "RELATED PRODUCTS" }}
          listOptions={{
            flexWrap: "wrap",
            overflowX: "unset",
          }}
          locale={params.locale}
          productWidth={"calc(50% - 8px)"}
          products={similarProds}
          token={token}
        />
      </Flex>
    </>
  );
};

export default ProductPage;
