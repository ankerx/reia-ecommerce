import { useState, ChangeEvent, useCallback } from "react";
import { ProductCollection } from "@chec/commerce.js/features/products";

import { useCategories } from "./hooks/useCategories";

import { Input } from "@material-tailwind/react";
import { AllProducts } from "./AllProducts";

import { RangeSlider } from "./components/Slider";
import { FilterCategory } from "./components/FilterCategory";
import { useFilter } from "./hooks/useFilter";

interface IProps {
  products: ProductCollection;
}
export const ProductsPage = ({ products }: IProps) => {
  const { data } = useCategories();
  const { filterByCategory, filterBySearch, state } = useFilter();
  console.log(state);

  // const [filteredProducts, setFilteredProducts] = useState(products?.data);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = data?.data.map((item) => item.slug);

  // console.log(selectedCategory);
  // const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedCategory(event.target.value);
  //   handleFilterByCategory();
  // };
  // const handleFilterByCategory = (event) => {
  //   setSelectedCategory(event);
  //   if (selectedCategory === "all") {
  //     setFilteredProducts(products.data);
  //   }
  //   const filteredByCategory = products.data.filter((product) =>
  //     product.categories.find((i) => {
  //       if (selectedCategory === "all") {
  //         return products.data;
  //       } else return i.slug === selectedCategory;
  //     }),
  //   );

  //   setFilteredProducts(filteredByCategory);
  // };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    filterBySearch(searchValue);
    // const searchedProducts = products.data.filter(({ name }) => {
    //   return name.toLowerCase().includes(searchValue.toLowerCase());
    // });

    // setFilteredProducts(searchedProducts);
  };
  const handleSearchByCategory = (event) => {
    filterByCategory(event);
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
