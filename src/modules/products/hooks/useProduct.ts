import { Product } from "@chec/commerce.js/types/product";
import { useQuery } from "@tanstack/react-query";
import { commerce } from "src/lib/commerce";

export const getProduct = async (productID: string) => {
  const res = await commerce.products.retrieve(productID);
  return res;
};

export const useProduct = (productID: string) => {
  return useQuery<Product, Error>(["product", productID], () => getProduct(productID));
};
