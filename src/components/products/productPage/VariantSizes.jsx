"use client";

import React, { useEffect, useState } from "react";
import { Flex, Text, Button } from "@chakra-ui/react";
import { useParams } from "next/navigation";

const VariantSizes = ({ sizes, handleSelectedVariant, selectedVariant }) => {
  const [selectedSize, setSelectedSize] = useState(undefined);
  const {locale} = useParams();

  function handleSelectedSize(index, variantId) {
    setSelectedSize(index);
    handleSelectedVariant(variantId);
  }

  useEffect(() => {
    if (selectedVariant && selectedVariant.size) {
      setSelectedSize(selectedVariant.size.id);
    }
  }, [sizes, selectedVariant]);


  return (
    <Flex mt={"30px"} flexDir={"column"}>
      <Text
        fontFamily={"roboto"}
        fontWeight={"700"}
        fontSize={"16px"}
        lineHeight={"22.4px"}
        color={"#000"}
      >
       {locale === 'ru' ? 'Размер' : 'Size'}
      </Text>

      <Flex flexDir={"row"} flexWrap={"wrap"} gap={"16px"} mt={"20px"}>
        {sizes.map((item, index) => (
          <Button
            key={index}
            minW={"83px"}
            h={"31px"}
            textAlign={"center"}
            borderRadius={"10px"}
            border={"1px solid orange"}
            py={"3.5px"}
            bg={selectedSize === item.size.id ? "orange" : "#fff"}
            _hover={{
              bg: item.stock ? "orange" : "gray",
              color: item.stock ? "#red" : "black"
            }}
            role="group"
            _disabled={{
              bg:'rgba(160, 160, 160, 1)',
              color:'#000',
              cursor:'not-allowed'
            }}
            isDisabled={item.stock === 0}
            onClick={() => handleSelectedSize(item.size.id, item.id)}
          >
            <Text
              fontFamily={"roboto"}
              fontWeight={"400"}
              fontSize={"16px"}
              lineHeight={"24px"}
              color={
                selectedSize === item.size.id
                  ? "#fff"
                  : item.stock && "rgba(160, 160, 160, 1)"
              }
              _groupHover={{ color: item.stock ? "white" : "black" }}
            >
              {item.size.name}
            </Text>
          </Button>
        ))}
      </Flex>

      <Text mt={"14.5px"}>Таблица размеров</Text>
    </Flex>
  );
};

export default VariantSizes;
