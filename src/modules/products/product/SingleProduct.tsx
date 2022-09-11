import { Product } from "@chec/commerce.js/types/product";
import { Button } from "@material-tailwind/react";
import Image from "next/image";
import React from "react";
import ImageGallery from "react-image-gallery";
import { useCartContext } from "../../../context/useCartContext";
import { useAddToCart } from "../../../core/hooks/useCart";
import { FeaturedProducts } from "./FeaturedProducts";
import { SingleProductImages } from "./SingleProductImages";

export interface IProduct {
  product: Product;
}
export const SingleProduct = ({ product }: IProduct) => {
  const { toggleCart } = useCartContext();
  const { mutate } = useAddToCart(product.id);
  console.log(product);

  return (
    <div className="w-full mt-10  px-6 md:px-20 py-10 ">
      <div className="flex flex-col lg:flex-row  h-full w-full ">
        <SingleProductImages product={product} />
        <div className="mt-10  max-w-2xl">
          <h4 className="my-4 lg:mb-12 font-OldStandard text-2xl lg:text-5xl">{product.name}</h4>
          <p className="my-4 lg:text-2xl">
            <span className="font-bold">{product.price.formatted_with_code}</span>
          </p>
          <p className="mb-6 lg:mb-10  lg:text-lg">
            Availability:
            <span className="font-bold ">{product.is.active ? " In stock" : " Not available"}</span>
          </p>

          <p className="lg:text-lg">
            {product.description.slice(3, -4)}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid earum dolores sit
            doloribus dolore beatae minus reiciendis tempore ipsum explicabo! Lorem ipsum dolor, sit
            amet consectetur adipisicing elit. Recusandae dolorem repellat natus obcaecati nulla
            esse explicabo exercitationem sint fuga deserunt. Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Labore, cumque. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Nemo, suscipit.
          </p>
          <div className="flex">
            <Button
              size="lg"
              onClick={() => {
                mutate();
                toggleCart();
              }}
              color="brown"
              className="mt-10 "
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>
      <FeaturedProducts product={product} />
    </div>
  );
};
