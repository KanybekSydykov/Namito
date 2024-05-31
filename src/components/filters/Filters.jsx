"use client";

import React, { useEffect, useState } from "react";
import {
  Flex,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import Image from "next/image";
import CheckBoxList from "./CheckBoxList";
import ModalWindow from "../ui/ModalWindow";
import FilterCover from "./FilterCover";
const Filters = ({data,handleFilters,handlePrice,handleRating}) => {
 
  const [isMobile] = useMediaQuery("(max-width: 992px)");

  function onChangePrice(value) {
    handlePrice(value)
  }

  function getCheckBoxValues(title, values) {
    handleFilters(title,values)
  }


  return (
    <>
      {isMobile ?
      
      <ModalWindow ButtonEl={ModalButton}>
        <FilterCover handleRating={handleRating} data={data} onChangePrice={onChangePrice} borders={false} getCheckBoxValues={getCheckBoxValues} />
      </ModalWindow>
      
      :  (
       <FilterCover handleRating={handleRating} data={data} onChangePrice={onChangePrice} getCheckBoxValues={getCheckBoxValues} />
      )}
    </>
  );
};

export default Filters;

function ModalButton({ onClick }) {
  return (
    <Flex
    flexDir={"row"}
    justifyContent={"center"}
    alignItems={"center"}
    border={"1px solid rgba(54, 54, 54, 1)"}
    onClick={onClick}
    w={'134px'}
    h={'40px'}
    borderRadius={'8px'}
    gap={'6px'}
  >
    <Text
      fontFamily={"roboto"}
      fontSize={"16px"}
      fontWeight={"400"}
      lineHeight={"24px"}
    >
      Фильтр
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
  )
}