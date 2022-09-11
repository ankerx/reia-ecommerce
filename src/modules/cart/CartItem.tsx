import { Button } from "@material-tailwind/react";

import { useRemoveFromCart, useUpdateCart } from "@/core/hooks/useCart";
import { LineItem } from "@chec/commerce.js/types/line-item";
import Image from "next/image";

import { LoadingSpinner } from "../UI/LoadingSpinner";

export const CartItem = (product: LineItem) => {
  const { mutate: add, isLoading: loading } = useUpdateCart(product.id, product.quantity + 1);
  const { mutate: remove, isLoading } = useUpdateCart(product.id, product.quantity - 1);
  const { mutate, isLoading: isRemoving } = useRemoveFromCart(product.id);
  return (
    <li className="py-6 flex">
      <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
        <Image src={product.image?.url || ""} alt={product.name} width={100} height={100} />
      </div>
      <div className="ml-4 flex-1 flex flex-col">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <div className="flex flex-col  items-center">
            <h3>{product.name}</h3>
            <div className="flex items-center gap-3">
              <button onClick={() => remove()}>-</button>
              <p>{loading || isLoading ? <LoadingSpinner /> : product.quantity}</p>
              <button onClick={() => add()}>+</button>
            </div>
          </div>

          <p className="ml-4">{product.line_total.formatted_with_symbol}</p>
        </div>
        <div className="flex-1 flex items-end justify-between text-sm">
          <div className="flex">
            <Button variant="text" color="brown" size="sm" onClick={() => mutate()}>
              {isRemoving ? <LoadingSpinner /> : "Remove"}
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};
