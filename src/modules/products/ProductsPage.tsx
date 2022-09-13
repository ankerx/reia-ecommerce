import { Input } from "@material-tailwind/react";
import { ChangeEvent, useReducer } from "react";

import { ProductCollection } from "@chec/commerce.js/features/products";

import { AllProducts } from "./ProductsList";
import { CheckboxContainer } from "./components/CheckboxContainer";
import { FilterCategory } from "./components/FilterCategory";
import { filterReducer } from "./filterReducer";
import { useCategories } from "./hooks/useCategories";

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
      <div className="2xl:flex justify-between relative max-w-[1500px]">
        <div className="max-w-sm my-10 mx-auto  2xl:hidden">
          <Input color="brown" label="Search for a product" onChange={handleSearchByQuery} />
        </div>
        <div className="hidden 2xl:flex flex-col  p-10 h-[100%] mt-10 mr-10 bg-white rounded-lg items-start text-left">
          <div className="max-w-sm my-10 ml-2">
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
