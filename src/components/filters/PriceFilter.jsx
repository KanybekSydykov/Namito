'use client';
import React,{useState} from "react";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderMark,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
  Text,
  Box,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";

const PriceFilter = ({onChangePrice}) => {
  const [prices, setPrices] = useState([5000, 25000]);
  const {locale} = useParams();

  return (
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
             {locale === 'ru' ? 'Цена' : 'Price'}
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
              onChange={(val) => setPrices(val)}
              onChangeEnd={(val) => onChangePrice(val)}
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
  );
};

export default PriceFilter;
