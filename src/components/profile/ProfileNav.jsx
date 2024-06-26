"use client";

import { Box, Container, Flex, Icon, Text, useMediaQuery } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import AboutIcon from "@/../public/profile-icons/aboutApp-icon.svg";
import DeleteIcon from "@/../public/profile-icons/delete-icon.svg";
import DeliveryIcon from "@/../public/profile-icons/delivery-icon.svg";
import FavsIcon from "@/../public/profile-icons/favs-icon.svg";
import LangIcon from "@/../public/profile-icons/language-icon.svg";
import AdressIcon from "@/../public/profile-icons/location-icon.svg";
import LogoutIcon from "@/../public/profile-icons/logout-icon.svg";
import OrdersIcon from "@/../public/profile-icons/orders-icon.svg";
import ReviewsIcon from "@/../public/profile-icons/reviews-icon.svg";
import ProfileIcon from "@/../public/profile-icons/profile-icon.svg";
import CaptureIcon from "@/../public/profile-icons/captureIcon.svg";
import Image from "next/image";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import ProfileExitDelete from "./ProfileExitDelete";

const profileDataSkeleton = [
  {
    id: 1,
    name_ru: "Мои данные",
    name_en: "My data",
    icon: ProfileIcon,
    isPage:false,
    url: "settings",
  },
  {
    id: 2,
    name_ru: "Мои заказы",
    name_en: "My orders",
    icon: OrdersIcon,
    isPage:false,
    url: "orders",
  },
  {
    id: 3,
    name_ru: "Мои адреса",
    name_en: "My addresses",
    icon: AdressIcon,
    isPage:false,
    url: "adresses",
  },
  {
    id: 4,
    name_ru: "Мои отзывы",
    name_en: "My reviews",
    icon: ReviewsIcon,
    isPage:false,
    url: "reviews",
  },
  {
    id: 5,
    name_ru: "Избранные товары",
    name_en: "Favourites",
    icon: FavsIcon,
    url: "favourites",
    isPage:false,
  },
  {
    id: 6,
    name_ru: "О нас",
    name_en: "About",
    icon: AboutIcon,
    url: "about",
    isPage:true,
  },
  {
    id: 7,
    name_ru: "Доставка",
    name_en: "Delivery",
    icon: DeliveryIcon,
    url: "delivery",
    isPage:true,
  },
  {
    id: 8,
    name_ru: "Язык приложения",
    name_en: "Language",
    icon: LangIcon,
    url: "language",
    isPage:false,

  },
];

const serverProfileImg =
  "https://raw.githubusercontent.com/tturdumamatovv/Namito/main/assets/images/default-user.jpg";

const ProfileNav = ({data}) => {
  const path = usePathname();
  const { locale } = useParams();
  const [isDesktop] = useMediaQuery("(min-width: 992px)");
  const page = useSearchParams().get('page');

  return (
    <Container
      maxW={{ base: "100%", lg: "390px" }}
      px={"0px"}
      w={"100%"}
      fontFamily={"roboto"}
      mx={{ base: "auto", lg: "unset" }}
      pb={"45px"}
      bg={'#fff'}
      borderRadius={'10px'}
      pt={{base:'0px',lg:'20px'}}
      boxShadow={{base:'unset',lg:"0 0 4px 1px rgba(151, 151, 151, 0.25)"}}
    >
    {!isDesktop &&  <Text
        py={"14px"}
        boxShadow={"0 0 4px 1px rgba(151, 151, 151, 0.25)"}
        fontWeight={"700"}
        fontSize={"16px"}
        lineHeight={"22px"}
        px="16px"
      >
        {locale === 'ru' ? 'Профиль' : 'Profile'}
      </Text>}
      <Flex w={"100%"} mt={"20px"}>
        <Link
          href={`/${locale}/profile?page=settings`}
          style={{
            width: "100%",
          }}
        >
          <Flex
            flexDir={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"100%"}
            px={"20px"}
            bg={
              page === "settings"
                ? "rgba(255, 162, 120, 0.25)"
                : "transparent"
            }
            _hover={{
              bg: "rgba(255, 162, 120, 0.25)",
            }}
            _focus={{
              bg: "rgba(255, 162, 120, 0.25)",
            }}
            boxShadow={"0 0 2px 0 rgba(73, 73, 73, 0.25)"}
            transition={"all 0.2s ease-in-out"}
          >
            <Flex
              flexDir={"row"}
              gap={"20px"}
              alignItems={"center"}
              py={"14px"}
            >
              <Box w={"80px"} h={"80px"} borderRadius={'50px'} overflow={"hidden"} pos={"relative"}>
                <Image
                  src={data.profile_picture === serverProfileImg ? ProfileIcon : data.profile_picture}
                  alt={"profile"}
                  width={80}
                  height={80}
                />
              </Box>
              <Flex flexDir={"column"} gap={"16px"}>
                <Text
                  fontWeight={"700"}
                  fontSize={"16px"}
                  lineHeight={"22px"}
                  color={"rgba(203, 70, 9, 1)"}
                >
                  {data.full_name}
                </Text>
                <Text
                  fontWeight={"400"}
                  fontSize={"16px"}
                  lineHeight={"22px"}
                  color={"#000"}
                >
                 {locale === 'ru' ? 'Личные данные' : 'Personal data'}
                </Text>
              </Flex>
            </Flex>

            <ChevronRightIcon w={"25px"} h={"25px"} />
          </Flex>
        </Link>
      </Flex>

      <Flex w={"100%"} mt={{base:"20px",lg:'0px'}} gap={{base:"10px",lg:'0px'}} flexDir={"column"}>
        {profileDataSkeleton.map(
          (item, id) =>
            id !== 0 && (
              <Link
                href={item.isPage ? `/${locale}/${item.url}` : `/${locale}/profile?page=${item.url}`}
                key={item.id}
                style={{ width: "100%" }}
              >
                <Flex
                  flexDir={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  width={"100%"}
                  px={"16px"}
                  bg={
                    page === item.url
                      ? "rgba(255, 162, 120, 0.25)"
                      : "transparent"
                  }
                  _hover={{
                    bg: "rgba(255, 162, 120, 0.25)",
                  }}
                  _focus={{
                    bg: "rgba(255, 162, 120, 0.25)",
                  }}
                  boxShadow={"0 0 2px 0 rgba(73, 73, 73, 0.25)"}
                  transition={"all 0.2s ease-in-out"}
                >
                  <Flex
                    flexDir={"row"}
                    gap={"10px"}
                    alignItems={"center"}
                    py={"14px"}
                  >
                    <Box w={"18px"} h={"18px"} pos={"relative"}>
                      <Image
                        src={item.icon}
                        alt={item.name}
                        width={18}
                        height={18}
                        style={{
                          width: "18px",
                          height: "18px",
                        }}
                      />
                    </Box>
                    <Text
                      fontWeight={"400"}
                      fontSize={"16px"}
                      lineHeight={"24px"}
                      color={item.id === 6 ? "#000" : "rgba(203, 70, 9, 1)"}
                    >
                      {locale === 'ru' ? item.name_ru : item.name_en}
                    </Text>
                  </Flex>

                  <ChevronRightIcon w={"25px"} h={"25px"} />
                </Flex>
              </Link>
            )
        )}
        <ProfileExitDelete >
          <Flex
            flexDir={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"100%"}
            px={"16px"}
            bg="transparent"
            cursor={"pointer"}
            _hover={{
              bg: "rgba(255, 162, 120, 0.25)",
            }}
            _focus={{
              bg: "rgba(255, 162, 120, 0.25)",
            }}
            boxShadow={"0 0 2px 0 rgba(73, 73, 73, 0.25)"}
            transition={"all 0.2s ease-in-out"}
          >
            <Flex
              flexDir={"row"}
              gap={"10px"}
              alignItems={"center"}
              py={"14px"}
            >
              <Box w={"18px"} h={"18px"} pos={"relative"}>
                <Image
                  src={LogoutIcon}
                  width={18}
                  height={18}
                  alt="logout"
                  style={{
                    width: "18px",
                    height: "18px",
                  }}
                />
              </Box>
              <Text
                fontWeight={"400"}
                fontSize={"16px"}
                lineHeight={"24px"}
                color={"rgba(203, 70, 9, 1)"}
              >
                {locale === "ru" ? "Выйти из профиля" : "Logout"}
              </Text>
            </Flex>

            <ChevronRightIcon w={"25px"} h={"25px"} />
          </Flex>
        </ProfileExitDelete>
        <ProfileExitDelete isDelete={true}>
          <Flex
            flexDir={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"100%"}
            px={"16px"}
            bg="transparent"
            cursor={"pointer"}
            _hover={{
              bg: "rgba(255, 162, 120, 0.25)",
            }}
            _focus={{
              bg: "rgba(255, 162, 120, 0.25)",
            }}
            boxShadow={"0 0 2px 0 rgba(73, 73, 73, 0.25)"}
            transition={"all 0.2s ease-in-out"}
          >
            <Flex
              flexDir={"row"}
              gap={"10px"}
              alignItems={"center"}
              py={"14px"}
            >
              <Box w={"18px"} h={"18px"} pos={"relative"}>
                <Image
                  src={DeleteIcon}
                  alt="delete"
                  width={18}
                  height={18}
                  style={{
                    width: "18px",
                    height: "18px",
                  }}
                />
              </Box>
              <Text
                fontWeight={"400"}
                fontSize={"16px"}
                lineHeight={"24px"}
                color={"rgba(203, 70, 9, 1)"}
              >
                {locale === "ru" ? "Удалить аккаунт" : "Delete account"}
              </Text>
            </Flex>

            <ChevronRightIcon w={"25px"} h={"25px"} />
          </Flex>
        </ProfileExitDelete>
      </Flex>
    </Container>
  );
};

export default ProfileNav;
