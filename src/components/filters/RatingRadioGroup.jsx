import { Flex, Box, Text, Stack, Radio, RadioGroup, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon,Collapse } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import React,{useState} from "react";

const RatingRadioGroup = ({locale,handleRating,ratings}) => {


  return (
    <Accordion allowToggle defaultIndex={[0]}>
    <AccordionItem
      py={"20px"}
      borderTop={"none"}
      borderBottom={ "none"}
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
            {locale === 'ru' ? "Рейтинг" : "Rating"}
          </Box>
          <AccordionIcon w={'22px'} h={'22px'} />
        </AccordionButton>
      </h2>
      <AccordionPanel p={"0"} mt={"20px"}>
        <Collapse  startingHeight={ratings.length * 44}>
        <RadioGroup onChange={handleRating} >
      <Stack spacing={5} direction="column">
        {ratings.map((value) => (
          <Radio colorScheme="red" key={value} value={`${value}`}>
            <Flex flexDir={"row"} alignItems={"center"} gap={"2px"}>
              <Text
                fontFamily={"roboto"}
                fontSize={"16px"}
                fontWeight={"300"}
                me={"8px"}
              >
               {locale === 'ru' ? `От` : `From`}
              </Text>

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
                      fill={value >= item ? "#FCB900" : "rgba(205, 205, 205, 1)"}
                    />
                  </svg>
                </Box>
              ))}
            </Flex>
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
        </Collapse>

      </AccordionPanel>
    </AccordionItem>
  </Accordion>

  );
};

export default RatingRadioGroup;
