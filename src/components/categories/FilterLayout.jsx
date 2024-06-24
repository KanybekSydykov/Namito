"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Filters from "@/components/filters/Filters";
import { Box, Flex } from "@chakra-ui/react";
import Sort from "@/components/sorting/Sort";
import SubCategoriesList from "./SubCategoriesList";

const FilterLayout = ({ data,handleFilters,handlePrice,handleRating,handleSorting,resetFilter }) => {


  if(!data.brands.length && !data.colors.length && !data.sizes.length && !data.ratings.length && !data.min_price && !data.max_price){
    return null;
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
          resetFilter={resetFilter}
        />
        <Box display={{ base: "block", lg: "none" }}>
          <Sort handleSorting={handleSorting} />
        </Box>

      </Flex>

  );
};

export default FilterLayout;
