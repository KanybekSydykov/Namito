"use client";

import React, { useRef, useEffect, useState } from "react";
import { Box, Spinner, useMediaQuery } from "@chakra-ui/react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import Image from "next/image";
import "@splidejs/react-splide/css";
import "./CardSlider.css";

const ProductCardSlider = ({ activeSlideIndex, imagesArr = undefined }) => {
  const slideRef = useRef(null);
  const images = imagesArr.slice(0,3);
  const [loadingImages, setLoadingImages] = useState(
    new Array(images?.length).fill(true)
  );
  const [isDesktop] = useMediaQuery("(min-width: 768px)");


  useEffect(() => {
    if (slideRef.current && activeSlideIndex !== undefined) {
      slideRef.current.go(activeSlideIndex);
    }
  }, [activeSlideIndex]);



  const isImage = (url) => {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  };

  const handleImageLoad = (index) => {
    setLoadingImages((prevLoadingImages) => {
      const newLoadingImages = [...prevLoadingImages];
      newLoadingImages[index] = false;
      return newLoadingImages;
    });
  };

  const sliderType = isDesktop ? "fade" : "slide";

  return (
    <Box
      as={Splide}
      aria-label="My Favorite Images"
      hasTrack={false}
      options={{
        type: 'fade',
        pagination:false,
        loop: true,
        speed: 1000,
        arrows: false,
      }}
      ref={slideRef}
      w={"100%"}
      h={"100%"}
    >
      <Box as={SplideTrack} w={"100%"} h={"100%"}>
        {images?.length !== 0 ? (
          images?.map((item, index) => (
            <SplideSlide key={index}>
              <Box pos={"relative"} w={"100%"} h={"100%"} aspectRatio={500/783} position={'relative'}>
                {isImage(item) ? (
                  <>
                    <Image
                      src={item}
                      alt={`Image ${index + 1}`}
                      fill
                      onLoad={() => handleImageLoad(index)}
                      priority
                      style={{
                        width: "100%",
                        height: "100%",
                        minHeight:'100%',
                        maxHeight:'100%'
                      }}
                    />
                    {loadingImages[index] && (
                      <Box
                        pos={"absolute"}
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        bg={"rgba(0, 0, 0, 0.3)"}
                        width={"100%"}
                        height={"100%"}
                      >
                        <Image
                          src="/placeholder.jpeg"
                          alt="Placeholder"
                          width={500}
                          height={783}
                          priority
                          style={{
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            left: 0,
                          }}
                        />
                        <Spinner
                          position={"absolute"}
                          top={"50%"}
                          right={"auto"}
                          left={"auto"}
                          thickness="4px"
                          speed="0.65s"
                          emptyColor="gray.200"
                          color="blue.500"
                          size="xl"
                        />
                      </Box>
                    )}
                  </>
                ) : (
                  <video
                    src={item}
                    key={index}
                    controls
                    autoPlay
                    playsInline
                    loop
                    muted
                    width={"100%"}
                    height={"100%"}
                  ></video>
                )}
              </Box>
            </SplideSlide>
          ))
        ) : (
          <SplideSlide>
            <Box pos={"relative"} w={"100%"} h={"100%"}>
              <Image
                src="/placeholder.jpeg"
                alt="Placeholder"
                width={500}
                height={783}
                priority
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
          </SplideSlide>
        )}
      </Box>
    </Box>
  );
};

export default ProductCardSlider;
