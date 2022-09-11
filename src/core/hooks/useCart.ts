import { Cart } from "@chec/commerce.js/types/cart";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { commerce } from "../../lib/commerce";

export const getCart = async () => {
  const res = await commerce.cart.retrieve();
  return res;
};
export const useCart = () => {
  return useQuery<Cart, Error>(["cart"], () => getCart());
};

export const addToCart = async (productID: string) => {
  const res = await commerce.cart.add(productID);
  console.log(res);
  return res;
};

export const useAddToCart = (productID: string) => {
  const queryClient = useQueryClient();
  return useMutation(["cart"], () => addToCart(productID), {
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });
};

export const updateCart = async (productID: string, quantity: number) => {
  const res = await commerce.cart.update(productID, { quantity: quantity });
  console.log(res);
  return res;
};

export const useUpdateCart = (productID: string, quantity: number) => {
  const queryClient = useQueryClient();
  return useMutation(["cart"], () => updateCart(productID, quantity), {
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });
};

export const removeFromCart = async (productID: string) => {
  const res = await commerce.cart.remove(productID);
  console.log(res);
  return res;
};

export const useRemoveFromCart = (productID: string) => {
  const queryClient = useQueryClient();
  return useMutation(["cart"], () => removeFromCart(productID), {
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });
};
