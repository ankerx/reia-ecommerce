import { dehydrate, QueryClient } from "@tanstack/react-query";

import { NextPage } from "next";
import { ChangeEvent, useEffect, useState } from "react";

import { getProducts, useProducts } from "../core/hooks/useProducts";
import { useCategories } from "../modules/products/hooks/useCategories";

import { Select } from "../modules/products/components/Select";
import { AllProducts } from "../modules/products/AllProducts";
import { Banner } from "../modules/products/Banner";
import { RangeSlider } from "../modules/products/components/Slider";
import { LoadingSpinner } from "../modules/UI/LoadingSpinner";
import { Input } from "@material-tailwind/react";

// export const categories = ["oils", "candles", "spa"] as const;
// export type CategoriesType = typeof categories[number];

const Products: NextPage = () => {
  const { data: products, isLoading, error } = useProducts();
  const { data } = useCategories();

  const [filteredProducts, setFilteredProducts] = useState(products?.data || []);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200);

  const categories = data?.data.map((item) => item.slug);

  const [category, setCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");

  if (isLoading) return <LoadingSpinner />;

  if (error) return <p>'An error has occurred:{error.message}'</p>;

  const handleFilter = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);

    setFilteredProducts(
      products.data.filter(({ price }) => price.raw > minPrice && price.raw < maxPrice),
    );
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);

    const searchedProducts = products.data.filter((product) => {
      return product.name.toLowerCase().includes(event.target.value.toLowerCase());
    });

    setFilteredProducts(searchedProducts);
  };

  return (
    <section className="bg-main min-h-[100vh] text-center">
      <Banner />
      <div className="mx-6 md:mx-20 py-10 ">
        <h3 className="font-OldStandard text-2xl mb-5 lg:my-10 lg:text-3xl">
          All products are made by myself
        </h3>
        <div className="lg:flex justify-between relative">
          <Input label="Search for a product" onChange={handleSearch} />
          <div className="flex flex-col w-1/4">
            <Select onChange={handleSelect} options={categories} />
            <RangeSlider onChange={({ min, max }) => handleFilter(min, max)} min={0} max={200} />
          </div>
          <AllProducts products={products} filteredProducts={filteredProducts} />
        </div>
      </div>
    </section>
  );
};

export default Products;

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["products"], getProducts);

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
}
