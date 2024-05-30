import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import Image from "next/image";
import "@splidejs/react-splide/css";

const ReviewModal = ({ images, activeSlide, isOpen, onClose }) => {
  const [currentImage, setCurrentImage] = useState(activeSlide);

  const mainSliderRef = useRef(null);
  const thumbnailsSliderRef = useRef(null);


  useEffect(() => {
    if (mainSliderRef.current && isOpen) {
      thumbnailsSliderRef.current.go(activeSlide);
    }
  }, [activeSlide, isOpen]);



  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size={"2xl"}>
      <ModalOverlay />
      <ModalContent bg={"transparent"}>
        <ModalCloseButton bg={"#fff"} />
        <ModalBody
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          pt={"50px"}
          bg={"transparent"}
          mx={"auto"}
        >
          <Box
            width={{ base: "390px", lg: "35rem" }}
            maxW={"42rem"}
            height={{ base: "390px", lg: "35rem" }}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            position={"relative"}
            mb={"50px"}
          >
            <Box
              as={Splide}
              w={"100%"}
              h={"100%"}
              aria-label="Main"
              ref={mainSliderRef}
              hasTrack={false}
              options={{
                type: "slide", // use 'fade' to smoothly transition between slides
                loop: true,
                speed: 1000,
                arrows: true,
                pagination: false,
                perPage: 1,
                isNavigation: true,
                drag: true,
              }}
            >
              <Box as={SplideTrack} w={"100%"} h={"100%"}>
                {images.map((image, index) => (
                  <SplideSlide key={index} style={{ position: "relative" }}>
                    <Image src={image.image} alt="review image" fill />
                  </SplideSlide>
                ))}
              </Box>
            </Box>
          </Box>

          <Splide
            aria-label="thumbnails"
            ref={thumbnailsSliderRef}
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
                  wheel: true,
                },
              },
            }}
            hasTrack={false}
          >
            <SplideTrack>
              {images.map((item, index) => (
                <SplideSlide
                  style={{ position: "relative" }}
                  key={item.id}
                  onClick={() => mainSliderRef.current.go(index)}
                >
                  <Image fill src={item.image} alt="review image" />
                </SplideSlide>
              ))}
            </SplideTrack>
          </Splide>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ReviewModal;
