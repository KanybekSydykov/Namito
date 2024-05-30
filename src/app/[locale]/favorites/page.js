import { Grid, GridItem, Flex, Text, Box, Container } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import Product from "@/components/products/product-card/Product";
import { getSession } from "@/lib/lib";
import { getData } from "@/lib/apiServices";
import { ENDPOINTS } from "@/API/endpoints";
import Favorites from "@/components/favorites/Favorites";

const favProds = false;

const page = async({params}) => {
  const session = await getSession();
  const token = session?.access_token;
  const response = await getData(token, ENDPOINTS.getUserFavorites());
  const favProds = response.data;

  console.log(favProds);

  return (
    <Container 
    maxW={{base:'1200px',xl:'1472px'}}
    py={'50px'}
    >
      {favProds.length ? 
  <Favorites products = {favProds} token = {token} />

:
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
              <Image src={"/no-favs-icon.svg"} alt={"heart"} fill />
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
}
    </Container>
  );
};

export default page;
