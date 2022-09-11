import { Input } from "@material-tailwind/react";
import { ChangeEvent, useReducer } from "react";

import { ProductCollection } from "@chec/commerce.js/features/products";

import { AllProducts } from "./AllProducts";
import { CheckboxContainer } from "./components/CheckboxContainer";
import { FilterCategory } from "./components/FilterCategory";
import { useCategories } from "./hooks/useCategories";
import { filterReducer } from "./reducers/filterReducer";

interface IProps {
  products: ProductCollection;
}
export const ProductsPage = ({ products }: IProps) => {
  const { data: categoriesData } = useCategories();

  const initialState = {
    products: products.data,
    filteredProducts: products.data || [],
    category: "all",
    searchQuery: "",
  };

  const [state, dispatch] = useReducer(filterReducer, initialState);

  const categories = categoriesData?.data.map((item) => item.slug);

  const handleSearchByQuery = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;

    dispatch({ type: "SEARCH_PRODUCTS", payload: searchValue });
  };

  const handleSearchByCategory = (category: string) => {
    dispatch({ type: "SET_CATEGORY", payload: category });
  };

  const handleFilterByPrice = (price: string[]) => {
    dispatch({ type: "FILTER_BY_PRICE", payload: price });
  };

  return (
    <>
      <div className="lg:flex justify-between relative ">
        <div className="flex flex-col w-1/4 p-10 h-[100%] mt-10 bg-white rounded-lg items-start text-left">
          <div className="max-w-sm my-10 ">
            <Input color="brown" label="Search for a product" onChange={handleSearchByQuery} />
          </div>
          <FilterCategory categories={categories} handleSearchByCategory={handleSearchByCategory} />
          <CheckboxContainer handleFilterByPrice={handleFilterByPrice} />
        </div>

        <AllProducts filteredProducts={state.filteredProducts} />
      </div>
    </>
  );
};
