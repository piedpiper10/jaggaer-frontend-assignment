import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
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

export const GET_PRODUCT_DETAILS = gql`
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


export const GET_CART_COUNT = gql`
  query GetCartCount {
    cartCount
  }
`;

export const GET_CART = gql`
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

export const ADD_TO_CART = gql`
  mutation AddToCart($productId: ID!, $quantity: Int!) {
    addToCart(productId: $productId, quantity: $quantity) {
      id
      productId
      quantity
      product {
        id
        name
        price
      }
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($itemId: ID!) {
    removeFromCart(itemId: $itemId)
  }
`;


export const CLEAR_CART = gql`
  mutation ClearCart {
    clearCart
  }
`;