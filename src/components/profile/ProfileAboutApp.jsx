import {
  Box,
  Flex,
  Highlight,
  Text,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

const ProfileAboutApp = () => {
  return (
    <Flex fontFamily={"roboto"} flexDir={"column"} gap={"50px"} py={{lg:'30px'}} >
      <Flex flexDir={{ base: "column", lg: "row" }} px={'16px'} gap={"40px"}>
        <Flex flexDir={"column"} gap={"26px"} >
          <Text
          fontWeight={'700'}
          fontSize={{base:'20px',lg:'36px'}}
          lineHeight={{base:'23px',lg:'50px'}}
          textTransform={'uppercase'}
          >О нас</Text>
          <Text
            fontWeight={"400"}
            fontSize={"16px"}
            lineHeight={"24px"}
            color={"rgba(118, 118, 118, 1)"}
          >
            <Highlight
              query={"Namito"}
              styles={{
                color: "rgba(203, 70, 9, 1)",
                fontWeight: "600",
                fontSize: "18px",
                lineHeight: "25.2px",
              }}
            >
              Добро пожаловать в Namito – ваш источник стиля и качества в мире
              моды и аксессуаров! Мы стремимся сделать шопинг простым,
              увлекательным и приятным для каждого клиента, предлагая только
              лучшие товары и высокий уровень обслуживания. В Namito мы верим,
              что каждый человек заслуживает находиться в центре внимания своего
              стиля, и мы гордимся тем, что можем помочь в этом. Namito – это
              команда энтузиастов, ценящих индивидуальность и творчество. Наша
              команда состоит из экспертов в области моды, дизайна и клиентского
              обслуживания, которые постоянно стремятся улучшать ваше
              онлайн-покупательский опыт. Мы ценим каждого нашего клиента и
              всегда готовы ответить на ваши вопросы или принять ваши отзывы. Не
              стесняйтесь связаться с нами по любым вопросам или предложениям, и
              мы с радостью поможем вам. Благодарим вас за выбор Namito – вашего
              надежного партнера в мире моды и стиля!
            </Highlight>
          </Text>
        </Flex>

        <Box
          w={{ base: "100%", lg: "420px" }}
          height={{ base: "100%", lg: "450px" }}
          aspectRatio={390 / 418}
          position={"relative"}
        >
          <Image
            src={"/about-img.jpeg"}
            width={300}
            height={600}
            alt={"about"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </Box>
      </Flex>

      <Flex flexDir={"column"} gap={"26px"} px={'16px'} maxW={'893px'}>
        <Text
          fontWeight={"700"}
          fontSize={{base:"20px",lg:'36px'}}
          lineHeight={{base:"24px",lg:'50px'}}
          color={"#000"}
          textTransform={"uppercase"}
        >
          часто задаваемые вопросы *
        </Text>

        <Accordion allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton  px={'5px'} py={'26px'}>
                <Box as="span" flex="1" textAlign="left">
                  Section 1 title
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton  px={'5px'} py={'26px'}>
                <Box as="span" flex="1" textAlign="left">
                  Section 2 title
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>
    </Flex>
  );
};

export default ProfileAboutApp;
