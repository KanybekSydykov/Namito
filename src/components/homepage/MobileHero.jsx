'use client';

import React from 'react'
import { Flex, Text, Box, Highlight, useMediaQuery,AspectRatio } from '@chakra-ui/react'
import Image from 'next/image'
import Advantages from './Advantages'
import Link from 'next/link'

const MobileHero = ({data}) => {


    const AdvantagesData = [
        {
          title: data.counter1_title,
          value: data.counter1_value,
        },
        {
          title: data.counter2_title,
          value: data.counter2_value,
        },
        {
          title: data.counter3_title,
          value: data.counter3_value,
        },
      ];
    
    

  return (
    <Flex
    flexDir={{ base: "column", lg: "row" }}
    gap={"24px"}
    justifyContent={{ base: "unset", xl: "space-between" }}
    mt={{ base: "55px", lg: "50px", xl: "50px" }}
  >
    <Flex
      flexDir={"column"}
      gap={{ base: "24px", lg: "30px", xl: "50px" }}
      justifyContent={{ base: "unset", xl: "space-between" }}
    >
      <Flex
        fontFamily={"roboto"}
        fontWeight={"900"}
        flexDir={'row'}
        flexWrap={'wrap'}
        fontSize={{ base: "22px", lg: "50px" }}
        lineHeight={{ base: "30.8px", lg: "70px" }}
        color={"#000"}
        maxW={{ base: "470px", xl: "unset" }}
      >
        <Highlight
          query={"NAMITO"}
          styles={{
            fontFamily: "readex",
            fontWeight: "700",
            color: "#000",
          }}
        >
          {data.title}
        </Highlight>
      </Flex>

      <Text
        fontFamily={"roboto"}
        fontWeight={"400"}
        fontSize={{ base: "18px", lg: "20px" }}
        lineHeight={{ base: "25.2px", lg: "28px" }}
        color={"#363636"}
      >
        {data.description}
      </Text>
    </Flex>

    <Advantages data={AdvantagesData} />
    <Flex
      flexDir={"row"}
      gap={{ base: "16px", xl: "50px" }}
      justifyContent={"space-between"}
      mt={{ base: "40px", lg: "0px" }}
      mx={{ base: "4px", lg: "0px" }}
    >
      <Flex
        flexDir={"column"}
        gap={"16px"}
        flexGrow={1}
        w={{
          base: "116px",
          lg: "140px",
          xl: "190px",
          "2xl": "205px",
        }}
      >
        <AspectRatio width={"100%"} height={"100%"} ratio={116 / 142}>
          <Image
            src={data.banner1}
            alt={"hero image"}
            width={116}
            height={142}
            style={{
              borderRadius: "10px",
              width: "100%",
              height: "100%",
            }}
          />
        </AspectRatio>
        <AspectRatio width={"100%"} height={"100%"} ratio={116 / 142}>
          <Image
            src={data.banner2}
            alt={"hero image"}
            width={116}
            height={142}
            style={{
              borderRadius: "10px",
              width: "100%",
              height: "100%",
            }}
          />
        </AspectRatio>
      </Flex>
      <Box flexGrow={1} w={{ base: "218px", lg: "270px", xl: "350px" }}>
        <AspectRatio ratio={218 / 299} width={"100%"} h={"100%"}>
          <Image
            src={data.banner3}
            alt={"hero image"}
            width={218}
            height={299}
            style={{
              borderRadius: "10px",
              width: "100%",
              height: "100%",
            }}
          />
        </AspectRatio>
      </Box>
    </Flex>
    <Flex
          as={Link}
          href={"/catalog"}
          width={"100%"}
          h={"59px"}
          maxW={{ base: "unset", lg: "470px" }}
          borderRadius={"10px"}
          bg={"orange"}
          justifyContent={"center"}
          alignItems={"center"}
          color={"white"}
          fontFamily={"roboto"}
          fontWeight={"400"}
          fontSize={{ base: "18px", lg: "20px" }}
          lineHeight={"25.2px"}
          mt={{ base: "40px", lg: "0px" }}
        >
          {data.button}
        </Flex>
  </Flex>
  )
}

export default MobileHero