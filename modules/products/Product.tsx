import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import Image from "next/image";
import { Product } from "@chec/commerce.js/types/product";
import { useAddToCart } from "../../core/hooks/useCart";
import { LoadingSpinner } from "../UI/LoadingSpinner";

interface IProps {
  product: Product;
}
export const ProductItem = ({ product }: IProps) => {
  const { mutate, isLoading } = useAddToCart(product.id);

  return (
    <Card className="my-14 min-w-[260px]">
      <CardHeader color="brown" className="relative h-56">
        <Image
          src={product.image?.url || ""}
          alt={product.name}
          objectFit="fill"
          layout="responsive"
          width={100}
          height={100}
        />
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
          <Button onClick={() => mutate()} variant="outlined" color="brown">
            {isLoading ? <LoadingSpinner /> : "Add to cart"}
          </Button>
        </Typography>
      </CardFooter>
    </Card>
  );
};
