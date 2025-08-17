import React, { useState, useMemo } from 'react';
import {
  Box,
  Grid,
  Stack,
  Typography,
  CardMedia,
  Rating
} from '@mui/material';
import AddProductToCart from './AddProductToCart';
import ProductImageModal from './ProductImageModel';

export default function ProductHero({
  imageUrl,
  name,
  shortDescription,
  longDescription,
  price,
  rating,
  id
}) {
  const thumbs = useMemo(() => [imageUrl, imageUrl, imageUrl], [imageUrl]);
  const mainImages = thumbs;
  const [active, setActive] = useState(0);
  const [open, setOpen] = React.useState(false);
  const largeSrc = mainImages[active] ?? imageUrl;


  const priceFormatted = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price) + " EUR"

  return (
    <>
      <Box sx={{ width: '100%', bgcolor: 'background.default', px: "100px", py: "50px" }}>
        <Grid container spacing={{ xs: 2, md: 5 }} sx={{ alignItems: { md: 'center' } }}>
          <Grid item xs={12} md={2.5} sx={{ order: { xs: 2, md: 1 } }}>
            <Stack
              direction={{ xs: 'row', md: 'column' }}
              spacing={1}
              sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}
            >
              {thumbs.map((src, i) => (
                <Box
                  key={`${src}-${i}`}
                  onClick={() => { setActive(i), setOpen(true) }}
                  sx={{
                    width: { xs: 68, md: 160 },
                    height: { xs: 68, md: 170 },
                    borderRadius: 1,
                    overflow: 'hidden',
                    border: i === active ? '2px solid' : '1px solid',
                    borderColor: i === active ? 'primary.main' : 'divider',
                    cursor: 'pointer',
                    bgcolor: 'background.paper',
                    transition: 'border-color 0.2s ease',
                  }}
                >
                  <img
                    src={src}
                    alt={`thumb ${i + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={(e) => { e.currentTarget.style.opacity = 0.3; }}
                  />
                </Box>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={5} sx={{ order: { xs: 1, md: 2 } }}>
            <CardMedia
              component="img"
              src={mainImages[active] ?? imageUrl}
              alt={`product image ${active + 1}`}
              onClick={() => setOpen(true)}
              sx={{
                width: '100%',
                height: { xs: 300, sm: 380, md: 520 },
                objectFit: 'cover',
                borderRadius: 2,
                bgcolor: 'background.paper',
                boxShadow: 1,
              }}
              onError={(e) => { e.currentTarget.style.opacity = 0.3; }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={5}
            sx={{ order: { xs: 3, md: 3 }, alignSelf: 'flex-start' }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: { xs: 300, sm: 380, md: 520 } }}>
              <Box>
                <Typography variant="h6">
                  {name}
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5, fontSize: 16 }}>
                  {shortDescription}
                </Typography>

                <Rating
                  name="read-only-rating"
                  value={rating}
                  precision={0.5}
                  readOnly
                  sx={{ mt: 2, mb: 3 }}
                />

                <Stack direction="column" spacing={1.25} sx={{ mt: 1.75 }}>
                  <Typography variant="h6" sx={{ mt: 3 }}>
                    {priceFormatted}
                  </Typography>
                  <span style={{ fontSize: 16, color: 'gray', margin: '0px' }}>
                    all prices incl. 10% taxes
                  </span>
                </Stack>
              </Box>
              <AddProductToCart id={id} />
            </Box>
          </Grid>
        </Grid>
      </Box>
      {
        open && <ProductImageModal open={open}
          onClose={() => setOpen(false)}
          src={largeSrc}
          alt={`product image ${active + 1}`}
          caption={name} />
      }
    </>
  );
}

