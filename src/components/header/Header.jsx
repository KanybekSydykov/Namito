"use client";
import React, { useState, useEffect } from "react";
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

const Header = ({ data,isAuth,token }) => {
  const [isDesktop] = useMediaQuery("(min-width: 992px)");
  const [isCatalogDrawer, setIsCatalogDrawer] = useState(false);
  const params = useParams();
  const path = usePathname();
  const router = useRouter()

  useEffect(() => {
      router.refresh()
  }, [isDesktop,isAuth]);

  function handleCatalogDrawer(value) {
    setIsCatalogDrawer(value);
  }

  return (
    <>
      {/* Top nav */}
      <Container
        maxW={"unset"}
        pos={"relative"}
        zIndex={{ base: "1", lg: isCatalogDrawer ? "2000" : "10" }}
        bg={"#fff"}
        py={{ lg: "20px" }}
        px={"0px"}
        boxShadow={
          isCatalogDrawer ? "0 0 7px 0 rgba(115, 115, 115, 0.2)" : "unset"
        }
      >
        <Flex
                  maxW={{ base: "100%", lg: "1200px", xl: "1200px", "2xl": "1440px" }}

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
                  <CartDrawer token={token} isAuth={isAuth} locale={params.locale} isDesktop={isDesktop} />

              </Flex>
            </Flex>
          )}

          {!isDesktop && <Navmenu isAuth={isAuth} locale={params.locale} />}
        </Flex>
      </Container>

      {/* Middle nav */}
      {!isDesktop && (
        <Container
        maxW={{ base: "100%", lg: "1200px", xl: "1200px", "2xl": "1440px" }}

          display={"flex"}
          flexDir={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          py={"12px"}
          bg={"#212528"}
        >
          <>
            <CatalogDrawer
              isCatalogDrawer={isCatalogDrawer}
              isDesktop={isDesktop}
              handleCatalogDrawer={handleCatalogDrawer}
              data={data.categories}
            />
            <Search handleCatalogDrawer={handleCatalogDrawer} />
            <CartDrawer token={token} isAuth={isAuth} locale={params.locale} isDesktop={isDesktop} />
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
    </>
  );
};

export default Header;
