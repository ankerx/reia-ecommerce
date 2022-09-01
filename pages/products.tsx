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

  const [categoryName, setCategoryName] = useState("");

  if (isLoading) return <LoadingSpinner />;

  if (error) return <p>'An error has occurred:{error.message}'</p>;

  const handleFilter = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);

    setFilteredProducts(
      products.data.filter(({ price }) => price.raw > minPrice && price.raw < maxPrice),
    );
  };

  const handleFilterByCategory = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategoryName(event.target.value);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;

    const searchedProducts = products.data.filter(({ name }) => {
      return name.toLowerCase().includes(searchValue.toLowerCase());
    });

    setFilteredProducts(searchedProducts);
  };

  // const handleFilterByCategory = (event: ChangeEvent<HTMLSelectElement>) => {
  //   setCategoryName(event.target.value);
  //   const categories = products.data.map((i) => i.categories.map((i) => i.slug)).flat();

  //   setFilteredProducts();
  // };

  return (
    <section className="bg-main min-h-[100vh] text-center">
      <Banner />
      <div className="mx-6 md:mx-20 py-10 ">
        <h3 className="font-OldStandard text-2xl mb-5 lg:my-10 lg:text-3xl">
          All products are made by myself
        </h3>
        <div className="lg:flex justify-between relative ">
          <div className="flex flex-col w-1/4 bg-blue-gray-100">
            <div className="max-w-sm my-10">
              {" "}
              <Input label="Search for a product" onChange={handleSearch} />
            </div>

            <Select onChange={handleFilterByCategory} options={categories} />
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
