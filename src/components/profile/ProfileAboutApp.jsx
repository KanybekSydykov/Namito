import {
  Box,
  Flex,
  Highlight,
  Text,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

const ProfileAboutApp = ({data}) => {

  console.log(data);
  return (
    <Flex fontFamily={"roboto"} flexDir={"column"} gap={"50px"} py={{lg:'30px'}} >
      <Flex flexDir={{ base: "column", lg: "row" }} justifyContent={{ base: "center", lg: "space-between" }} px={'16px'} gap={"40px"}>
        <Flex flexDir={"column"} gap={"26px"} maxW={'640px'} >
          <Text
          fontWeight={'700'}
          fontSize={{base:'20px',lg:'36px'}}
          lineHeight={{base:'23px',lg:'50px'}}
          textTransform={'uppercase'}
          >
            {data.title}
            </Text>
          <Text
            fontWeight={"400"}
            fontSize={"16px"}
            lineHeight={"24px"}
            color={"rgba(118, 118, 118, 1)"}
          >
            <Highlight
              query={"Namito"}
              styles={{
                color: "rgba(203, 70, 9, 1)",
                fontWeight: "600",
                fontSize: "18px",
                lineHeight: "25.2px",
              }}
            >
             {data.content}
            </Highlight>
          </Text>
        </Flex>

        <Box
          w={{ base: "100%", lg: "auto" }}
          maxW={{ base: "390px", lg: "420px" }}
          height={{ base: "100%", lg: "auto" }}
          maxH={{base:'418px',lg:'450px'}}
          aspectRatio={390/418}
          position={"relative"}
        >
          <Image
            src={data.image || "/about-img.jpeg"}
            width={420}
            height={450}
            alt={"about"}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
      </Flex>

      <Flex flexDir={"column"} gap={"26px"} px={'16px'} maxW={'893px'}>
        <Text
          fontWeight={"700"}
          fontSize={{base:"20px",lg:'36px'}}
          lineHeight={{base:"24px",lg:'50px'}}
          color={"#000"}
          textTransform={"uppercase"}
        >
          часто задаваемые вопросы *
        </Text>

        <Accordion allowMultiple>

          {data.faqs.map((item, index) => (
            
          <AccordionItem key={item.question}>
            <h2>
              <AccordionButton  px={'5px'} py={'26px'}>
                <Box as="span" flex="1" textAlign="left">
                  {item.question}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
             {item.answer}
            </AccordionPanel>
          </AccordionItem>
          ))}

  
        </Accordion>
      </Flex>
    </Flex>
  );
};

export default ProfileAboutApp;
