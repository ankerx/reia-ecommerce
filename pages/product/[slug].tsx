import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import { getProduct, useProduct } from "../../modules/products/hooks/useProduct";
import { LoadingSpinner } from "../../modules/UI/LoadingSpinner";

const Product = () => {
  const router = useRouter();

  const productID = typeof router.query?.slug === "string" ? router.query.slug : "";

  const { data, isLoading, error } = useProduct(productID);

  if (isLoading) return <LoadingSpinner />;

  if (error) return <p>'An error has occurred:{error.message}'</p>;

  return <div>{data?.name}</div>;
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
