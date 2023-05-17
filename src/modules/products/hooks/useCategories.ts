import { useQuery } from "@tanstack/react-query";
import { commerce } from "src/lib/commerce";

export const getCategories = async () => {
  const categories = await commerce.categories.list();
  return categories;
};
export const useCategories = () => {
  return useQuery(["categories"], () => getCategories());
};
