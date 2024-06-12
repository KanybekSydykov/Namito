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

const PriceFilter = ({onChangePrice,min_price,max_price}) => {
  const [prices, setPrices] = useState([min_price, max_price]);
  const {locale} = useParams();

  return (
    <Accordion allowToggle defaultIndex={[0]} role="group">
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
              min={min_price}
              max={max_price}
              defaultValue={[min_price, max_price]}
              minStepsBetweenThumbs={200}
              minH={'20px'}
            >
              <RangeSliderTrack h={"3px"} _groupHover={{ h: "5px" }} transition={"height 0.3s ease"}>
                <RangeSliderFilledTrack bg={'linear-gradient(90deg, rgba(226,157,125,1) 0%, rgba(203,70,9,1) 100%)'} />
              </RangeSliderTrack>
              <RangeSliderThumb
                index={0}
                bg={"#e29d7d"}
                w={{base:'20px',lg:"10px"}}
                h={{base:'20px',lg:"10px"}}
                transition={"width 0.3s ease, height 0.3s ease"}
                _groupHover={{
                  width: "20px",
                  height: "20px",
                }}
                className="min"
                _focus={{ boxShadow: "none" }}
              />
              <RangeSliderThumb
                index={1}
                bg={"orange"}
                w={{base:'20px',lg:"10px"}}
                h={{base:'20px',lg:"10px"}}
                transition={"width 0.3s ease, height 0.3s ease"}
                _groupHover={{
                  width: "20px",
                  height: "20px",
                }}
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
