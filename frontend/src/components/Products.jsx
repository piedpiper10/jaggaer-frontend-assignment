import React from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Rating,
  CssBaseline,
  Container,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";
import { GET_PRODUCTS } from "../graphql/queries";
import { useQuery } from "@apollo/client";

export default function Products() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const navigate = useNavigate();
  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <CssBaseline />
      <Container sx={{ py: 4 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
            },
            gap: 4,
            alignItems: "stretch",
          }}
        >
          {data.products.map((p) => (
            <Card key={p.id} sx={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 2,
              boxShadow: 3,
            }}
              variant="elevation">
              <Box sx={{ position: 'relative', pt: '53.25%' }}>
                <CardMedia component="img" image={p.imageUrl} alt={p.name}
                  sx={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    objectFit: 'cover',
                  }} />
              </Box>
              <CardContent sx={{ flexGrow: 1, display: "flex", justifyContent: "space-between" }}>
                <div>
                  <Typography variant="h6">{p.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{p.shortDescription}</Typography>
                </div>
                <Rating
                  name="read-only-rating"
                  value={p.rating}
                  precision={0.5}
                  readOnly
                  sx={
                    {
                      marginTop: "10px"
                    }
                  }
                />
              </CardContent>

              <CardActions sx={{ justifyContent: "flex-start" }}>
                <Button size="small" variant="contained"
                  sx={{
                    fontSize: "0.75rem",
                    padding: "4px 10px",
                  }}
                  onClick={() => navigate(`/details/${p.id}`)}
                >Show details</Button>
                <AddToCartButton product={p} />
              </CardActions>
            </Card>
          ))}
        </Box>
      </Container>
    </>
  );
}





