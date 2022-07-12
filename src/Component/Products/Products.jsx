import React from "react";
import Product from "./Product/Product";
import Grid from "@mui/material/Grid";
import './products.module.scss'
function Products({productList}) {
  
  return (
    <div className="" style={{marginTop:15, padding:30}}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        {productList.map((item) => {
          return (
            <Grid
              justifyContent="center"
              key={item.id}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <Product item={item} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default Products;
