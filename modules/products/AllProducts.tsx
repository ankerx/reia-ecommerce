import { ProductCollection } from "@chec/commerce.js/features/products";
import { Product } from "@chec/commerce.js/types/product";

import { ProductItem } from "./ProductItem";
interface IProps {
  products: ProductCollection;
  filteredProducts: Product[];
}
export const AllProducts = ({ filteredProducts }: IProps) => {
  return (
    <div>
      <div className="grid gap-x-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-6 place-items-center md:place-items-stretch">
        {filteredProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
        {filteredProducts.length === 0 && (
          <p className="absolute bottom-[50%] right-[50%] translate-x-[50%] translate-y-[50%]">
            Products not found
          </p>
        )}
      </div>
    </div>
  );
};
