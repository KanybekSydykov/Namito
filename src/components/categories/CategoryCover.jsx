"use client";

import React, { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import SubCategoriesList from "@/components/categories/SubCategoriesList";
import Filters from "@/components/filters/Filters";
import Sort from "@/components/sorting/Sort";
import ProdList from "@/components/products/product-list/ProdList";
import BreadCrumbs from "../shared-components/breadcrumb/BreadCrumbs";
import { getData } from "@/lib/apiServices";

const baseURL = "https://namito.tatadev.pro/api/products?";

const CategoryCover = ({ data, params, token }) => {
  // const { filter, setFilters, sorting, setSorting, url } = useConstructUrl();
  const [filterValues, setFilterValues] = useState({category:params.slug});
  const [query, setQuery] = useState("");

  useEffect(() => {

    constructURL(filterValues);
    async function getFilteredProducts() {
      const res = await getData('',query);
      console.log(res);
    }

    if (query) {
      console.log(query);
      getFilteredProducts();
    }
  }, [filterValues]);

  function handleFilters(title, value) {
    if (filterValues.length > 1) {
      setFilterValues((prev) => prev + `$`);
    }

    if (value.length < 1) return;

    if (title === "price") {
      setFilterValues((prev) => ({
        ...prev,
        min_price: value[0],
        max_price: value[1],
      }));
    } else if (title === "Бренд") {
      setFilterValues((prev) => ({ ...prev, brand: `${[...value]}` }));
    } else if (title === "Цвет") {
      setFilterValues((prev) => ({ ...prev, color: `${[...value]}` }));
    } else if (title === "Размер") {
      setFilterValues((prev) => ({ ...prev, size: `${[...value]}` }));
    }
  }

  function handlePrice(value) {
    handleFilters("price", value);
  }

  function handleSorting(value) {
    console.log(value);
    if (value) {
      setFilterValues((prev) => ({ ...prev, ordering: value }));
    }
  }

  function handleRating(value) {
    setFilterValues((prev) => ({ ...prev, rating: value }));
  }

  function constructURL(params) {

    const queryString = Object.keys(params)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      )
      .join("&");

    setQuery(`${baseURL}${queryString}`);
  }

  console.log(query);

  return (
    <Flex
      maxW={{ base: "1200px", xl: "1472px", "2xl": "1600px" }}
      mx={"auto"}
      flexDir={"row"}
      flexWrap={"wrap"}
      justifyContent={"space-between"}
      gap={"30px"}
      px={{ base: "16px", xl: "0" }}
      pb={"100px"}
      position={"relative"}
      pt={{ base: "0px" }}
    >
      <BreadCrumbs
        locale={params.locale}
        data={{ parent: data.parent, current: data.name }}
      />

      {/* Filters */}
      <Flex display={{ base: "none", lg: "flex" }}>
        <SubCategoriesList data={data.children} locale={params.locale} />
      </Flex>

      <Filters
        data={data}
        handleFilters={handleFilters}
        handlePrice={handlePrice}
        handleRating={handleRating}
      />

      {/* Products */}
      <Box
        position={"relative"}
        width={{ base: "100%", lg: "calc(100% - 330px)" }}
      >
        <Sort handleSorting={handleSorting} />
        <ProdList token={token} data={data.products} locale={params.locale} />
      </Box>
    </Flex>
  );
};

export default CategoryCover;
