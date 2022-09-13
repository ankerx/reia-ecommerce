import { GetStaticPaths, GetStaticProps } from "next";

import { Banner } from "@/modules/UI/Banner";
import { LargeLoadingSpinner } from "@/modules/components/LargeLoadingSpinner";
import { getProduct, useProduct } from "@/modules/products/hooks/useProduct";
import { SingleProduct } from "@/modules/products/product/SingleProduct";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { useRouter } from "next/router";

import image from "../../src/assets/singleprod.jpg";

const Product = () => {
  const router = useRouter();

  const productID = typeof router.query?.slug === "string" ? router.query.slug : "";

  const { data, isLoading, error } = useProduct(productID);
  console.log(data);

  if (error) return <p>'An error has occurred:{error.message}'</p>;

  return (
    <section className="flex flex-col items-center min-h-[100vh]">
      {isLoading ? (
        <div className="mt-52">
          {" "}
          <LargeLoadingSpinner />
        </div>
      ) : (
        <>
          <Banner text="Single product" img={image} />
          <SingleProduct product={data} />
        </>
      )}
    </section>
  );
};

export default Product;

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["product", id], () => getProduct(id));
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
