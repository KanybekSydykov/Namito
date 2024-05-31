"use client";
import React, { useState } from "react";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  Button,
  Box,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";

const Sort = ({ handleSorting }) => {
  const [uiValue, setUIValue] = useState(undefined);
  const { locale } = useParams();

  const options = [
    {
      name: locale === "ru" ? "По популярности" : "By popularity",
      value: '-popularity',
    },
    {
      name: locale === "ru" ? "Скидки" : "Discount",
      value: 'max-discount',
    },
    {
      name: locale === "ru" ? "По возрастанию цены" : "Price from low to high",
      value: 'min_variant_price',
    },
    {
      name: locale === "ru" ? "По убыванию цены" : "Price from high to low",
      value: '-min_variant_price',
    },
    {
      name: locale === "ru" ? "Новинки" : "New",
      value: '-created_at',
    },
    {
      name: locale === "ru" ? "от А - до Я" : "from A - to Z",
      value: 'name',
    },
    {
      name: locale === "ru" ? "от Я - до А" : "from Z - to A",
      value: '-name',
    },
  ];

  const handleChange = (value) => {
    const selectedOption = options.find(option => option.value === value);
    setUIValue(selectedOption.name);
    handleSorting(selectedOption.value);
  };

  return (
    <Box>
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
        >
          {uiValue ? uiValue : "Сортировать"}
        </MenuButton>
        <MenuList minWidth="240px" pos={"relative"} zIndex={40}>
          <MenuOptionGroup
            fontFamily={"roboto"}
            fontSize={"16px"}
            fontWeight={"400"}
            lineHeight={"24px"}
            onChange={handleChange}
          >
            {options.map(option => (
              <MenuItemOption
                key={option.value}
                py={"8px"}
                _hover={{ color: "orange" }}
                value={option.value}
              >
                {option.name}
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default Sort;
