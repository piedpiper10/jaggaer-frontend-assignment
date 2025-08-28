import React from "react";
import { Button, Typography } from "@mui/material";
import { useMutation } from "@apollo/client";
import { GET_CART, GET_CART_COUNT, ADD_TO_CART } from "../graphql/queries";


export default function AddToCartButton({ product }) {
  const [addToCart, { loading, error }] = useMutation(ADD_TO_CART, {
    refetchQueries: [{ query: GET_CART }, { query: GET_CART_COUNT }], // refresh cart after adding
  });

  const handleAdd = () => {
    addToCart({
      variables: {
        productId: product.id,
        quantity: 1,
      },
    });
  };

  return (
    <>
      <Button size="small" variant="contained" color="inherit"
        sx={{
          fontSize: "0.75rem",
          padding: "4px 10px",
          fontWeight: "600px",
        }}
        onClick={handleAdd}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add to Cart"}
      </Button>
      {error && <Typography color="error">{error.message}</Typography>}
    </>
  );
}
