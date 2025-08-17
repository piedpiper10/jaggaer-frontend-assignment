import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { CircularProgress, Box, Typography, Container, Divider } from '@mui/material';
import ProductHero from "./ProductHero";
import { usePageTitle } from "../context/PageTitleContex";

import { GET_PRODUCT_DETAILS } from "../graphql/queries";

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

  if (loading) return <CircularProgress />;
  if (error) return <p>Error loading product.</p>;

  const product = data.product;
  return (
    <div>
      <ProductHero {...product} />
      <Box
        component="section"
        sx={{
          bgcolor: 'grey.100',
          borderTop: 1,
          borderColor: 'divider',
          py: { xs: 6, sm: 8 },
        }}
      >
        <Box
          sx={{
            maxWidth: 1280,
            ml: 10,
            mb: 20,
            px: { xs: 3, sm: 3, },
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 700,
              letterSpacing: 0.2,
              color: 'black',
              mb: 2.5,
            }}
          >
            Description
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'text.primary',
              lineHeight: 1.8,
              maxWidth: 1400,
            }}
          >
            {product.longDescription}
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

