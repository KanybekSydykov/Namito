"use client";
import React, { useEffect, useState } from "react";
import {
  Drawer,
  Box,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Flex,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import Image from "next/image";
import { CloseIcon } from "@chakra-ui/icons";
import Search from "../search/Search";
import { useParams } from "next/navigation";
import CategoryItem from "@/components/categories/CategoryItem";
import { motion } from "framer-motion";

const staggerFlex = {
  initial: {
    opacity: 0,
    x: -30,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      type: "spring",
      staggerChildren: 0.15,
      stiffness: 100,
    },
  },
};

const Navmenu = ({ isDesktop, isCatalogDrawer, handleCatalogDrawer, data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { locale } = useParams();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  function handleSubCategories(item) {
    setCategories(item);
    setSubCategories([]);
  }

  useEffect(() => {
    isCatalogDrawer ? onOpen() : onClose();
  }, [isCatalogDrawer]);

  function handleDrawer(e) {
    e.stopPropagation();
    if (isCatalogDrawer) {
      handleCatalogDrawer(false);
    } else {
      handleCatalogDrawer(true);
    }
  }

  return (
    <>
      <Box
        w={{ base: "32px", lg: "auto" }}
        h={{ base: "32px", lg: "auto" }}
        borderRadius={"10px"}
        bg={"orange"}
        p={{ base: "0px", lg: "10px" }}
        onClick={handleDrawer}
        display={"flex"}
        flexDir={"row"}
        gap={"10px"}
        justifyContent={"center"}
        alignItems={"center"}
        cursor={"pointer"}
      >
        <Image
          src="/catalog-icon.svg"
          alt="catalog icon"
          width={14}
          height={14}
        />
        {isDesktop && (
          <Text
            fontFamily={"roboto"}
            fontWeight={"400"}
            fontSize={"14px"}
            lineHeight={"21px"}
            color={"#fff"}
          >
          {locale === "ru" ? "Каталог" : "Catalog"}
          </Text>
        )}
      </Box>
      <Drawer
        placement={isDesktop ? "top" : "left"}
        size={"full"}
        onClose={onClose}
        isOpen={isOpen}
        closeOnOverlayClick={false}
        autoFocus={false}
        isFullHeight={false}
      >
        <DrawerOverlay opacity={"0"} bg={"#fff"} />
        <DrawerContent
          mt={{ base: "0px", lg: "90px" }}
          maxH={"unset"}
          pb={{base:'30px',lg:"126px"}}
        >
          {!isDesktop && (
            <DrawerHeader
              display={"flex"}
              flexDir={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Search handleCatalogDrawer={handleCatalogDrawer} />
              <Flex
                onClick={handleDrawer}
                w={"16px"}
                h={"16px"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <CloseIcon width={"100%"} height={"100%"} />
              </Flex>
            </DrawerHeader>
          )}
          <DrawerBody pt={{ lg: "0px" }}>
            <Grid
              width={"100%"}
              gridTemplateColumns={{
                base: "repeat(1,minmax(0,1fr))",
                lg: "repeat(3,minmax(0,1fr))",
              }}
              height={"100%"}
              pb={"30px"}
              position={"relative"}
            >
              <GridItem
                as={motion.div}
                variants={staggerFlex}
                initial="initial"
                animate="initial"
                whileInView="animate"
                px={{ base: "0px", lg: "30px" }}
                py={"20px"}
                display={"flex"}
                flexDir={"column"}
                gap={{ base: "6px", lg: "12px" }}
                borderRight={{
                  base: "unset",
                  lg: "1px solid rgba(233, 233, 233, 1)",
                }}
                height={"100%"}
              >
                {data?.map((item, index) => (
                  <motion.div key={index} variants={staggerFlex}>
                    <CategoryItem
                      locale={locale}
                      onClick={onClose}
                      item={item}
                      onHover={() => handleSubCategories(item.children)}
                    />
                  </motion.div>
                ))}
              </GridItem>
              {categories.length > 0 && (
                <GridItem
                  as={motion.div}
                  variants={staggerFlex}
                  initial="initial"
                  animate="animate"
                  whileInView="animate"
                  px={{ base: "0px", lg: "30px" }}
                  py={"20px"}
                  display={"flex"}
                  flexDir={"column"}
                  gap={{ base: "6px", lg: "12px" }}
                  borderRight={{
                    base: "unset",
                    lg: "1px solid rgba(233, 233, 233, 1)",
                  }}
                  position={"sticky"}
                  top={"0px"}
                  height={"max-content"}
                  minHeight={"300px"}
                >
                  {categories.map((item, index) => (
                    <motion.div key={index} variants={staggerFlex}>
                      <CategoryItem
                        imgUrl={"/catalog-item-icon.svg"}
                        locale={locale}
                        onClick={onClose}
                        onHover={() => setSubCategories(item.children)}
                        item={item}
                      />
                    </motion.div>
                  ))}
                </GridItem>
              )}
              {subCategories.length > 0 && (
                <GridItem
                  as={motion.div}
                  variants={staggerFlex}
                  initial="initial"
                  animate="animate"
                  whileInView="animate"
                  px={{ base: "0px", lg: "30px" }}
                  py={"20px"}
                  display={"flex"}
                  flexDir={"column"}
                  gap={{ base: "6px", lg: "12px" }}
                  position={"sticky"}
                  top={"0px"}
                  height={"max-content"}
                >
                  {subCategories.map((item, index) => (
                    <motion.div key={index} variants={staggerFlex}>
                      <CategoryItem
                        imgUrl={"/catalog-item-icon.svg"}
                        locale={locale}
                        onClick={onClose}
                        key={index}
                        item={item}
                      />
                    </motion.div>
                  ))}
                </GridItem>
              )}
            </Grid>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navmenu;
