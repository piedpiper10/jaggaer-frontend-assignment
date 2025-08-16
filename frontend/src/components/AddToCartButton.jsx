import React from "react";
import { Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";

export const ADD_TO_CART = gql`
  mutation AddToCart($productId: ID!, $quantity: Int!) {
    addToCart(productId: $productId, quantity: $quantity) {
      id
      productId
      quantity
      product {
        id
        name
        price
      }
    }
  }
`;

export const GET_CART = gql`
  query GetCart {
    cart {
      items {
        id
        productId
        product {
          id
          name
          price
        }
        quantity
      }
      count
      total
    }
  }
`;

export const GET_CART_COUNT = gql`
  query GetCartCount {
    cartCount
  }
`;

export default function AddToCartButton({ product }) {
  const [addToCart, { loading, error }] = useMutation(ADD_TO_CART, {
    refetchQueries: [{ query: GET_CART }, { query: GET_CART_COUNT }], // refresh cart after adding
  });

  const handleAdd = () => {
    addToCart({
      variables: {
        productId: product.id, // send product id
        quantity: 1,           // send quantity, can be dynamic
      },
    });
  };

  return (
    <>
      <Button size="small" variant="contained" color="inherit"
        sx={{
          fontSize: "0.75rem", // smaller text
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
