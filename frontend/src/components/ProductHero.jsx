// ProductHero.jsx
import React, { useState, useMemo } from 'react';
import {
  Box,
  Grid,
  Stack,
  Typography,
  CardMedia,
  Divider,
  Button,
  Chip,
  IconButton,
  Rating
} from '@mui/material';
import NumberSpinner from './NumberSpinner';

export default function ProductHero({
  imageUrl,        // single image URL reused for thumbs and main
  name,
  shortDescription,
  price,
  longDescription,
  rating,
  id
}) {
  const thumbs = useMemo(() => [imageUrl, imageUrl, imageUrl], [imageUrl]);
  const mainImages = thumbs; // same source for main as well

  const [active, setActive] = useState(0);

  const priceFormatted = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price) + " EUR"

  return (
    <>
      <Box sx={{ width: '100%', bgcolor: 'background.default', px: "100px", py: "50px" }}>
        <Grid container spacing={{ xs: 2, md: 5 }} sx={{ alignItems: { md: 'center' } }}>
          {/* Column 1: Thumbnails (same image repeated) */}
          <Grid item xs={12} md={2.5} sx={{ order: { xs: 2, md: 1 } }}>
            <Stack
              direction={{ xs: 'row', md: 'column' }}
              spacing={1}
              sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}
            >
              {thumbs.map((src, i) => (
                <Box
                  key={`${src}-${i}`}
                  onClick={() => setActive(i)}
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
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', width: '100%' }}>
              <Box>
                <Typography variant="h4" fontWeight={800}>
                  {name}
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
                  {shortDescription}
                </Typography>

                <Rating
                  name="read-only-rating"
                  value={rating}
                  precision={0.5}
                  readOnly
                  sx={{ mt: 1.75 }}
                />

                <Stack direction="column" spacing={1.25} sx={{ mt: 1.75 }}>
                  <Typography variant="h4" fontWeight={800}>
                    {priceFormatted}
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>
                    all prices incl. 10% taxes
                  </Typography>
                </Stack>
              </Box>
              <NumberSpinner id={id} />
            </Box>
          </Grid>
        </Grid>
      </Box>
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
          {/* Heading */}
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

          {/* Lead paragraph */}
          <Typography
            variant="body1"
            sx={{
              color: 'text.primary',
              lineHeight: 1.8,
              maxWidth: 1400,         // allow long single-line look but keep measure sane
            }}
          >
            {longDescription}
          </Typography>
        </Box>
      </Box>
    </>
  );
}

