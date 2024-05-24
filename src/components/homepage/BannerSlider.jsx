"use client";

import React from "react";
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
          arrows:false,
          drag: "free",
          snap: true,
        }}
        w={"100%"}
        h={"100%"}
      >
        <Box as={SplideTrack} w={"100%"} h={"100%"}>
          {images?.map((item, index) => (
            
          <SplideSlide key={index}>
            <Box pos={'relative'} w={"100%"} h={"100%"}>
           {isImage(item.image) ? (
           <Image
              src={item.image}
              alt="Image 1"
              width={500}
              height={783}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
            ) : (<video
            src={item.image}
            key={index}
            controls
            autoPlay
            playsInline
            loop
            muted
            width={'100%'}
            height={'100%'}
            ></video>)}
            </Box>
          </SplideSlide>
          ))}
     
        </Box>
        <Flex
          className="splide__arrows"
          position={"absolute"}
          top={"281px"}
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
            bg={"#fff"}
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
            bg={"#fff"}
            position={'absolute'}
            borderRadius={'50%'}
            opacity={'1'}
            top={0}
            minW={'unset'}
            right={'unset'}
            left={'calc(100% + 16px)'}
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
