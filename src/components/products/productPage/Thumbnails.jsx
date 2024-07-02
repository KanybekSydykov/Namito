"use client";

import React, { useEffect, useRef } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import Image from "next/image";
import "@splidejs/react-splide/css";
import "@/components/products/product-card/CardSlider.css";

const Thumbnails = ({ images, tags }) => {
  //   const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {}, [images]);

  const slideRef = useRef(null);
  const thumbRef = useRef(null);

  function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

  function showSlide(index) {
    slideRef.current.go(index);
  }

  return (
    <>
      <Flex
        flexDir={{ base: "column", md: "row-reverse" }}
        justifyContent={{ base: "unset", md: "center" }}
        gap={"16px"}
        width={"100%"}
      >
        <Flex
          aspectRatio={171 / 283}
          width={{ base: "100%", md: "420px" }}
          maxW={"100%"}
          h={{ base: "426px", md: "500px" }}
          maxH={"100%"}
          pos={"relative"}
          px={{ base: "16px", md: "0" }}
        >
          <Skeleton
            isLoaded={images?.length > 0}
            aspectRatio={171 / 283}
            width={{ base: "100%", md: "420px" }}
            maxW={"100%"}
            h={{ base: "426px", md: "500px" }}
            maxH={"100%"}
            pos={"absolute"}
            top={0}
            left={0}
            px={{ base: "16px", md: "0" }}
            startColor="rgba(199,131,124,1)"
            endColor="rgba(236,169,162,1)"
          />
          <Box
            as={Splide}
            aria-label="Main"
            hasTrack={false}
            ref={slideRef}
            w={"100%"}
            h={"100%"}
            options={{
              type: "fade",
              loop: true,
              pagination: false,
              speed: 1000,
              arrows: false,
            }}
          >
            <Box as={SplideTrack} w={"100%"} h={"100%"}>
              {images &&
                images.map((item) => (
                  <SplideSlide key={item.id}>
                    <Box
                      pos={"relative"}
                      w={"100%"}
                      h={"100%"}
                      aspectRatio={1}
                      position={"relative"}
                    >
                      {isImage(item.image) ? (
                        <Image
                          src={item.image}
                          alt="Image 1"
                          fill
                          priority
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      ) : (
                        <video
                          src={item.image}
                          key={item.id}
                          controls
                          autoPlay
                          loop
                          muted
                          playsInline
                          width={"100%"}
                          height={"100%"}
                        ></video>
                      )}

                      {tags?.map((tag, index) => (
                        <Text
                          textAlign={"center"}
                          p={"1px 6px"}
                          key={index}
                          bg={tag.color}
                          borderRadius={"5px"}
                          position={"absolute"}
                          left={0}
                          top={`${index * 25}px`}
                          color={"#fff"}
                          fontFamily={"roboto"}
                          fontWeight={"400"}
                          fontSize={"14px"}
                          opacity={"0.8"}
                          lineHeight={"16.8px"}
                          h={"20px"}
                        >
                          {tag.name}
                        </Text>
                      ))}
                    </Box>
                  </SplideSlide>
                ))}
            </Box>
          </Box>
          <Grid
            position={"absolute"}
            top={0}
            left={0}
            w={"100%"}
            h={"100%"}
            opacity={0}
            zIndex={100}
            gridTemplateColumns={`repeat(${
              images && images.length
            }, minmax(0,1fr))`}
          >
            {images &&
              images.map((item, index) => (
                <GridItem
                  key={item.id}
                  onMouseEnter={() => {
                    showSlide(index);
                  }}
                  w={"100%"}
                  h={"100%"}
                />
              ))}
          </Grid>
        </Flex>
        {images?.length === 0 ? (
          <Grid
            gridTemplateRows={"repeat(3,minmax(0,1fr))"}
            gap={"16px"}
            w={{ base: "100%", md: "100px" }}
          >
            {[0, 1, 2].map((item, index) => (
              <Skeleton
                key={index}
                width={"100%"}
                height={"100%"}
                startColor="rgba(199,131,124,1)"
                endColor="rgba(236,169,162,1)"
              ></Skeleton>
            ))}
          </Grid>
        ) : (
          <Box
            as={Splide}
            aria-label="Thumbnails"
            hasTrack={false}
            ref={thumbRef}
            px={{ base: "16px", md: "0" }}
            w={{ base: "100%", md: "94px" }}
            className="thumbnails-slider"
            options={{
              type: "slide",
              updateOnMove: true,
              mediaQuery: "min",
              direction: "ltr",
              height: 143,
              perPage: 3,
              perMove: 3,
              fixedWidth: 100,
              fixedHeight: 143,
              isNavigation: true,
              gap: 16,
              pagination: false,
              arrows: true,
              drag: "free",
              dragMinThreshold: {
                mouse: 4,
                touch: 10,
              },
              breakpoints: {
                767: {
                  height: 500,
                  perPage: 3,
                  perMove: 3,
                  fixedWidth: 94,
                  fixedHeight: 113,
                  isNavigation: true,
                  gap: 16,
                  speed: 2000,
                  pagination: false,
                  arrows: true,
                  drag: "free",
                  easing: "cubic-bezier(0.25, 1, 0.5, 1)",
                  direction: "ttb",
                  wheel: true,
                },
              },
            }}
          >
            <Box
              as={SplideTrack}
              w={"100%"}
              h={"100%"}
              pos={"relative"}
              zIndex={2}
            >
              {images &&
                images.map((item, index) => (
                  <SplideSlide
                    key={index}
                    onClick={() => showSlide(index)}
                    onMouseEnter={() => showSlide(index)}
                  >
                    {isImage(item.small_image) ? (
                      <Image
                        src={item.small_image}
                        alt="Image 1"
                        width={100}
                        height={143}
                        priority
                        style={{
                          width: "100%",
                          height: "100%",
                          boxShadow: "0 0 4px 0px rgba(5, 5, 5, .5)",
                        }}
                      />
                    ) : (
                      <video
                        src={item.image}
                        muted
                        width={"100%"}
                        height={"100%"}
                      ></video>
                    )}
                  </SplideSlide>
                ))}
            </Box>

            <Flex
              className="splide__arrows"
              position={"absolute"}
              top={{ base: "calc(50% - 18px)", lg: "-36px" }}
              left={{ base: "0", lg: "calc(50% - 18px)" }}
              w={{ base: "100%", lg: "0" }}
              h={{ base: "0", lg: "572px" }}
              zIndex={3}
            >
              <Button
                className="splide__arrow splide__arrow--prev"
                w={"36px"}
                h={"36px"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                bg={"#fff"}
                borderRadius={"50%"}
                position={"absolute"}
                p={0}
                opacity={"1"}
                top={{ base: 0, lg: "0px !important" }}
                minW={"unset"}
                left={{ base: "16px", lg: "auto" }}
                transform={{
                  base: "rotate(90deg) !important",
                  lg: "rotate(180deg) !important",
                }}
                right={{ base: "unset", lg: "auto" }}
              >
                <Image
                  src={"/product/chevron-down.svg"}
                  width={12}
                  height={6}
                  alt="Next Arrow"
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                />
              </Button>

              <Button
                className="splide__arrow splide__arrow--next"
                w={"36px"}
                h={"36px"}
                display={"flex"}
                justifyContent={"center"}
                p={0}
                alignItems={"center"}
                bg={"#fff"}
                position={"absolute"}
                borderRadius={"50%"}
                opacity={"1"}
                top={{ base: 0, lg: "unset !important" }}
                bottom={{ base: "unset", lg: "0px !important" }}
                right={{ base: "16px", lg: "auto !important" }}
                left={{ base: "unset", lg: "auto !important" }}
                transform={{
                  base: "rotate(90deg) !important",
                  lg: "none !important",
                }}
                minW={"unset"}
              >
                <Image
                  src={"/product/chevron-down.svg"}
                  width={12}
                  height={6}
                  alt="Next Arrow"
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                />
              </Button>
            </Flex>
          </Box>
        )}
      </Flex>
    </>
  );
};

export default Thumbnails;
