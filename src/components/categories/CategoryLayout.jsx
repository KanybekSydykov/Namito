'use client';

import React, { useEffect, useState } from "react";
import BreadCrumbs from "@/components/shared-components/breadcrumb/BreadCrumbs";
import FilterLayout from "@/components/categories/FilterLayout";
import SubCategoriesList from "@/components/categories/SubCategoriesList";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const CategoryLayout = ({ data, children, params }) => {
    const router = useRouter();
  const [filterValues, setFilterValues] = useState({});


  useEffect(() => {
    const url = constructURL(filterValues);
    console.log(url);

    if (url) {
      getFilteredProducts(url);
    } else {
      router.replace(`?`);
    }
  }, [filterValues]);


  async function getFilteredProducts(url) {
    router.push(`/${params.locale}/category/${params.slug}?category_slug=${params.slug}&${url}`);
  }

  function handleFilters(title, value) {

    console.log(title, value);

    setFilterValues((prev) => {
      const updatedFilters = { ...prev };

      if (value.length < 1) {
        // Clear the filter value when the value is empty
        if (title === "price") {
          delete updatedFilters.min_price;
          delete updatedFilters.max_price;
        } else if (title === "Бренд" || title === "Brand") {
          delete updatedFilters.brand;
        } else if (title === "Цвет" || title === "Colors") {
          delete updatedFilters.color;
        } else if (title === "Размер" || title === "Size") {
          delete updatedFilters.size;
        }
      } else {
        // Set the filter values when they are not empty
        if (title === "price") {
          updatedFilters.min_price = value[0];
          updatedFilters.max_price = value[1];
        } else if (title === "Бренд" || title === "Brand") {
          updatedFilters.brand = value;
        } else if (title === "Цвет" || title === "Colors") {
          updatedFilters.color = value;
        } else if (title === "Размер" || title === "Size") {
          updatedFilters.size = value;
        }
      }

      return updatedFilters;
    });
  }

  function handlePrice(value) {
    handleFilters("price", value);
  }

  function handleSorting(value) {
    if (value) {
      setFilterValues((prev) => ({ ...prev, ordering: value }));
    }
  }

  function handleRating(value) {
    setFilterValues((prev) => ({ ...prev, min_rating: value }));
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
      maxW={{ base: "100%", lg: "1200px", xl: "1200px", "2xl": "1440px" }}
      mx={"auto"}
      flexDir={"row"}
      flexWrap={"wrap"}
      justifyContent={"space-between"}
      gap={"30px"}
      px={"16px"}
      pb={"100px"}
      position={"relative"}
      pt={{ base: "50px" }}
    >
      <BreadCrumbs
        locale={params.locale}
        data={{ parent: data.parent, current: data.name }}
      />

      {/* Filters */}
      <SubCategoriesList data={data.children} locale={params.locale} handleSorting={handleSorting} />

      <Flex gap={"30px"} flexDir={{ base: "column", lg: "row" }} w={"100%"}>
        <FilterLayout data={data} params={params} children={children} handleFilters={handleFilters} handlePrice={handlePrice} handleSorting={handleSorting} handleRating={handleRating} />

        {children}
      </Flex>
    </Flex>
  );
};

export default CategoryLayout;
