import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

import { useAddToCart } from "@/core/hooks/useCart";
import { Product } from "@chec/commerce.js/types/product";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCartContext } from "src/context/useCartContext";

import { LoadingSpinner } from "../../UI/LoadingSpinner";

interface IProps {
  product: Product;
}
export const ProductCard = ({ product }: IProps) => {
  const { toggleCart } = useCartContext();
  const { mutate, isLoading } = useAddToCart(product.id);

  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Card className="my-14 min-w-[280px] max-w-sm h-[500px] ">
        <CardHeader color="brown" className="relative h-56 ">
          <Link href={`/product/${product.id}`}>
            <Image
              src={product.image?.url || ""}
              alt={product.name}
              objectFit="cover"
              layout="fill"
              className="cursor-pointer hover:opacity-90"
            />
          </Link>
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h5" className="mb-2">
            {product.name}
          </Typography>
          <Typography>{product.description.slice(3, -4)}</Typography>
        </CardBody>
        <CardFooter divider className="flex items-center justify-between py-3">
          <Typography variant="small">{product.price.formatted_with_symbol}</Typography>
          <Typography variant="small" color="gray" className="flex gap-1">
            <Button
              id="add-to-cart"
              onClick={() => {
                mutate();
                toggleCart();
              }}
              variant="outlined"
              color="brown"
            >
              {isLoading ? <LoadingSpinner /> : "Add to cart"}
            </Button>
          </Typography>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
