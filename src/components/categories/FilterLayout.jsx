"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Filters from "@/components/filters/Filters";
import { Box, Flex } from "@chakra-ui/react";
import Sort from "@/components/sorting/Sort";
import SubCategoriesList from "./SubCategoriesList";

const FilterLayout = ({ data, children }) => {
  const router = useRouter();
  const queryParams = useSearchParams();
  const params = useParams();
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
