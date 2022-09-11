import { ChangeEvent, useReducer } from "react";
import { ProductCollection } from "@chec/commerce.js/features/products";

import { useCategories } from "./hooks/useCategories";

import { Input } from "@material-tailwind/react";
import { AllProducts } from "./AllProducts";

import { FilterCategory } from "./components/FilterCategory";
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

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;

    dispatch({ type: "SEARCH_PRODUCTS", payload: searchValue });
  };

  const handleSearchByCategory = (category: string) => {
    dispatch({ type: "SET_CATEGORY", payload: category });
  };
  return (
    <>
      <div className="lg:flex justify-between relative ">
        <div className="flex flex-col w-1/4 p-10 h-[100%] mt-10 bg-white rounded-lg items-start text-left">
          <div className="max-w-sm my-10 ">
            <Input color="brown" label="Search for a product" onChange={handleSearch} />
          </div>

          <FilterCategory categories={categories} handleSearchByCategory={handleSearchByCategory} />
        </div>

        <AllProducts filteredProducts={state.filteredProducts} />
      </div>
    </>
  );
};
