"use client";
import React, { useState } from "react";
import { Flex, Box, Text, Container, useMediaQuery } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import HomeIcon from "@/../public/home-icon.svg";
import { useParams, usePathname } from "next/navigation";
import CartDrawer from "../header/drawer/CartDrawer";

const Footer = ({ token }) => {
  const path = usePathname();
  const params = useParams();
  const [isMobile] = useMediaQuery("(max-width: 768px)");


  function handleActiveRoute(activeRoute, nested = false) {
    if (nested && path.includes(`${activeRoute}`)) {
      return true;
    }
    if (path === `/${params.locale}${activeRoute ? activeRoute : ""}`) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <>
      {isMobile && (
        <Container
          position={"fixed"}
          className="fixed-footer"
          bottom={"0"}
          zIndex={100}
          left={"0"}
          w={"100%"}
          h={"80px"}
          py={"10px"}
          bg={"rgba(255,255,255,0.95)"}
          maxW={"unset"}
        >
          <Flex flexDir={"row"} justifyContent={"space-between"} w={"100%"}>
            <Flex
              position={"relative"}
              w={"80px"}
              h={"60px"}
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"5px"}
              textDecoration={"none"}
              borderRadius={"20px"}
              bg={
                handleActiveRoute() ? "rgba(203, 70, 9, 0.07)" : "transparent"
              }
            >
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 9.53468V19.1649C20 19.6069 19.8244 20.0308 19.5118 20.3434C19.1993 20.6559 18.7753 20.8315 18.3333 20.8315H14.1666C13.7246 20.8315 13.3007 20.6559 12.9881 20.3434C12.6756 20.0308 12.5 19.6069 12.5 19.1649V14.9982C12.5 14.7772 12.4122 14.5652 12.2559 14.409C12.0996 14.2527 11.8877 14.1649 11.6667 14.1649H8.33332C8.11231 14.1649 7.90035 14.2527 7.74407 14.409C7.58779 14.5652 7.49999 14.7772 7.49999 14.9982V19.1649C7.49999 19.6069 7.3244 20.0308 7.01184 20.3434C6.69928 20.6559 6.27535 20.8315 5.83333 20.8315H1.66666C1.22464 20.8315 0.800715 20.6559 0.488155 20.3434C0.175594 20.0308 1.92581e-08 19.6069 1.92581e-08 19.1649V9.53468C-3.50446e-05 9.30401 0.0478116 9.07584 0.140512 8.86462C0.233212 8.6534 0.368747 8.46373 0.538541 8.30759L8.87186 0.445103L8.88332 0.433645C9.19014 0.154617 9.58996 0 10.0047 0C10.4194 0 10.8192 0.154617 11.126 0.433645C11.1296 0.43772 11.1334 0.441549 11.1375 0.445103L19.4708 8.30759C19.6389 8.46455 19.7727 8.6546 19.8638 8.86578C19.9548 9.07696 20.0012 9.3047 20 9.53468Z"
                  fill={handleActiveRoute() ? "#CB4609" : "#363636"}
                />
              </svg>

              <Text
                fontFamily={"roboto"}
                lineHeight={"16px"}
                fontSize={"12px"}
                fontWeight={300}
                color={handleActiveRoute("") ? "#CB4609" : "#363636"}
                transition={"all 0.3s ease"}
              >
                {params.locale === 'ru' ? "Главная" : "Home"}
              </Text>
              <Link
                href={`${params.locale ? `/${params.locale}/` : "/"}`}
                style={{
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  width: "100%",
                  height: "100%",
                }}
              />
            </Flex>
            <CartDrawer isAuth={token ? true : false} token={token}>
              <Flex
                w={"80px"}
                h={"60px"}
                flexDir={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"5px"}
                textDecoration={"none"}
                bg={
                  handleActiveRoute("/cart")
                    ? "rgba(203, 70, 9, 0.07)"
                    : "transparent"
                }
              >
                <svg
                  width="20"
                  height="17"
                  viewBox="0 0 20 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.6842 0.255087L10.7682 0.340087L15.4683 5.66673H19.0004C19.1427 5.66678 19.2834 5.69553 19.4131 5.75107C19.5427 5.8066 19.6583 5.88764 19.7521 5.98876C19.8459 6.08988 19.9158 6.20875 19.9571 6.33742C19.9983 6.46609 20.01 6.6016 19.9914 6.73489L19.9714 6.84066L17.9874 14.3187C17.7293 15.8091 16.5773 16.9452 15.1703 16.9991L15.0003 17L4.85215 16.9981C3.48213 16.9481 2.36811 15.9054 2.06511 14.5709L2.0301 14.3962L0.0300736 6.84066C-0.00461012 6.71013 -0.00935465 6.57411 0.0161579 6.4417C0.0416704 6.3093 0.0968508 6.18357 0.178002 6.07295C0.259153 5.96232 0.364401 5.86935 0.486694 5.80027C0.608986 5.73119 0.7455 5.68759 0.887087 5.67239L1.00009 5.66673H4.53014L9.23222 0.340087C9.31939 0.241221 9.42703 0.160219 9.54854 0.102049C9.67004 0.0438794 9.80285 0.0097683 9.93882 0.00180909C10.0748 -0.00615012 10.211 0.0122104 10.3392 0.0557639C10.4674 0.0993174 10.5848 0.167145 10.6842 0.255087ZM10.0002 8.50004C9.26509 8.49993 8.5555 8.75474 8.00615 9.21611C7.45681 9.67747 7.10595 10.3133 7.02018 11.0028L7.00518 11.1671L7.00018 11.3334L7.00518 11.4996C7.03955 12.0519 7.24441 12.5827 7.59446 13.0263C7.94452 13.47 8.42446 13.8071 8.97505 13.9962C9.52564 14.1852 10.1228 14.2179 10.6928 14.0901C11.2628 13.9623 11.7808 13.6798 12.1827 13.2772C12.5846 12.8747 12.853 12.3698 12.9546 11.8249C13.0563 11.28 12.9867 10.7189 12.7546 10.2109C12.5226 9.70289 12.138 9.27016 11.6486 8.96613C11.1591 8.6621 10.5861 8.50007 10.0002 8.50004ZM10.0002 2.41974L7.13518 5.66673H12.8653L10.0002 2.41974Z"
                    fill={handleActiveRoute("/cart") ? "#CB4609" : "#363636"}
                  />
                </svg>

                <Text
                  fontFamily={"roboto"}
                  lineHeight={"16px"}
                  fontSize={"12px"}
                  fontWeight={300}
                  transition={"all 0.3s ease"}
                  color={handleActiveRoute("/cart") ? "#CB4609" : "#363636"}
                >
                  {params.locale === 'ru' ? "Корзина" : "Cart"}
                  
                </Text>
              </Flex>
            </CartDrawer>
            <Flex
              position={"relative"}
              w={"80px"}
              h={"60px"}
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"5px"}
              textDecoration={"none"}
              borderRadius={"20px"}
              bg={
                handleActiveRoute("/catalog", true)
                  ? "rgba(203, 70, 9, 0.07)"
                  : "transparent"
              }
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.25 7.5C18.3211 7.5 20 5.82107 20 3.75C20 1.67893 18.3211 0 16.25 0C14.1789 0 12.5 1.67893 12.5 3.75C12.5 5.82107 14.1789 7.5 16.25 7.5Z"
                  fill={
                    handleActiveRoute("/catalog", true) ? "#CB4609" : "#363636"
                  }
                />
                <path
                  d="M3.75 20C5.82107 20 7.5 18.3211 7.5 16.25C7.5 14.1789 5.82107 12.5 3.75 12.5C1.67893 12.5 0 14.1789 0 16.25C0 18.3211 1.67893 20 3.75 20Z"
                  fill={
                    handleActiveRoute("/catalog", true) ? "#CB4609" : "#363636"
                  }
                />
                <path
                  d="M12.5 12.5H20V18.75C20 19.0815 19.8683 19.3995 19.6339 19.6339C19.3995 19.8683 19.0815 20 18.75 20H13.75C13.4185 20 13.1005 19.8683 12.8661 19.6339C12.6317 19.3995 12.5 19.0815 12.5 18.75V12.5ZM0 0H7.5V6.25C7.5 6.58152 7.3683 6.89946 7.13388 7.13388C6.89946 7.3683 6.58152 7.5 6.25 7.5H1.25C0.918479 7.5 0.600537 7.3683 0.366117 7.13388C0.131696 6.89946 0 6.58152 0 6.25V0Z"
                  fill={
                    handleActiveRoute("/catalog", true) ? "#CB4609" : "#363636"
                  }
                />
              </svg>

              <Text
                fontFamily={"roboto"}
                lineHeight={"16px"}
                fontSize={"12px"}
                fontWeight={300}
                color={handleActiveRoute("/catalog") ? "#CB4609" : "#363636"}
              >
                  {params.locale === 'ru' ? "Каталог" : "Catalog"}
                
              </Text>
              <Link
                prefetch={true}
                href={`${params.locale ? `/${params.locale}/` : "/"}catalog`}
                style={{
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  width: "100%",
                  height: "100%",
                }}
              />
            </Flex>
            <Flex
              w={"80px"}
              h={"60px"}
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"5px"}
              textDecoration={"none"}
              borderRadius={"20px"}
              position={"relative"}
              bg={
                handleActiveRoute("/login")
                  ? "rgba(203, 70, 9, 0.07)"
                  : "transparent"
              }
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.6905 16.3784C18.717 15.1444 19.431 13.6814 19.772 12.1133C20.113 10.5452 20.071 8.91814 19.6495 7.3697C19.2281 5.82126 18.4396 4.39702 17.3507 3.21747C16.2619 2.03791 14.9047 1.13774 13.394 0.593109C11.8834 0.0484744 10.2637 -0.124604 8.67188 0.0885164C7.08011 0.301637 5.56313 0.894685 4.24926 1.81749C2.93539 2.7403 1.86329 3.96572 1.12365 5.39009C0.384015 6.81446 -0.00140285 8.39587 3.83677e-06 10.0005C0.000543632 12.3333 0.823267 14.5913 2.32381 16.3784L2.30951 16.3906C2.35955 16.4506 2.41673 16.502 2.4682 16.5613C2.53253 16.6348 2.60186 16.7041 2.66834 16.7755C2.86848 16.9927 3.07434 17.2012 3.29021 17.3969C3.35597 17.4569 3.42388 17.5126 3.49035 17.5697C3.71909 17.7669 3.95426 17.954 4.198 18.1283C4.22945 18.1497 4.25805 18.1775 4.2895 18.1997V18.1911C5.96362 19.3682 7.96076 20 10.0079 20C12.055 20 14.0521 19.3682 15.7262 18.1911V18.1997C15.7577 18.1775 15.7856 18.1497 15.8177 18.1283C16.0608 17.9533 16.2966 17.7669 16.5254 17.5697C16.5919 17.5126 16.6598 17.4562 16.7255 17.3969C16.9414 17.2005 17.1473 16.9927 17.3474 16.7755C17.4139 16.7041 17.4825 16.6348 17.5475 16.5613C17.5983 16.502 17.6562 16.4506 17.7062 16.3899L17.6905 16.3784ZM10.0072 4.28687C10.6433 4.28687 11.2652 4.47536 11.7942 4.82852C12.3232 5.18167 12.7354 5.68362 12.9789 6.27089C13.2223 6.85816 13.286 7.50438 13.1619 8.12782C13.0378 8.75127 12.7315 9.32394 12.2816 9.77342C11.8318 10.2229 11.2586 10.529 10.6347 10.653C10.0107 10.777 9.36397 10.7134 8.77622 10.4701C8.18847 10.2269 7.6861 9.81492 7.33266 9.28639C6.97922 8.75786 6.79057 8.13647 6.79057 7.50081C6.79057 6.64842 7.12946 5.83094 7.73268 5.22821C8.33591 4.62548 9.15406 4.28687 10.0072 4.28687ZM4.29378 16.3784C4.30618 15.4407 4.6876 14.5455 5.35551 13.8865C6.02343 13.2276 6.92413 12.8579 7.86276 12.8574H12.1515C13.0902 12.8579 13.9909 13.2276 14.6588 13.8865C15.3267 14.5455 15.7081 15.4407 15.7205 16.3784C14.1529 17.79 12.1174 18.5711 10.0072 18.5711C7.89689 18.5711 5.86145 17.79 4.29378 16.3784Z"
                  fill={handleActiveRoute("/login") ? "#CB4609" : "#363636"}
                />
              </svg>

              <Text
                fontFamily={"roboto"}
                lineHeight={"16px"}
                fontSize={"12px"}
                fontWeight={300}
                color={handleActiveRoute("/login") ? "#CB4609" : "#363636"}
              >
                {token
                  ? params.locale === "ru"
                    ? "Профиль"
                    : "Profile"
                  : params.locale === "ru"
                  ? "Войти"
                  : "Login"}
              </Text>
              <Link
                href={`${params.locale ? `/${params.locale}/` : "/"}${token ? "profile" : "login"}`}
                style={{
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  width: "100%",
                  height: "100%",
                }}
              />
            </Flex>
          </Flex>
        </Container>
      )}
    </>
  );
};

export default Footer;
