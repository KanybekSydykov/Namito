import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
  Text,
  Image,
  Box,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";
import CheckBoxList from "./CheckBoxList";
import PriceFilter from "./PriceFilter";
import BrandFilter from "./BrandFilter";
import ColorFilter from "./ColorFilter";
import SizeFilter from "./SizeFilter";

const FilterCover = ({
  prices,
  onChangePrice,
  getCheckBoxValues,
  borders = false,
  data,
}) => {
  const brands = data.brands;
  const colors = data.colors;
  const sizes = data.sizes;

  return (
    <Flex
      flexDir={"column"}
      width={{ base: "100%", md: "300px" }}
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

      {/* PRICE */}
      <PriceFilter prices={prices} onChangePrice={onChangePrice} />

    {colors.length > 0 ? <ColorFilter getValues={getCheckBoxValues} data={colors} /> : null}
    {sizes.length > 0 ?  <SizeFilter getValues={getCheckBoxValues} data={sizes}/> : null}
    {brands.length > 0 ?  <BrandFilter getValues={getCheckBoxValues} data={brands} /> : null}
      <CheckBoxList
        title={"Рейтинг товара"}
        getValues={getCheckBoxValues}
        data={[0, 1, 2, 3, 4]}
        isLast={true}
        isRating = {true}
      />
    </Flex>
  );
};

export default FilterCover;
