"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Filters from "@/components/filters/Filters";
import { Box, Flex } from "@chakra-ui/react";
import Sort from "@/components/sorting/Sort";
import SubCategoriesList from "./SubCategoriesList";

const FilterLayout = ({ data, params, children }) => {
  const router = useRouter();
  const queryParams = useSearchParams();
  // const { filter, setFilters, sorting, setSorting, url } = useConstructUrl();
  const [filterValues, setFilterValues] = useState({});
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState(data.products);
  const [initialProducts, setInitialProducts] = useState(data.products);
  //   const [filteredProducts, setFilteredProducts] = useState(filteredProductsData);

  useEffect(() => {
    const url = constructURL(filterValues);
    console.log(url);

    if (url) {
      console.log(filterValues);
      getFilteredProducts(url);
    } else {
      console.log("should clear queries");
      router.replace(`?`);
    }
  }, [filterValues]);

  async function getFilteredProducts(url) {
    router.push(`/${params.locale}/category/${params.slug}?category_slug=${params.slug}&${url}`);
  }

  function handleFilters(title, value) {
    setFilterValues((prev) => {
      const updatedFilters = { ...prev };

      if (value.length < 1) {
        // Clear the filter value when the value is empty
        if (title === "price") {
          delete updatedFilters.min_price;
          delete updatedFilters.max_price;
        } else if (title === "Бренд") {
          delete updatedFilters.brand;
        } else if (title === "Цвет") {
          delete updatedFilters.color;
        } else if (title === "Размер") {
          delete updatedFilters.size;
        }
      } else {
        // Set the filter values when they are not empty
        if (title === "price") {
          updatedFilters.min_price = value[0];
          updatedFilters.max_price = value[1];
        } else if (title === "Бренд") {
          updatedFilters.brand = value;
        } else if (title === "Цвет") {
          updatedFilters.color = value;
        } else if (title === "Размер") {
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
        flexDir={"row"}
        justifyContent={"space-between"}
        width={{ base: "100%", lg: "auto" }}
        gap={"30px"}
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

  );
};

export default FilterLayout;
