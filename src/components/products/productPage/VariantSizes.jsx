'use client'

import React,{useEffect, useState} from 'react'
import { Flex, Text, Button } from '@chakra-ui/react'

const VariantSizes = ({sizes,handleSelectedVariant}) => {

    const [selectedSize, setSelectedSize] = useState(undefined)

    function handleSelectedSize(index,variantId) {
        setSelectedSize(index)
        handleSelectedVariant(variantId)
    }

    useEffect(() => {
        setSelectedSize(undefined)
    }, [sizes])

  return (
    <Flex mt={"30px"} flexDir={"column"}>
    <Text
      fontFamily={"roboto"}
      fontWeight={"700"}
      fontSize={"16px"}
      lineHeight={"22.4px"}
      color={"#000"}
    >
      Размеры
    </Text>

    <Flex flexDir={"row"} flexWrap={"wrap"} gap={"16px"} mt={"20px"}>
        {sizes.map((item, index) => 
      <Button
        key={index}
        minW={"83px"}
        h={"31px"}
        textAlign={"center"}
        borderRadius={"10px"}
        border={"1px solid orange"}
        py={"3.5px"}
        bg={selectedSize === index ? "orange" : "#fff"}
        _hover={{
          bg: "orange",
          color: "#fff",
        }}
        role='group'
        onClick={()=>handleSelectedSize(index,item.id)}
      >
        <Text
          fontFamily={"roboto"}
          fontWeight={"400"}
          fontSize={"16px"}
          lineHeight={"24px"}
          color={selectedSize === index ? "#fff" :"rgba(160, 160, 160, 1)"}
          _groupHover={{ color: "#fff" }}
        >
          {item.size.name}
        </Text>
      </Button>

        )}
    
    </Flex>

    <Text mt={"14.5px"}>Таблица размеров</Text>
  </Flex>
  )
}

export default VariantSizes