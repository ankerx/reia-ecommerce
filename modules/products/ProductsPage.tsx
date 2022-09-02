import { useState, ChangeEvent, useCallback, useEffect } from "react";
import { ProductCollection } from "@chec/commerce.js/features/products";

import { useCategories } from "./hooks/useCategories";

import { Input } from "@material-tailwind/react";
import { AllProducts } from "./AllProducts";
import { Select } from "./components/Select";
import { RangeSlider } from "./components/Slider";
import { commerce } from "../../lib/commerce";

interface IProps {
  products: ProductCollection;
}
export const ProductsPage = ({ products }: IProps) => {
  const { data } = useCategories();

  const [filteredProducts, setFilteredProducts] = useState(products?.data || []);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200);

  const categories = data?.data.map((item) => item.slug);

  const handleFilterByPrice = useCallback(
    (min: number, max: number) => {
      setMinPrice(min);
      setMaxPrice(max);

      setFilteredProducts(
        products.data.filter(({ price }) => price.raw > minPrice && price.raw < maxPrice),
      );
    },
    [minPrice, maxPrice, products.data],
  );

  const handleFilterByCategory = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
    console.log(selectedCategory);
    const filteredByCategory = filteredProducts.filter((product) =>
      product.categories.find((i) => i.slug === selectedCategory),
    );
    console.log(selectedCategory);
    // console.log(filteredByCategory);

    setFilteredProducts(filteredByCategory);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;

    const searchedProducts = products.data.filter(({ name }) => {
      return name.toLowerCase().includes(searchValue.toLowerCase());
    });

    setFilteredProducts(searchedProducts);
  };

  return (
    <>
      <div className="lg:flex justify-between relative ">
        <div className="flex flex-col w-1/4 p-10 h-[100%] mt-10 bg-white rounded-lg">
          <div className="max-w-sm my-10">
            <Input color="brown" label="Search for a product" onChange={handleSearch} />
          </div>
          <Select onChange={handleFilterByCategory} options={categories} />
          <RangeSlider
            onChange={({ min, max }) => handleFilterByPrice(min, max)}
            min={0}
            max={200}
          />
        </div>
        <AllProducts products={products} filteredProducts={filteredProducts} />
      </div>
    </>
  );
};
