'use client';
import React,{ useEffect, useState } from "react";
import { Box, Flex,Button } from "@chakra-ui/react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import Image from "next/image";
import "@splidejs/react-splide/css";

const BannerSlider = ({ images }) => {



  function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }



  return (
    <>
      <Box
        as={Splide}
        aria-label="My Favorite Images"
        hasTrack={false}
        options={{
          type: "slide",
          loop: true,
          pagination:  false,
          speed: 1000,
          drag: "free",
          snap: true,
          mediaQuery: "min",
        }}
        w={"100%"}
        h={"100%"}
      >
        <Box as={SplideTrack} w={"100%"} h={"100%"}>
          {images?.map((item, index) => (
            
          <SplideSlide key={index}>
            <Box pos={'relative'} w={"100%"} h={"100%"}>

           <Image
              src={item.image}
              alt="Image 1"
              width={500}
              height={783}
              priority
              style={{
                width: "100%",
                height: "100%",
                borderRadius:'10px',
                objectFit:'cover'
              }}
            />
            </Box>
          </SplideSlide>
          ))}
     
        </Box>
        <Flex
          className="splide__arrows"
          position={"absolute"}
          top={{base:"102%",lg:'calc(50% - 12px)'}}
          left={0}
          w={"100%"}
          h={{base:"32px",lg:'0px'}}
          zIndex={3}
        >
          <Button
            className="splide__arrow splide__arrow--prev"
            w={{base:"32px",lg:'24px'}}
            h={{base:"32px",lg:'24px'}}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            borderRadius={'50%'}
            position={'absolute'}
            p={0}
            opacity={'1'}
            top={0}
            right={'unset'}
            left={{base:'calc(100% - 75px)',lg:'16px'}}
            minW={'unset'}
            boxShadow={'0 0 2.67px 2px rgba(130, 130, 130, 0.25)'}
            transform={'none'}
            bg={'orange'}
            _disabled={{
              opacity: '0.7 !important',
              display:'flex'
            }}
            _hover={{
              bg:'orange'
            }}
          >
            <Image
              src={"/banner_arrow.svg"}
              width={7}
              height={12}
              alt={"arrow"}
              loading="lazy"
              style={{
                width: "7px",
                height: "12px",
                transform: "rotate(-180deg)",
              }}
            />
          </Button>

          <Button
            className="splide__arrow splide__arrow--next"
            w={{base:"32px",lg:'24px'}}
            h={{base:"32px",lg:'24px'}}
            display={"flex"}
            justifyContent={"center"}
            p={0}
            alignItems={"center"}
            position={'absolute'}
            borderRadius={'50%'}
            opacity={'1'}
            top={0}
            zIndex={10}
            minW={'unset'}
            right={{base:'0',lg:'16px'}}
            left={'unset'}
            boxShadow={'0 0 2.67px 2px rgba(130, 130, 130, 0.25)'}
            transform={'none'}
            bg={'orange'}
            _disabled={{
              opacity: '0.7 !important',
              display:'flex'
            }}
            _hover={{
              bg:'orange'
            }}


          >
            <Image
              src={"/banner_arrow.svg"}
              width={7}
              height={12}
              alt={"arrow"}
              style={{
                width: "7px",
                height: "12px",
              }}
            />
          </Button>
        </Flex>
      
      </Box>
   
    </>
  );
};

export default BannerSlider;
