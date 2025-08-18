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
      <Box
        sx={{
          width: '100%',
          bgcolor: 'background.default',
          px: { xs: 2, sm: 3, md: 6, lg: 10 },
          py: { xs: 2, sm: 3, md: 5 },
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 5 }}
          sx={{
            alignItems: { md: 'center' },
          }}
        >
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              order: { xs: 2, md: 1 },
            }}
          >
            <Stack
              direction={{ xs: 'row', sm: "row", md: 'column', lg: 'column' }}
              spacing={{ xs: 1, sm: 1.25, md: 1.5 }}
              sx={{
                justifyContent: { xs: 'flex-start', md: 'flex-start' },
                alignItems: 'stretch',
                overflowX: { xs: 'auto', md: 'visible' },
                pb: { xs: 1, md: 0 },
                '&::-webkit-scrollbar': { display: 'none' },
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
              }}
            >
              {thumbs.map((src, i) => (
                <Box
                  key={i}
                  onClick={() => {
                    setActive(i);
                    setOpen(true);
                  }}
                  sx={{
                    flex: { xs: '0 0 auto', md: 'initial' },
                    width: { xs: 72, sm: 84, md: 150 },
                    height: { xs: 72, sm: 84, md: 150 },
                    borderRadius: 1,
                    overflow: 'hidden',
                    border: i === active ? '2px solid' : '1px solid',
                    borderColor: i === active ? 'primary.main' : 'divider',
                    cursor: 'pointer',
                    bgcolor: 'background.paper',
                    transition: 'border-color 0.2s ease, transform 0.12s ease',
                    '&:active': { transform: { xs: 'scale(0.98)', md: 'none' } },
                  }}
                >
                  <img
                    src={src}
                    alt={name}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                    onError={(e) => {
                      e.currentTarget.style.opacity = '0.3';
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Grid>
          {/* Main Image */}
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              order: { xs: 1, md: 2 },
            }}
          >
            <CardMedia
              component="img"
              src={mainImages?.[active] ?? imageUrl}
              alt={name}
              onClick={() => setOpen(true)}
              sx={{
                width: '100%',
                height: { xs: 260, sm: 340, md: 500 },
                maxHeight: { xs: 360, sm: 420, md: 560 },
                objectFit: 'cover',
                borderRadius: 2,
                bgcolor: 'background.paper',
                boxShadow: 1,
              }}
              onError={(e) => {
                e.currentTarget.style.opacity = '0.3';
              }}
            />
          </Grid>
          {/* Details */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              order: { xs: 3, md: 3 },
              alignSelf: { xs: 'stretch', md: 'flex-start' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 2, sm: 2.5, md: 3 },
                minHeight: { md: 500 },
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: 18, sm: 20, md: 22 },
                    lineHeight: 1.3,
                  }}
                >
                  {name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: 0.75,
                    fontSize: { xs: 14, sm: 15, md: 16 },
                  }}
                >
                  {shortDescription}
                </Typography>
                <Rating
                  name="read-only-rating"
                  value={rating}
                  precision={0.5}
                  readOnly
                  sx={{ mt: 1.5, mb: { xs: 2, sm: 2.5, md: 3 } }}
                />
                <Stack direction="column" spacing={1.25} sx={{ mt: { xs: 1, sm: 1.25, md: 1.75 } }}>
                  <Typography
                    variant="h6"
                    sx={{
                      mt: { xs: 1.5, md: 2 },
                      fontSize: { xs: 18, sm: 20, md: 22 },
                    }}
                  >
                    {priceFormatted}
                  </Typography>
                  <Typography
                    component="span"
                    sx={{ fontSize: { xs: 13, sm: 14, md: 16 }, color: 'text.secondary', m: 0 }}
                  >
                    all prices incl. 10% taxes
                  </Typography>
                </Stack>
              </Box>
              <Box sx={{ mt: 'auto' }}>
                <AddProductToCart id={id} />
              </Box>
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

