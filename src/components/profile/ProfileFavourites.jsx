import { Grid, GridItem, Flex, Text, Box } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import Product from "../products/product-card/Product";

const favProds = false;

const ProfileFavourites = () => {
  return (
    <>
      {favProds && (
        <Grid
          gridTemplateColumns={{
            base: "repeat(2, minmax(171px,1fr))",
            lg: "repeat(3, minmax(171px,1fr))",
          }}
          gap={"16px"}
          mx={"16px"}
        >
          {favProds &&
            favProds.map((item, index) => (
              <GridItem key={index}>
                <Product />
              </GridItem>
            ))}
        </Grid>
      )}
      {!favProds && (
        <Flex flexDir={"column"} gap={"24px"} px={{base:"16px",lg:'150px'}} py={'50px'} w={"100%"}>
          <Flex
            fontFamily={"roboto"}
            fontSize={"16px"}
            lineHeight={"24px"}
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"20px"}
            textAlign={"center"}
            position={'relative'}
          >
            <Box
              width={{
                base: "50px",
                lg: "128px",
              }}
              height={{
                base: "50px",
                lg: "128px",
              }}
              position={"relative"}
            >
              <Image src={"/no-favs-icon.svg"} fill />
            </Box>
            <Text fontWeight={"400"}>
              Вы ещё не добавляли товары в избранное
            </Text>
            <Text fontWeight={"300"}>
              Чтобы сохранить товар в избранных, нажмите значок 
              </Text>
              <Flex
              display={'inline-flex'}
              w={"32px"}
              h={"32px"}
              borderRadius={"10px"}
              bg={"rgba(255, 255, 255, 1)"}
              justifyContent={'center'}
              alignItems={'center'}
              boxShadow={
                "0 0 4px 1px rgba(151, 151, 151, 0.25)"}
            >
              <Image
                src={"/fav-icon.svg"}
                alt={"heart"}
                width={20}
                height={20}
              />
            </Flex>
            <Text fontWeight={"300"}>
               на карточке
              товара или на странице товара
            </Text>
     
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default ProfileFavourites;
