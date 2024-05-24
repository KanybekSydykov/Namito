import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  Button,
} from "@chakra-ui/react";

const Sort = () => {
  return (
    <Menu closeOnSelect={true} >
      <MenuButton
        as={Button}
        bg={"transparent"}
        borderRadius={"10px"}
        boxShadow={"0 0 4px 0 rgba(151, 151, 151, 0.25)"}
        _active={{
          bg: "orange",
          color: "#fff",
        }}
        _hover={{
          color: "#fff",
          bg: "orange",
        }}
        transition={"all 0.3s ease"}
        position={"absolute"}
        right={"16px"}
        top={{ base: "0px", lg: "4px" }}
      >
        Сортировать
      </MenuButton>
      <MenuList minWidth="240px" pos={'relative'} zIndex={2}>
        <MenuOptionGroup
          fontFamily={"roboto"}
          fontSize={"16px"}
          fontWeight={"400"}
          lineHeight={"24px"}
        >
          <MenuItemOption py={"8px"} _hover={{ color: "orange" }} value="asc">
            По популярности
          </MenuItemOption>
          <MenuItemOption py={"8px"} _hover={{ color: "orange" }} value="desc">
            Скидки
          </MenuItemOption>
          <MenuItemOption py={"8px"} _hover={{ color: "orange" }} value="asc">
            По возрастанию цены
          </MenuItemOption>
          <MenuItemOption py={"8px"} _hover={{ color: "orange" }} value="desc">
            По убыванию цены
          </MenuItemOption>
          <MenuItemOption py={"8px"} _hover={{ color: "orange" }} value="desc">
            Новинки
          </MenuItemOption>
          <MenuItemOption py={"8px"} _hover={{ color: "orange" }} value="desc">
            от А - до Я
          </MenuItemOption>
          <MenuItemOption py={"8px"} _hover={{ color: "orange" }} value="desc">
            от Я - до А
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default Sort;
