import React from "react";
import { Flex, Box, List, ListItem, Text, Container } from "@chakra-ui/react";
import Logo from "@/components/header/logo/Logo";
import Link from "next/link";
import Image from "next/image";

const Footer = ({ data }) => {
  return (
    <>
      <Container
        maxW={"unset"}
        bg={"rgba(33, 37, 40, 1)"}
        borderRadius={"10px 10px 0 0"}
        pt={"40px"}
        pb={"50px"}
      >
        <Flex
          flexDir={{ base: "column", md: "row" }}
          gap={{ base: "70px", lg: "20px", xl: "50px" }}
          maxW={{ base: "1200px", xl: "1472px" }}
          mx={"auto"}
          flexWrap={{ base: "wrap", lg: "nowrap" }}
        >
          <Box minW={"92px"}>
            <Logo color={"#fff"} />
          </Box>

          <List
            display={"flex"}
            fontFamily={"roboto"}
            fontWeight={"300"}
            fontSize={"18px"}
            lineHeight={"27px"}
            gap={"20px"}
            color={"rgba(249, 249, 249, 1)"}
            flexDir={"column"}
          >
            <ListItem>О нас</ListItem>
            <ListItem>Доставка</ListItem>
            <ListItem>Политика конфиденциальности</ListItem>
            <ListItem>Возврат средств</ListItem>
            <ListItem>Процесс оплаты</ListItem>
          </List>

          <List
            fontFamily={"roboto"}
            fontWeight={"300"}
            fontSize={"18px"}
            lineHeight={"27px"}
            gap={"20px"}
            color={"rgba(249, 249, 249, 1)"}
          >
            <Text
              fontFamily={"roboto"}
              fontWeight={"700"}
              fontSize={"20px"}
              lineHeight={"23.44px"}
              color={"#fff"}
            >
              Тех.поддержка
            </Text>
            {data.phones.map((item, index) => (
              <ListItem
                as={Link}
                href={`tel:${item.phone}`}
                display={"block"}
                target="_blank"
                key={item.phone}
                mt={"26px"}
              >
                {item.phone}
              </ListItem>
            ))}
            {data.emails.map((item, index) => (
              <ListItem
                key={item.email}
                as={Link}
                display={"block"}
                href={`mailto:${item.email}`}
                target="_blank"
                mt={"20px"}
              >
                {item.email}
              </ListItem>
            ))}
          </List>

          <Flex flexDir={"column"} gap={"20px"}>
            <Text
              fontFamily={"roboto"}
              fontWeight={"700"}
              fontSize={"20px"}
              lineHeight={"23.44px"}
              color={"#fff"}
            >
              Наши соцсети
            </Text>
            <Flex flexDir={"row"} flexWrap={"wrap"} gap={"12px"}>
              {data.socials.map((item) => (
                <Link
                  key={item.link}
                  href={item.link}
                  target={"_blank"}
                  rel="noreferrer"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#fff",
                  }}
                >
                  <Image
                    src={item.icon}
                    alt={`icon for ${item.link}`}
                    width={20}
                    height={20}
                    style={{
                      width: "20px",
                      height: "auto",
                      maxHeight: "20px",
                      borderRadius: "2px",
                    }}
                  />
                </Link>
              ))}
            </Flex>
          </Flex>
          <Flex flexDir={"column"} gap={"20px"}>
            <Text
              fontFamily={"roboto"}
              fontWeight={"700"}
              fontSize={"20px"}
              lineHeight={"23.44px"}
              color={"#fff"}
            >
              СПОСОБЫ ОПЛАТЫ
            </Text>
            <Flex flexDir={"row"} flexWrap={"wrap"} gap={"12px"}>
              {data.payment.map((item) => (
                <Link
                  key={item.link}
                  href={item.link}
                  target={"_blank"}
                  rel="noreferrer"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#fff",
                    padding: "0 2px",
                  }}
                >
                  <Image
                    src={item.icon}
                    alt="vk icon"
                    width={36}
                    height={12}
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "40px",
                      objectFit: "contain",
                    }}
                  />
                </Link>
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </>
  );
};

export default Footer;
