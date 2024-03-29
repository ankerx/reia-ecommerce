import { Product } from "@chec/commerce.js/types/product";
import { AnimatePresence, motion } from "framer-motion";

import { ProductCard } from "./components/ProductCard";

interface Props {
  filteredProducts: Product[];
}
export const AllProducts = ({ filteredProducts }: Props) => {
  return (
    <AnimatePresence>
      <motion.div
        layout
        className="grid gap-x-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-6 place-items-center md:place-items-stretch"
      >
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {filteredProducts.length === 0 && (
          <p className="absolute bottom-[50%] right-[50%] translate-x-[50%] translate-y-[50%]">
            Products not found
          </p>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
