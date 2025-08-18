import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useMatches } from "react-router-dom";
import { usePageTitle } from '../context/PageTitleContex';

import { useQuery } from "@apollo/client";
import { Link } from 'react-router-dom';
import { GET_CART_COUNT } from '../graphql/queries';

export default function Header() {
  const { data, loading, error } = useQuery(GET_CART_COUNT,);

  const matches = useMatches();
  const routeWithTitle = matches.find(m => m.handle?.title)?.handle.title;
  const { title } = usePageTitle();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'primary.main' }} >
        <Toolbar
          sx={{
            minHeight: { xs: 72, sm: 80 }, // taller than default
            px: { xs: 2, sm: 3 }, // horizontal padding
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: 'white', fontWeight: 'bold' }}
          >
            {routeWithTitle || title}
          </Typography>

          <Link to="/cart">
            <IconButton size="large" aria-label="show cart items" color="inherit">
              <Badge
                badgeContent={loading ? "…" : data.cartCount}
                color="error"
                overlap="circular"
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // position
                sx={{
                  '& .MuiBadge-badge': {
                    fontWeight: 700,
                    fontSize: 14,
                    minWidth: 20,
                    height: 20,
                    // transform: 'translate(6px, -8px)',
                  },
                }}
              >
                <ShoppingCartIcon sx={{ color: 'white', fontSize: 35, pt: 1 }} />
              </Badge>
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}


