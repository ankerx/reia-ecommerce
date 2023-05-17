import { Button } from "@material-tailwind/react";

import { ProductCollection } from "@chec/commerce.js/features/products";
import Link from "next/link";

import { ProductCard } from "../products/components/ProductCard";
import { Heading } from "./Heading";

interface Props {
  products: ProductCollection;
}
export const HomePage = ({ products }: Props) => {
  return (
    <section className="mx-6 md:mx-20 py-10 text-center">
      <Heading />
      <div className="grid gap-x-10 md:gap-x-14 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6 place-items-center ">
        {products.data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Link href="/products">
        <span className="bg-brown-500 text-white px-10 py-3 rounded-lg uppercase text-sm font-semibold cursor-pointer">
          See more
        </span>
      </Link>
    </section>
  );
};
