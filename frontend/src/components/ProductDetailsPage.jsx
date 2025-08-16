import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Stack,
  IconButton,
  Divider,
  Chip,
} from '@mui/material';
import ProductHero from "./ProductHero";
import { useOutletContext } from "react-router-dom";
import { usePageTitle } from "./PageTitleContex";


const GET_PRODUCT_DETAILS = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
    id
    name
    shortDescription
    longDescription
    price
    imageUrl
    rating
  }
  }
`;

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { setTitle } = usePageTitle();

  const { loading, error, data } = useQuery(GET_PRODUCT_DETAILS, {
    variables: { id },
  });

  useEffect(() => {
    if (data?.product?.name) {
      setTitle(data.product.name);
    }
  }, [data, setTitle]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading product.</p>;

  console.log("check for the product", data);
  const product = data.product;


  return (
    <div>
      <ProductHero {...product} />
    </div>
  );
}

