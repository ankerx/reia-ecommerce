import Image from "next/image";
import heroimg from "../../assets/products.jpg";

export const Banner = () => {
  return (
    <div className="relative w-full">
      <div className="w-full h-full bg-black opacity-30 absolute top-0 left-0  z-10"></div>
      <div className="absolute w-full h-full flex flex-col justify-center items-center top-0 left-0 z-10">
        <h1 className="text-3xl md:text-5xl  lg:text-6xl absolute text-white  font-OldStandard mx-20 text-center xl:mx-40">
          Shop
        </h1>
      </div>
      <div className="min-h-[300px] md:min-h-[400px]">
        <Image src={heroimg} layout="fill" alt="massage" />
      </div>
    </div>
  );
};
