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
          arrows:true,
          drag: "free",
          snap: true,
          mediaQuery: "min",
          breakpoints: {
            992:{
              arrows:false
            }
          }
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
          top={"100%"}
          left={0}
          w={"100%"}
          h={"0"}
          zIndex={3}
        >
          <Button
            className="splide__arrow splide__arrow--prev"
            w={"48px"}
            h={"48px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            bg={"orange"}
            borderRadius={'50%'}
            position={'absolute'}
            p={0}
            opacity={'1'}
            top={0}
            right={'calc(100% + 16px)'}
            left={'unset'}
            minW={'unset'}
            boxShadow={'0 0 2.67px 2px rgba(130, 130, 130, 0.25)'}
          >
            <Image
              src={"/arrow-next.svg"}
              width={11}
              height={14}
              alt={"arrow"}
              loading="lazy"
              style={{
                width: "11.78px",
                height: "14.74px",
                transform: "rotate(180deg)",
              }}
            />
          </Button>

          <Button
            className="splide__arrow splide__arrow--next"
            w={"48px"}
            h={"48px"}
            display={"flex"}
            justifyContent={"center"}
            p={0}
            alignItems={"center"}
            bg={"orange"}
            position={'absolute'}
            borderRadius={'50%'}
            opacity={'1'}
            top={0}
            minW={'unset'}
            right={'unset'}
            left={'0'}
            boxShadow={'0 0 2.67px 2px rgba(130, 130, 130, 0.25)'}

          >
            <Image
              src={"/arrow-next.svg"}
              width={11}
              height={14}
              alt={"arrow"}
              style={{
                width: "11.78px",
                height: "14.74px",
              }}
            />
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default BannerSlider;
