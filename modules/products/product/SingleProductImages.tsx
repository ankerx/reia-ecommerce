import ReactImageGallery from "react-image-gallery";
import { IProduct } from "./SingleProduct";

export const SingleProductImages = ({ product }: IProduct) => {
  const images = product.assets.map((i) => {
    return {
      original: i.url,
      thumbnail: i.url,
    };
  });
  return (
    <div className="lg:max-w-[40vw] lg:mr-20">
      <div className="lg:hidden">
        <h3 className="font-OldStandard text-3xl">{product.name}</h3>
        <p>{product.price.formatted_with_code}</p>
      </div>
      <div className="mt-10 ">
        <ReactImageGallery items={images} showPlayButton={false} />
      </div>
    </div>
  );
};
