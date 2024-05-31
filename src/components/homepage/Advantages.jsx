import React from "react";
import { Flex, Text } from "@chakra-ui/react";

const Advantages = ({ data }) => {
  return (
    <Flex
      fontFamily={"roboto"}
      color={"#363636"}
      fontWeight={"400"}
      mt={{base:"50px",lg:'20px',xl:'20px'}}
      textAlign={{ base: "start", xl: "center" }}
      gap={{base:'15px',xl:'30px'}}
    >
      {data.map(({ title, value }, index, array) => (
        <Flex
          key={title}
          flexDir={"column"}
          gap={"16px"}
          width={{ base: "140px", xl: "170px" }}
          pe={ index === array.length - 1 ? "unset" : { base: "15px",xl: "30px" }}
          whiteSpace={"pre-wrap"}
          textAlign={"start"}
          fontWeight={"400"}
          borderRight={
            index === array.length - 1
              ? "unset"
              : "1px solid rgba(203, 70, 9, 0.6)"
          }
        >
          <Text fontSize={{ base: "20px", lg: "32px" }} lineHeight={"23.44px"}>
            {value}
          </Text>
          <Text fontSize={"16px"} lineHeight={"24px"}>
            {title}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default Advantages;
