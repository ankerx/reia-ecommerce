import { dehydrate, QueryClient } from "@tanstack/react-query";
import { NextPage } from "next";
import { getProducts, useProducts } from "../core/hooks/useProducts";

import { Banner } from "../modules/products/Banner";
import { LoadingSpinner } from "../modules/UI/LoadingSpinner";
import { ProductsPage } from "../modules/products/ProductsPage";

// export const categories = ["oils", "candles", "spa"] as const;
// export type CategoriesType = typeof categories[number];

const Products: NextPage = () => {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) return <LoadingSpinner />;

  if (error) return <p>'An error has occurred:{error.message}'</p>;

  return (
    <section className="bg-main min-h-[100vh] text-center">
      <Banner />
      <div className="mx-6 md:mx-20 py-10 ">
        <h3 className="font-OldStandard text-2xl mb-5 lg:my-10 lg:text-3xl">
          All products are made by myself
        </h3>
        <ProductsPage products={products} />
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
