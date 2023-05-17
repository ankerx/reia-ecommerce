import { Product } from "@chec/commerce.js/types/product";

export type State = {
  products: Product[];
  filteredProducts: Product[];
  category: string;
  searchQuery: string;
  price?: string[];
};

export type Action =
  | { type: "SEARCH_PRODUCTS"; payload: string }
  | { type: "SET_CATEGORY"; payload: string }
  | { type: "FILTER_BY_PRICE"; payload: string[] };

export const filterReducer = (state: State, action: Action) => {
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
    case "FILTER_BY_PRICE":
      const price = action.payload;
      const filteredProducts = state.products.filter(
        (product) => product.price.raw > Number(price[0]) && product.price.raw < Number(price[1]),
      );

      return { ...state, price: price, filteredProducts: filteredProducts };
    default:
      return state;
  }
};
