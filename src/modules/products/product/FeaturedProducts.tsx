import Image from "next/image";
import { IProduct } from "./SingleProduct";

export const FeaturedProducts = ({ product }: IProduct) => {
  return (
    <div className="mt-12  text-center">
      <p className="text-2xl  mb-8  mt-6">Products you might also like</p>
      <div className="flex justify-center gap-x-6 lg:gap-x-20">
        {product.related_products.map((i) => {
          return (
            <div key={i.id} className="w-1/2 lg:w-1/4">
              <div className="aspect-w-1 aspect-h-1 mb-2">
                <Image src={i.image.url} alt={i.name} layout="fill" objectFit="cover" />
              </div>
              <div className="flex justify-between md:mx-4">
                <p>{i.name}</p>
                <p>{i.price.formatted_with_symbol}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
