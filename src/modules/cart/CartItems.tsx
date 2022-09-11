import { Cart } from "@chec/commerce.js/types/cart";

import { CartItem } from "./CartItem";

interface IProps {
  products: Cart;
}
export const CartItems = ({ products }: IProps) => {
  return (
    <ul className="-my-6 divide-y divide-gray-200">
      {products.line_items.map((product) => (
        <CartItem key={product.id} {...product} />
      ))}
    </ul>
  );
};
