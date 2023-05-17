import { Button } from "@material-tailwind/react";

import Image from "next/image";
import Link from "next/link";

import heroimg from "../../assets/candless.jpg";

export const HeroSection = () => {
  return (
    <div className="relative w-full">
      <div className="w-full h-full bg-black opacity-30 absolute top-0 left-0  z-10"></div>
      <div className="absolute w-full h-full flex flex-col justify-center items-center top-0 left-0 z-10">
        <h1 className="text-3xl md:text-5xl  lg:text-6xl absolute text-white  font-OldStandard mx-20 text-center xl:mx-40">
          Discover the Perfect Massage & Products!
        </h1>
        <div className="mt-52 lg:mt-60 xl:mt-80">
          <Link href="/products">
            <Button color="white" className="lg:text-lg " variant="outlined">
              Shop now
            </Button>
          </Link>
        </div>
      </div>

      <div className="min-h-[400px] md:min-h-[100vh] blur-[1px]">
        <Image src={heroimg} layout="fill" objectFit="cover" alt="massage" />
      </div>
    </div>
  );
};
