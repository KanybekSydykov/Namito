"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Flex,
  Box,
  Grid,
  Text,
  Container,
  useMediaQuery,
  Divider,
} from "@chakra-ui/react";
import Navmenu from "@/components/header/drawer/NavMenu";
import CatalogDrawer from "@/components/header/drawer/CatalogDrawer";
import CartDrawer from "@/components/header/drawer/CartDrawer";
import Search from "@/components/header/search/Search";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import Logo from "@/components/header/logo/Logo";
import HeaderProfileLinks from "./drawer/HeaderProfileLinks";
import LocaleSwitcher from "../Locale/Locale";
import PromotedCategories from "./promotedCategories/PromotedCategories";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Header = ({ data, isAuth, token }) => {
  const [isDesktop] = useMediaQuery("(min-width: 992px)");
  const [isCatalogDrawer, setIsCatalogDrawer] = useState(false);
  const params = useParams();
  const path = usePathname();
  const router = useRouter();
  const ref = useRef(null);
  const headerRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        if (window.scrollY > 100) {
          ref.current.style.top = "0px";
        } else {
          ref.current.style.top = "49px";
        }
      }

      if (headerRef.current) {
        if (window.scrollY > 100) {
          headerRef.current.style.boxShadow = "0 2px 3px 0 rgba(115, 115, 115, 0.2)";
        } else {
          headerRef.current.style.boxShadow = "unset";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  useEffect(() => {
    router.refresh();
  }, [isDesktop, isAuth]);

  function handleCatalogDrawer(value) {
    setIsCatalogDrawer(value);
  }

  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, transition: { duration: 0.3 } }}
    exit={{ opacity: 0 }}
    >
      {/* Top nav */}
      <Container
        maxW={"100vw"}
        pos={{ base: "relative", lg: "fixed" }}
        top={0}
        zIndex={{ base: "1", lg: isCatalogDrawer ? "2000" : "10" }}
        bg={"rgba(255,255,255,0.75)"}
        py={{ lg: "20px" }}
        _hover={{
          bg: "rgba(255,255,255,1)",
        }}
        transition={"all 0.3s ease"}
        px={"0px"}
        boxShadow={
            isCatalogDrawer ? "0 0 7px 0 rgba(115, 115, 115, 0.2)" : '0 0 0 0 rgba(115, 115, 115, 0.2)'
        }
        ref={headerRef}
      >
        <Flex
          maxW={{ base: "100%", lg: "1200px", xl: "1280px", "2xl": "1440px" }}
          flexDir={"row"}
          px={"16px"}
          justifyContent={{ base: "space-between", xl: "flex-start" }}
          alignItems={"center"}
          mx={"auto"}
        >
          <Box onClick={() => setIsCatalogDrawer(false)}>
            <Logo params={params} />
          </Box>

          {isDesktop && (
            <Flex
              flexDir={"row"}
              flexGrow={1}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Flex flexDir={"row"} gap={"16px"} ms={"50px"}>
                <CatalogDrawer
                  isDesktop={isDesktop}
                  handleCatalogDrawer={handleCatalogDrawer}
                  isCatalogDrawer={isCatalogDrawer}
                  data={data.categories}
                />
                <Search handleCatalogDrawer={handleCatalogDrawer} />
              </Flex>
              <Flex flexDir={"row"} gap={"16px"} alignItems={"center"}>
                <LocaleSwitcher />

                <HeaderProfileLinks
                  isDekstop={isDesktop}
                  locale={params.locale}
                  isAuth={isAuth}
                />
                <CartDrawer
                  token={token}
                  isAuth={isAuth}
                  locale={params.locale}
                  isDesktop={isDesktop}
                />
              </Flex>
            </Flex>
          )}

          {!isDesktop && <Navmenu isAuth={isAuth} locale={params.locale} />}
        </Flex>
      </Container>

      {/* Middle nav */}
      {!isDesktop && (
        <Container
          maxW={{ base: "100%", lg: "1200px", xl: "1280px", "2xl": "1440px" }}
          position={"fixed"}
          top={"49px"}
          zIndex={100}
          transition={"top 0.3s"}
          display={"flex"}
          flexDir={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          py={"12px"}
          bg={"#212528"}
          ref={ref}
        >
          <>
            <CatalogDrawer
              isCatalogDrawer={isCatalogDrawer}
              isDesktop={isDesktop}
              handleCatalogDrawer={handleCatalogDrawer}
              data={data.categories}
            />
            <Search handleCatalogDrawer={handleCatalogDrawer} />
            <CartDrawer
              token={token}
              isAuth={isAuth}
              locale={params.locale}
              isDesktop={isDesktop}
            />
          </>
        </Container>
      )}

      {/* Bottom Nav */}
      {!isDesktop && path.endsWith(params.locale) ? (
        <PromotedCategories
          isDesktop={isDesktop}
          data={data.promoted}
          params={params}
        />
      ) : (
        isDesktop && (
          <PromotedCategories
            isDesktop={isDesktop}
            data={data.promoted}
            params={params}
          />
        )
      )}
    </motion.div>
  );
};

export default Header;
