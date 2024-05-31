"use client";
import React, { useEffect, useState } from "react";
import { Flex, Box, Text, Button, Grid, GridItem } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import ProductCardSlider from "./ProductCardSlider";
import { useRouter } from "next/navigation";
import FavButton from "./FavButton";
import {motion} from "framer-motion"

const Product = ({
  width = "100%",
  details = undefined,
  token,
  handleRemoveFavItem,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const params = useParams();
  const router = useRouter();
  const [buttonVisibility, setButtonVisibility] = useState(false);

  if (details === null) {
    return <></>;
  }

  return (
    <>
      <Flex
        p={"10px 10px 16px 10px"}
        w={"100%"}
        // minW={width}
        // maxW={width}
        flexDir={"column"}
        gap={"20px"}
        borderRadius={"10px"}
        boxShadow={"0px 0px 4px 0px rgba(0, 0, 0, 0.25)"}
        onMouseEnter={() => setButtonVisibility(true)}
        onMouseLeave={() => setButtonVisibility(false)}
      >
        <Flex
          flexDir={"column"}
          gap={"20px"}
          position={"relative"}
          cursor={"pointer"}
        >
          {/* Card Images */}
          <Flex position={"relative"}>
            <Flex
              aspectRatio={257 / 290}
              pos={"relative"}
              position={"relative"}
              borderRadius={"10px"}
              overflow={"hidden"}
              minW={{ base: "199px", lg: "225px" }}
              width={"100%"}
              maxW={{ base: "240px", lg: "270px" }}
              height={{ base: "225px", lg: "290px" }}
              zIndex={2}
            >
              <ProductCardSlider
                activeSlideIndex={activeSlide}
                imagesArr={details?.images}
              />
              <Grid
                as={Link}
                prefetch={true}
                href={`/${params.locale}/product/${details?.id}`}
                position={"absolute"}
                top={0}
                left={0}
                w={"100%"}
                h={"100%"}
                opacity={0}
                zIndex={1}
                gridTemplateColumns={`repeat(3, minmax(0,1fr))`}
              >
                {[0,1,2].map((item, index) => (
                  <GridItem
                    key={index}
                    onMouseEnter={() => setActiveSlide(index)}
                    w={"100%"}
                    h={"100%"}
                  />
                ))}
              </Grid>
            </Flex>
            {details?.tags?.map((tag, index) => (
              <Text
                textAlign={"center"}
                p={"1px 6px"}
                key={index}
                bg={tag.color}
                borderRadius={"5px"}
                position={"absolute"}
                left={0}
                bottom={`${index * 25}px`}
                color={"#fff"}
                fontFamily={"roboto"}
                fontWeight={"400"}
                fontSize={"14px"}
                opacity={"0.8"}
                lineHeight={"16.8px"}
                h={"20px"}
                zIndex={5}
              >
                {tag.name}
              </Text>
            ))}

            <FavButton
              handleRemoveFavItem={handleRemoveFavItem}
              id={details.id}
              token={token}
              isFavorite={details.is_favorite}
            />
          </Flex>
          {/* Card Prices */}
          <Flex
            flexDir={"column"}
            gap={"8px"}
            position={"relative"}
            cursor={"pointer"}
          >
            <Flex
              flexDir={{ base: "row", lg: "row" }}
              gap={{ base: "12px", lg: "10px" }}
              justifyContent={{ base: "unset", lg: "flex-start" }}
              alignItems={{ base: "unset", lg: "flex-start" }}
            >
              <Text
                fontFamily={"roboto"}
                fontWeight={"900"}
                fontSize={"18px"}
                color={"orange"}
              >
                {details?.price.reduced_price
                  ? details?.price.reduced_price
                  : details?.price.price}{" "}
                сом
              </Text>
              {details?.price.reduced_price ? (
                <Text
                  fontFamily={"roboto"}
                  fontWeight={"700"}
                  fontSize={"15px"}
                  color={"rgb(160,160,160)"}
                  textDecoration={"line-through"}
                >
                  {details?.price.price} сом
                </Text>
              ) : null}
            </Flex>
            {/* Card text content */}
            <Flex flexDir={"column"} gap={"6px"}>
              <Text
                fontFamily={"roboto"}
                fontWeight={"600"}
                fontSize={{ base: "18px", lg: "20px" }}
                textOverflow={"ellipsis"}
                noOfLines={1}
                color={"rgb(54,54,54)"}
              >
                {details?.name}
              </Text>
              <Text
                fontFamily={"roboto"}
                fontWeight={"300"}
                fontSize={"18px"}
                textOverflow={"ellipsis"}
                noOfLines={2}
                color={"rgba(118, 118, 118, 1)"}
                minH={"54px"}
              >
                {details?.description}
              </Text>
            </Flex>

            <Flex
              flexDir={"row"}
              alignItems={"center"}
              gap={"2px"}
              mt={"8px"}
              opacity={details?.average_rating ? 1 : 0}
            >
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
                      fill={
                        details?.average_rating >= item
                          ? "#FCB900"
                          : "rgba(205, 205, 205, 1)"
                      }
                    />
                  </svg>
                </Box>
              ))}
            </Flex>
            <Link
              prefetch={true}
              href={`/${params.locale}/product/${details?.id}`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 1,
              }}
            />

            {buttonVisibility ? (
              <Button
              as={motion.div}
              initial={{ opacity: 0 ,y:10}}
              animate={{opacity:1,y:[0,-5,0]}}
              transition={{ type: "spring",dumbness:100, duration:0.1}}
                w={"100%"}
                h={"49px"}
                borderRadius={"10px"}
                textAlign={"center"}
                bg={"white"}
                border={"1px solid orange"}
                position={"absolute"}
                bottom={0}
                left={"0"}
                color={"orange"}
                zIndex={2}
                _hover={{
                  bg: "orange",
                  color: "#fff",
                }}
                onClick={() =>
                  router.push(`/${params.locale}/product/${details?.id}`)
                }
              >
                <Text
                  fontFamily={"roboto"}
                  fontWeight={"400"}
                  fontSize={"18px"}
                  lineHeight={"25.2px"}
                >
                  {params.locale === "en" ? "View Details" : "Подробнее"}
                </Text>
              </Button>
            ) : null}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Product;
