import { Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { i18n } from "../../i18n-config";

const ProfileLanguage = () => {
  const router = useRouter();
  const {locale} = useParams()

  const handleLocaleChange = (locale) => {
    const newPath = `/${locale}/profile?page=language`;
    router.push(newPath);
  };

  return (
    <Flex
      flexDir={"column"}
      w={"100%"}
      px={"16px"}
      gap={"26px"}
      fontFamily={"roboto"}
    >
      <Flex w={"100%"} flexDir={"column"} gap={"10px"}>
        <Button
          display={"flex"}
          flexDir={"row"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          gap={"20px"}
          p={"16px"}
          fontWeight={"500"}
          fontSize={"18px"}
          lineHeight={"20px"}
          bg={locale === 'ru' ? "rgba(255, 211, 191, 1)" : '#fff'}
          _hover={{
            bg: "rgba(255, 211, 191, 1)",
          }}
          _focus={{
            bg: "rgba(255, 211, 191, 1)",
          }}
          boxShadow={"0 0 3px 0 rgba(134, 134, 134, 0.25)"}
          transition={"all 0.2s ease-in-out"}
          h={"auto"}
          width={{ base: "100%", lg: "358px" }}
          onClick={() => handleLocaleChange(i18n.locales[0])}
        >
          <Image
            src={"/ru-icon.svg"}
            width={40}
            height={40}
            style={{
              borderRadius: "50%",
            }}
          />
          <Text>Русский</Text>
        </Button>
        <Button
          display={"flex"}
          h={"auto"}
          width={{ base: "100%", lg: "358px" }}
          flexDir={"row"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          gap={"20px"}
          p={"16px"}
          fontWeight={"500"}
          fontSize={"18px"}
          lineHeight={"20px"}
          bg={locale === 'en' ? "rgba(255, 211, 191, 1)" : "#fff"}
          _hover={{
            bg: "rgba(255, 211, 191, 1)",
          }}
          _focus={{
            bg: "rgba(255, 211, 191, 1)",
          }}
          boxShadow={"0 0 3px 0 rgba(134, 134, 134, 0.25)"}
          transition={"all 0.2s ease-in-out"}
          onClick={() => handleLocaleChange(i18n.locales[1])}
        >
          <Image
            src={"/en-icon.svg"}
            width={40}
            height={40}
            style={{
              borderRadius: "50%",
            }}
          />
          <Text>English</Text>
        </Button>
      </Flex>

      <Button
        width={"100%"}
        maxW={{ base: "unset", lg: "355px" }}
        textAlign={"center"}
        py={"15px"}
        borderRadius={"10px"}
        bg={"rgba(203, 70, 9, .75)"}
        color={"#fff"}
        fontSize={"18px"}
        lineHeight={"25px"}
        fontWeight={"400"}
        h={"auto"}
        _hover={{
          bg: "rgba(203, 70, 9, 1)",
        }}
      >
        Сохранить
      </Button>
    </Flex>
  );
};

export default ProfileLanguage;
