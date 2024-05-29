"use client";
import React, { useState } from "react";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  Button,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";

const Sort = ({handleSorting}) => {
  const [value, setValue] = useState(undefined);
  const { locale } = useParams();

  const handleChange = (value) => {
    // setValue(event.target.value);
    setValue(value);
    handleSorting(value);
  };

  // console.log(value);

  return (
    <Menu closeOnSelect={true}>
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
        {value ? value : "Сортировать"}
      </MenuButton>
      <MenuList minWidth="240px" pos={"relative"} zIndex={40}>
        <MenuOptionGroup
          fontFamily={"roboto"}
          fontSize={"16px"}
          fontWeight={"400"}
          lineHeight={"24px"}
          onChange={handleChange}
        >
          <MenuItemOption
            py={"8px"}
            _hover={{ color: "orange" }}
            value={locale === "ru" ? "По популярности" : "By popularity"}
          >
            {locale === "ru" ? " По популярности" : "By popularity"}
          </MenuItemOption>
          <MenuItemOption
            py={"8px"}
            _hover={{ color: "orange" }}
            value={locale === "ru" ? "Скидки" : "Discount"}
          >
            {locale === "ru" ? " Скидки" : "Discount"}
          </MenuItemOption>
          <MenuItemOption
            py={"8px"}
            _hover={{ color: "orange" }}
            value={
              locale === "ru" ? "По возрастанию цены" : "Price from low to high"
            }
          >
            {locale === "ru"
              ? "  По возрастанию цены"
              : "Price from low to high"}
          </MenuItemOption>
          <MenuItemOption
            py={"8px"}
            _hover={{ color: "orange" }}
            value={
              locale === "ru" ? "По убыванию цены" : "Price from high to low"
            }
          >
            {locale === "ru" ? "По убыванию цены" : "Price from high to low"}
          </MenuItemOption>
          <MenuItemOption
            py={"8px"}
            _hover={{ color: "orange" }}
            value={locale === "ru" ? "Новинки" : "New"}
          >
            {locale === "ru" ? "Новинки" : "New"}
          </MenuItemOption>
          <MenuItemOption
            py={"8px"}
            _hover={{ color: "orange" }}
            value={locale === "ru" ? "от А - до Я" : "from A - to Z"}
          >
            {locale === "ru" ? "от А - до Я" : "from A - to Z"}
          </MenuItemOption>
          <MenuItemOption
            py={"8px"}
            _hover={{ color: "orange" }}
            value={locale === "ru" ? "от Я - до А" : "from Z - to A"}
          >
            {locale === "ru" ? "от Я - до А" : "from Z - to A"}
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default Sort;
