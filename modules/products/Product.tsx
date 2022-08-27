import { Product } from "@chec/commerce.js/types/product";
import Image from "next/image";
import { useAddToCart } from "../../core/hooks/useCart";
import { LoadingSpinner } from "../UI/LoadingSpinner";

interface IProps {
  product: Product;
}
export const ProductItem = ({ product }: IProps) => {
  const { mutate, isLoading } = useAddToCart(product.id);
  return (
    <div>
      <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
        <Image
          src={product.image?.url || ""}
          alt=""
          width={100}
          height={100}
          className="w-full h-full object-center object-cover"
        />
      </div>
      <p>{product.name}</p>
      <button
        className="text-black px-6 py-2 mx-2  bg-indigo-500 flex items-center"
        onClick={() => mutate()}
      >
        {isLoading && <LoadingSpinner />} Add to cart
      </button>
    </div>
  );
};
