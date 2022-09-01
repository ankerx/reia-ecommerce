import { useQuery } from "@tanstack/react-query";
import { commerce } from "../../../lib/commerce";

export const getCategories = async () => {
  const categories = commerce.categories.list();
  return categories;
};
export const useCategories = () => {
  return useQuery(["categories"], () => getCategories());
};
