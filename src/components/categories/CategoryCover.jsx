"use client";

import React, { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import SubCategoriesList from "@/components/categories/SubCategoriesList";
import Filters from "@/components/filters/Filters";
import Sort from "@/components/sorting/Sort";
import ProdList from "@/components/products/product-list/ProdList";
import BreadCrumbs from "../shared-components/breadcrumb/BreadCrumbs";
import { getData } from "@/lib/apiServices";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const baseURL = "https://namito.tatadev.pro/api/products?";

const queries = ['brand','category','color','size','min_price','max_price','rating','ordering'];

const CategoryCover = ({ data, params, token }) => {
  const router = useRouter();
  const queryParams = useSearchParams();
  // const { filter, setFilters, sorting, setSorting, url } = useConstructUrl();
  const [filterValues, setFilterValues] = useState({});
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState(data.products);
  const [initialProducts, setInitialProducts] = useState(data.products);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
     const url = constructURL(filterValues);
     console.log(url);

    if (url) {
      getFilteredProducts(url);
    }
  }, [filterValues]);

  


  async function getFilteredProducts(url) {
    const res = await getData('',`${baseURL}category_slug=${params.slug}&${url}`);
    if(res.status >= 200 && res.status < 300){
      router.replace(`?${url}`);
      setFilteredProducts(res.data.products);
      setProducts(res.data.products);
    }
  }

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

     return queryString; 
  }

  return (
    <Flex
      maxW={{ base:'100%', lg:"1200px", xl: "1200px", "2xl": "1440px" }}
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

    <Flex
    flexDir={'row'}
    justifyContent={'space-between'}
    width={{base:'100%',lg:'auto'}}
    >
      <Filters
        data={data}
        handleFilters={handleFilters}
        handlePrice={handlePrice}
        handleRating={handleRating}
      />
      <Box display={{ base: "block", lg: "none" }}>

        <Sort handleSorting={handleSorting} />
      </Box>

    </Flex>

      {/* Products */}
      <Box
        position={"relative"}
        width={{ base: "100%", lg: "calc(100% - 330px)" }}
      >
        <ProdList token={token} data={products} locale={params.locale} />
      </Box>
    </Flex>
  );
};

export default CategoryCover;
