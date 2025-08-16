import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Products from './components/Products';
import { ApolloProvider } from '@apollo/client';
import { client } from './apolloClient';
import ProductDetailsPage from './components/ProductDetailsPage';
import Cart from './components/Cart';
import { PageTitleProvider } from './components/PageTitleContex';

const theme = createTheme();
const router = createBrowserRouter([{
  path: "/",
  element: <App/>,
  children:[
   {
    path: "/",
    element: <Products/>,
    handle: {title: "Products"}
   },
   {
    path: "/details/:id",
    element: <ProductDetailsPage/>,
    // handle: {title: "Product details"}
   },
   {
    path: "/cart",
    element: <Cart/>,
    handle: {title: "Cart"}
   }
  ]
}])

const root = createRoot(document.getElementById('root'));
root.render(
  <PageTitleProvider>
  <ApolloProvider client={client}>
<ThemeProvider theme={theme}>
  <CssBaseline /> 
  <RouterProvider router={router}/> 
  </ThemeProvider>
  </ApolloProvider>
  </PageTitleProvider>
  );
