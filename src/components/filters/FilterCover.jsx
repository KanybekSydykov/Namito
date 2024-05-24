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

const FilterCover = ({
  prices,
  onChangePrice,
  getCheckBoxValues,
  borders = false,
}) => {
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
      <Accordion allowToggle defaultIndex={[0]}>
        <AccordionItem
          py={"20px"}
          borderTop={"none"}
          borderBottom={"1px solid rgba(0,0,0,0.1)"}
        >
          <h2>
            <AccordionButton
              p={"0"}
              background={"transparent"}
              _hover={{ background: "transparent" }}
            >
              <Box
                as="span"
                flex="1"
                textAlign="left"
                fontFamily={"roboto"}
                fontSize={"18px"}
                fontWeight={"600"}
                lineHeight={"25.2px"}
              >
                Цена
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>

          <AccordionPanel p={"0"} mt={"20px"}>
            <Flex
              width={"100%"}
              maxW={"85%"}
              ps={"20px"}
              flexDir={"row"}
              flexWrap={"wrap"}
              gap={"20px"}
            >
              <RangeSlider
                aria-label={["min", "max"]}
                onChange={(val) => onChangePrice(val)}
                py={"15px"}
                min={50}
                max={50000}
                defaultValue={[5000, 25000]}
              >
                <RangeSliderTrack h={"6px"}>
                  <RangeSliderFilledTrack bg={"rgb(0,0,1)"} />
                </RangeSliderTrack>
                <RangeSliderThumb
                  index={0}
                  bg={"rgb(0,0,1)"}
                  w={"20px"}
                  h={"20px"}
                  _focus={{ boxShadow: "none" }}
                />
                <RangeSliderThumb
                  index={1}
                  bg={"rgb(0,0,1)"}
                  w={"20px"}
                  h={"20px"}
                  _focus={{ boxShadow: "none" }}
                />
              </RangeSlider>
              <Flex
                flexDir={"row"}
                justifyContent={"space-evenly"}
                width={"100%"}
                fontFamily={"roboto"}
                fontWeight={"400"}
                fontSize={"18px"}
                lineHeight={"25.2px"}
              >
                <Text>{prices[0]}</Text>
                <Text>{prices[1]}</Text>
              </Flex>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <CheckBoxList
        title={"Цвет"}
        getValues={getCheckBoxValues}
        data={[0, 1, 2, 3, 4, 5]}
        roundedFull
      />
      <CheckBoxList
        title={"Размер"}
        getValues={getCheckBoxValues}
        data={[0, 1, 2, 3, 4, 5]}
      />
      <CheckBoxList
        title={"Бренд"}
        getValues={getCheckBoxValues}
        data={[0, 1, 2, 3, 4, 5]}
      />
      <CheckBoxList
        title={"Рейтинг товара"}
        getValues={getCheckBoxValues}
        data={[0, 1, 2, 3, 4, 5]}
        isLast={true}
      />
    </Flex>
  );
};

export default FilterCover;
