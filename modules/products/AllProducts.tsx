import { ProductCollection } from "@chec/commerce.js/features/products";
import { useEffect, useState } from "react";
import { useCategories } from "./hooks/useCategories";
import { ProductItem } from "./Product";

interface IProps {
  products: ProductCollection;
  maxPrice: number;
  minPrice: number;
}
export const AllProducts = ({ products, minPrice, maxPrice }: IProps) => {
  const categories = products.data.map((i) => i.categories.map((i) => i.slug));

  const [filteredProducts, setFilteredProducts] = useState(products.data);

  useEffect(() => {
    setFilteredProducts(
      products.data.filter(({ price }) => price.raw > minPrice && price.raw < maxPrice),
    );
  }, [minPrice, maxPrice]);

  const obj = [
    {
      name: "ball",
      categories: [
        {
          slug: "sport",
        },
      ],
    },
    {
      name: "shoes",
      categories: [
        {
          slug: "fashion",
        },
        {
          slug: "new",
        },
        {
          slug: "sport",
        },
      ],
    },
  ];

  const cats = obj.map((item) => item.categories.map((i) => i.slug)).flat();
  //  cats.filter((category) => category === "fashion");
  const filt = "";
  // console.log(filt);

  return (
    <div className="">
      <div className=" grid gap-x-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-6 ">
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
