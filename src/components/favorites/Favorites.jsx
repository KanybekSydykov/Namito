'use client';
import React, { useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import Product from "@/components/products/product-card/Product";

const Favorites = ({ products,token }) => {
  const [favProds, setFavProds] = useState(products);

  function handleRemoveFavItem(id){
    setFavProds(favProds.filter(item => item.product.id !== id))
  }

  return (
    <Grid
      gridTemplateColumns={{
        base: "repeat(2, minmax(161px,216px))",
        sm: "repeat(3, minmax(171px,240px))",
        md: "repeat(3, minmax(227px,313px))",
        lg: "repeat(4, minmax(227px,1fr))",
        xl: "repeat(5, minmax(227px,1fr))",
      }}
      gap={"16px"}
      mx={"16px"}
    >
      {favProds.map((item, index) => (
        <GridItem key={index}>
          <Product handleRemoveFavItem={handleRemoveFavItem} details={item.product} token={token} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default Favorites;
