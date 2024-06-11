"use client";

import React from "react";
import { Flex, Text, Image } from "@chakra-ui/react";
import PriceFilter from "./PriceFilter";
import BrandFilter from "./BrandFilter";
import ColorFilter from "./ColorFilter";
import SizeFilter from "./SizeFilter";
import RatingRadioGroup from "./RatingRadioGroup";
import OrangeButton from "../ui/OrangeButton";
import { useParams } from "next/navigation";

const FilterCover = ({
  getCheckBoxValues,
  handleRating,
  onChangePrice,
  borders = false,
  data,
}) => {
  const { locale } = useParams();

  const brands = data.brands;
  const colors = data.colors;
  const sizes = data.sizes;

  function clearFilters(){
    console.log('should clear filters');
  }

  return (
    <Flex
      flexDir={"column"}
      width={{ base: "100%", md: "300px" }}
      h={"max-content"}
      px={"24px"}
      py={"20px"}
      border={{ base: "none", lg: "1px solid rgba(0,0,0,0.1)" }}
      borderRadius={"10px"}
    >
      <Flex
        flexDir={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        borderBottom={"1px solid rgba(0,0,0,0.1)"}
        pb={"20px"}
      >
        <Text
          fontFamily={"roboto"}
          fontSize={"18px"}
          fontWeight={"600"}
          lineHeight={"25.2px"}
        >
          {locale === "ru" ? "Фильтр" : "Filter"}
        </Text>
        <Image
          src={"/filter-icon.svg"}
          alt={"filter"}
          width={20}
          height={20}
          style={{
            width: "20px",
            height: "18.5px",
          }}
        />
      </Flex>

      {/* PRICE */}
      <PriceFilter onChangePrice={onChangePrice} />

      {colors.length > 0 ? (
        <ColorFilter getValues={getCheckBoxValues} data={colors} />
      ) : null}
      {sizes.length > 0 ? (
        <SizeFilter getValues={getCheckBoxValues} data={sizes} />
      ) : null}
      {brands.length > 0 ? (
        <BrandFilter getValues={getCheckBoxValues} data={brands} />
      ) : null}

      <RatingRadioGroup handleRating={handleRating} locale={locale} />

      <OrangeButton fn={clearFilters} text={"Сбросить фильтры"} text_en={"Reset filters"} />
    </Flex>
  );
};

export default FilterCover;
