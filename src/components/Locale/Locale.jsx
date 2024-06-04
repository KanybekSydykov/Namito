"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n } from "../../i18n-config";
import { Link as ChakraLink, Divider, Flex } from "@chakra-ui/react";

export default function LocaleSwitcher({isWhite=false}) {
  const pathName = usePathname();

  const isActive = (locale) => {
    return pathName.startsWith(`/${locale}`);
  };
  const redirectedPathName = (locale) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };


  return (
      <Flex
        flexDir={"row"}
        gap={"10px"}
        fontSize={"18px"}
        fontWeight={"400"}
        lineHeight={"25px"}
        h={"22px"}
        justifyContent={"center"}
        alignItems={"center"}
        me={"14px"}
        fontFamily={"roboto"}
      >
        <ChakraLink
          as={Link}
          href={redirectedPathName(i18n.locales[0])}
          key={i18n.locales[0]}
          color={isActive(i18n.locales[0]) ? "orange" : isWhite ? "#fff" : "#000"}
        >
          РУ
        </ChakraLink>
        <Divider orientation="vertical" />
        <ChakraLink
          as={Link}
          href={redirectedPathName(i18n.locales[1])}
          key={i18n.locales[1]}
          color={isActive(i18n.locales[1]) ? "orange" : isWhite ? "#fff" : "#000"}
        >
          EN
        </ChakraLink>
      </Flex>
  );
}
