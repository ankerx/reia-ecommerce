import { ProductCollection } from "@chec/commerce.js/features/products";
import { useQuery } from "@tanstack/react-query";
import { commerce } from "../../lib/commerce";

export const getProducts = async () => {
  const res = await commerce.products.list();
  return res;
};

export const useProducts = () => {
  return useQuery<ProductCollection, Error>(["products"], () => getProducts());
};
