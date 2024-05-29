import React from "react";
import { Flex, Text, Box, Button } from "@chakra-ui/react";
import Image from "next/image";

const ReviewCard = ({ item, width = "277px", hasDeleteButton = false }) => {
  return (
    <Flex
      flexDir={"column"}
      width={width}
      minW={{base:'277px',lg:'277px'}}
      boxShadow={"0 0 6px 0 rgba(167, 167, 167, 0.25)"}
      fontFamily={"roboto"}
      p={"20px"}
      borderRadius={"10px"}
    >
      {!hasDeleteButton && (
        <Flex flexDir={"row"} gap={"16px"} alignItems={"center"}>
          <Image
            src={item.user.profile_picture}
            alt="user image"
            width={64}
            height={64}
            style={{ width: "60px", height: "60px", borderRadius: "50%" }}
          />
          <Text
            //styleName: 16 bold price;
            fontSize={{ base: "16px", lg: "18px" }}
            fontWeight={{ base: "700", lg: "600" }}
            lineHeight={"22.4px"}
            color={"rgba(54, 54, 54, 1)"}
          >
            {item.user.full_name}
          </Text>
        </Flex>
      )}
            {hasDeleteButton && (
              <Flex
              flexDir={'row'}
              gap={'30px'}
              alignItems={'center'}
              >
                <Box
                w={'80px'}
                h={'90px'}
                overflow={'hidden'}
                borderRadius={'10px'}
                pos={'relative'}
                >
                  <Image src={'/product.png'} fill />
                </Box>
        <Flex
        flexDir={'column'}
        gap={'26px'}
        flexGrow={1}
        >
          <Text
          fontFamily={'roboto'}
          fontWeight={'600'}
          fontSize={'18px'}
          lineHeight={'25px'}
          >
            Item title
          </Text>

        <Flex
          flexDir={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          maxW={'210px'}
        >
          <Flex flexDir={"row"} alignItems={"center"} gap={"2px"}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Box key={star} width={"14px"} h={"14pxs"}>
                <svg
                  width="12"
                  height="13"
                  viewBox="0 0 12 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.46557 1.04722C5.68826 0.610865 6.31174 0.610865 6.53443 1.04722L7.95965 3.83994C8.04683 4.01077 8.21042 4.12963 8.39984 4.15975L11.4963 4.65222C11.9801 4.72916 12.1728 5.32214 11.8266 5.66876L9.61096 7.88722C9.47543 8.02293 9.41294 8.21524 9.44283 8.40469L9.93132 11.5018C10.0076 11.9857 9.50323 12.3522 9.0666 12.13L6.27205 10.7084C6.10111 10.6214 5.89889 10.6214 5.72795 10.7084L2.9334 12.13C2.49677 12.3522 1.99235 11.9857 2.06868 11.5018L2.55717 8.40469C2.58705 8.21524 2.52457 8.02293 2.38904 7.88722L0.173418 5.66876C-0.172763 5.32214 0.0199063 4.72916 0.503714 4.65222L3.60016 4.15975C3.78958 4.12963 3.95317 4.01077 4.04035 3.83994L5.46557 1.04722Z"
                    fill={
                      item.rating >= star
                        ? "#FCB900"
                        : "rgba(205, 205, 205, 1)"
                    }
                  />
                </svg>
              </Box>
            ))}
          </Flex>
          <Text
            fontFamily={"roboto"}
            fontWeight={"300"}
            fontSize={"16px"}
            lineHeight={"24px"}
            color={"rgba(134,134,134,1)"}
            ms={"4px"}
          >
            {item.created_at}
          </Text>
        </Flex>
        </Flex>
        </Flex>
      )}

      <Text
        fontWeight={"300"}
        fontSize={"16px"}
        lineHeight={"24px"}
        noOfLines={5}
        minH={"120px"}
        textOverflow={"ellipsis"}
        mt={"20px"}
      >
       {item.text !== null ? item.text : ""}
      </Text>

      {/* <Text
        fontWeight={"300"}
        fontSize={"16px"}
        lineHeight={"24px"}
        bg={"transparent"}
        color={"rgba(160, 160, 160, 1)"}
        border={"none"}
        outline={"none"}
        textAlign={"end"}
        mt={"26px"}
      >
        Читать дальше
      </Text> */}
      <Flex
        flexDir={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={"20px"}
      >
        <Flex
          flexDir={"row"}
          gap={"8px"}
          flexWrap={"nowrap"}
          overflowX={"auto"}
          minH={"64px"}
          width={`calc(100% - ${hasDeleteButton ? "375px" : "0px"} )`}
        >
          {item.images.length > 0 ? item.images.map((item) => (
            <Image
              key={item.id}
              src={item.image}
              alt="review-star"
              width={49}
              height={64}
              style={{
                width: "53px",
                height: "64px",
                borderRadius: "2px",
              }}
            />
          )) : null }
        </Flex>
        {hasDeleteButton ? (
          <Button
            bg={"transparent"}
            border={"1px solid rgba(203, 70, 9, 1)"}
            color={"rgba(203, 70, 9, 1)"}
            borderRadius={"10px"}
            fontFamily={"roboto"}
            fontWeight={"400"}
            fontSize={"16px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"10px"}
            h={"54px"}
            w={"355px"}
            _hover={{
              bg: "rgba(203, 70, 9, 1)",
              color: "white",
            }}
            _focus={{
              bg: "rgba(203, 70, 9, 1)",
              color: "white",
            }}
            role="group"
          >
            <Box
              w={"14px"}
              h={"18px"}
              filter={"grayscale(0%)"}
              _groupHover={{ filter: "grayscale(100%) invert(0)" }}
            >
              <Image
                src={"/profile-icons/delete-icon.svg"}
                alt={"delete"}
                width={14}
                height={18}
              />
            </Box>
            Удалить отзыв
          </Button>
        ) : null}
      </Flex>

      {!hasDeleteButton && (
        <Flex
          flexDir={"row"}
          mt={"20px"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Flex flexDir={"row"} alignItems={"center"} gap={"2px"}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Box key={star} width={"14px"} h={"14pxs"}>
                <svg
                  width="12"
                  height="13"
                  viewBox="0 0 12 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.46557 1.04722C5.68826 0.610865 6.31174 0.610865 6.53443 1.04722L7.95965 3.83994C8.04683 4.01077 8.21042 4.12963 8.39984 4.15975L11.4963 4.65222C11.9801 4.72916 12.1728 5.32214 11.8266 5.66876L9.61096 7.88722C9.47543 8.02293 9.41294 8.21524 9.44283 8.40469L9.93132 11.5018C10.0076 11.9857 9.50323 12.3522 9.0666 12.13L6.27205 10.7084C6.10111 10.6214 5.89889 10.6214 5.72795 10.7084L2.9334 12.13C2.49677 12.3522 1.99235 11.9857 2.06868 11.5018L2.55717 8.40469C2.58705 8.21524 2.52457 8.02293 2.38904 7.88722L0.173418 5.66876C-0.172763 5.32214 0.0199063 4.72916 0.503714 4.65222L3.60016 4.15975C3.78958 4.12963 3.95317 4.01077 4.04035 3.83994L5.46557 1.04722Z"
                    fill={
                      item.rating >= star
                        ? "#FCB900"
                        : "rgba(205, 205, 205, 1)"
                    }
                  />
                </svg>
              </Box>
            ))}
          </Flex>
          <Text
            fontFamily={"roboto"}
            fontWeight={"300"}
            fontSize={"16px"}
            lineHeight={"24px"}
            color={"rgba(134,134,134,1)"}
            ms={"4px"}
          >
           {item.created_at}
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default ReviewCard;
