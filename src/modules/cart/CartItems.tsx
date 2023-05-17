import { Cart } from "@chec/commerce.js/types/cart";

import { CartItem } from "./CartItem";

interface Props {
  products: Cart;
}
export const CartItems = ({ products }: Props) => {
  return (
    <ul className="-my-6 divide-y divide-gray-200">
      {products.line_items.map((product) => (
        <CartItem key={product.id} {...product} />
      ))}
    </ul>
  );
};
