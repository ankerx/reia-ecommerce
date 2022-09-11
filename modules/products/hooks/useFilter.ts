import { Product } from "@chec/commerce.js/types/product";
import { useReducer } from "react";
import { useProducts } from "../../../core/hooks/useProducts";

export type IState = {
  products: Product[] | [];
  filteredProducts: Product[] | [];
  category: string;
  searchQuery: string;
  price?: [number, number];
};

export type Action =
  | { type: "SEARCH_PRODUCTS"; payload: string }
  | { type: "SET_CATEGORY"; payload: string };

export const filterReducer = (state: IState, action: Action) => {
  switch (action.type) {
    case "SEARCH_PRODUCTS":
      const searchedProducts = state.products.filter(({ name }) => {
        return name.toLowerCase().includes(action.payload.toLowerCase());
      });

      return { ...state, filteredProducts: searchedProducts, searchQuery: action.payload };

    case "SET_CATEGORY":
      if (action.payload === "all") {
        return { ...state, filteredProducts: state.products };
      }

      const filteredByCategory = state.products.filter((product) =>
        product.categories.find((i) => {
          return i.slug === action.payload;
        }),
      );

      return { ...state, category: action.payload, filteredProducts: filteredByCategory };

    default:
      return state;
  }
};

export const useFilter = () => {
  const { data } = useProducts();
  const initialState: IState = {
    products: data?.data || [],
    filteredProducts: data?.data || [],
    category: "all",
    searchQuery: "",
  };
  const [state, dispatch] = useReducer(filterReducer, initialState);

  const filterBySearch = (text: string) => {
    dispatch({ type: "SEARCH_PRODUCTS", payload: text });
  };
  const filterByCategory = (category: string) => {
    dispatch({ type: "SET_CATEGORY", payload: category });
  };
  return {
    state,
    filterBySearch,
    filterByCategory,
  };
};
