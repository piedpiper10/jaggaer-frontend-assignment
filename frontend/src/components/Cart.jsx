// Cart.jsx
import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import {
  CircularProgress,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// GraphQL Query
const GET_CART = gql`
  query GetCart {
    cart {
      items {
        id
        productId
        product {
          id
          name
          price
          shortDescription
        }
        quantity
      }
      count
      total
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($itemId: ID!) {
    removeFromCart(itemId: $itemId)
  }
`;

export const GET_CART_COUNT = gql`
  query GetCartCount {
    cartCount
  }
`;

const CLEAR_CART = gql`
  mutation ClearCart {
    clearCart
  }
`;

export default function Cart() {
  const [open, setOpen] = React.useState(false);
  const { loading, error, data } = useQuery(GET_CART);
  const [removeFromCart, { load, err }] = useMutation(REMOVE_FROM_CART, {
    refetchQueries: [{ query: GET_CART }, { query: GET_CART_COUNT }], // refresh cart after deletion
  });

  const [clearCart, response] = useMutation(CLEAR_CART, { refetchQueries: [{ query: GET_CART }, { query: GET_CART_COUNT }] })

  if (loading || response.loading || response.loading) return <CircularProgress />;
  if (error || err || response.error) return <Typography color="error">Error: {error.message || err.message}</Typography>;



  const handleDelete = (itemId) => {
    removeFromCart({ variables: { itemId } });
  };

  const clearCartHandler = () => {
    clearCart()
  }

  const handlePurchase = async () => {
    setOpen(true)
  }

  const { items, total, count } = data.cart;
  console.log("check for the cart data7777", items);

  let totalAmount = items.reduce((accu, ele) => {
    accu = accu + (ele.quantity * ele.product.price)
    return accu;
  }, 0)

  return (
    <>
      <Box
        sx={{
          bgcolor: '#FAFAFA',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          pt: { xs: 6, sm: 10 },
          mx: 'auto'
        }}
      >
        <Stack
          // direction="row"
          // alignItems="center"
          // justifyContent="space-between"
          // sx={{ mb: 2, p: 3 }}
          sx={{ width: 'min(900px, 95vw)', pt: 2 }}
        >
          {/* Clear the cart action like the screenshot (text on the right) */}
          <Box sx={{ textAlign: "end" }}>
            <Button
              variant="text"
              color="inherit"
              onClick={clearCartHandler}
              disabled={items.length === 0}
              sx={{ textTransform: 'none', fontSize: '16px' }}
            >
              Clear the cart
            </Button>
          </Box>
        </Stack>


        <Grid
          container
          direction="column"
          spacing={2}
          sx={{ width: 'min(900px, 95vw)', pt: 2 }}
        >
          {items.map((item, idx) => (
            <Grid item key={idx}>
              <Card
                elevation={2}
                sx={{
                  borderRadius: 1.5,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" alignItems="flex-start" spacing={2}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                        {item.product.name}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        {item.product.shortDescription}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Quantity: {item.quantity}
                      </Typography>
                    </Box>

                    <IconButton aria-label="delete"
                      onClick={() => handleDelete(item.id)}
                      disabled={load}
                      color="error"
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 1 }}>
        <Typography
          component="p"
          sx={{
            fontSize: { xs: 24, sm: 24 },
            fontWeight: 500,
            letterSpacing: 0.2,
            mt: { xs: 1, sm: 2 },
            display: "block"
          }}
        >
          Total: {new Intl.NumberFormat("de-DE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(totalAmount) + " EUR"}
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={handlePurchase}
          sx={{
            px: { xs: 3.5, sm: 5 },
            py: { xs: 1.1, sm: 1.2 },
            borderRadius: 1.2,
            textTransform: 'uppercase',
            letterSpacing: 1,
            margin: 2
          }}
        >
          PURCHASE
        </Button>
      </Box>


      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 2, p: 1, maxWidth: 680, width: '100%',
            position: { lg: 'relative' },
            top: { lg: '25%' },
          }
        }}
      >
        <DialogTitle sx={{ fontSize: 28, fontWeight: 700, pb: 1 }}>
          Purchase Complete
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <Typography sx={{ fontSize: 20, lineHeight: 1.6 }}>
            Thank you for your purchase! Your order has been successfully placed. A confirmation
            email has been sent to your inbox with the details of your order. We hope to serve you
            again soon!
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Box sx={{ flex: 1 }} />
          <Button
            variant="text"
            color="primary"
            sx={{ fontWeight: 700, textTransform: 'none' }}
          >
            GO BACK HOME
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
