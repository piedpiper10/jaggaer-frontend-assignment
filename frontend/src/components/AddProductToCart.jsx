import { useState } from 'react';
import { Box, Stack, IconButton, Typography, Button } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useMutation } from "@apollo/client";
import { GET_CART_COUNT, ADD_TO_CART, GET_CART } from '../graphql/queries';

export default function AddProductToCart({ id }) {
  const [value, setValue] = useState(0);
  const [addToCart, { loading, error }] = useMutation(ADD_TO_CART, { refetchQueries: [{ query: GET_CART_COUNT }, { query: GET_CART }] })

  const handleAdd = () => {
    addToCart({
      variables: {
        productId: id,
        quantity: value,
      },
    });
    setValue(0);
  };
  const MIN_QUANTITY = 0;
  const MAX_QUANTITY = 100;


  const inc = () => {
    setValue((prev) => (prev < MAX_QUANTITY ? prev + 1 : prev))

  };

  const dec = () => {
    setValue((prev) => (prev > MIN_QUANTITY ? prev - 1 : prev));
  };

  return (
    <>
      {error && <Typography color="error">{error.message}</Typography>}
      <Stack direction="row" alignItems="center" spacing={1.25} sx={{ mt: 1.75 }}>
        <Box
          role="group"
          aria-label="Quantity"
          sx={{
            display: 'flex',
            alignItems: 'stretch',
            width: 84,
            height: 40,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            overflow: 'hidden',
            bgcolor: 'background.paper',
          }}
        >
          <Box
            role="status"
            aria-live="polite"
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: 1,
            }}
          >
            <Typography sx={{ fontWeight: 700 }}>{value}</Typography>
          </Box>

          <Stack sx={{ borderLeft: '1px solid', borderColor: 'divider' }}>
            <IconButton
              aria-label="Increase"
              size="small"
              onClick={inc}
              sx={{ borderRadius: 0, width: 32, height: 20 }}
              disabled={value >= MAX_QUANTITY}
            >
              <KeyboardArrowUpIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="Decrease"
              size="small"
              onClick={dec}
              sx={{ borderRadius: 0, width: 32, height: 20 }}
              disabled={value <= MIN_QUANTITY}
            >
              <KeyboardArrowDownIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            size="large"
            startIcon={<ShoppingCartIcon />}
            sx={{ px: 3, py: 1.2, borderRadius: 2, textTransform: 'none' }}
            onClick={handleAdd}
            disabled={loading}
          >
            Add to Cart
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
