import { useState, useEffect, useCallback } from "react";
import { Navbar, MobileNav, Typography, Button, IconButton } from "@material-tailwind/react";
import Link from "next/link";
import { useCartContext } from "../../context/useCartContext";

export default function Nav() {
  const { toggleCart, isOpen } = useCartContext();
  const [openNav, setOpenNav] = useState(false);
  const [width, setWidth] = useState(0);

  const isMobile = width < 960;
  const handleNav = () => {
    const w = window.innerWidth;
    if (w > 0) {
      setWidth(w);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", () => handleNav());
    }
    return () => {
      window.removeEventListener("resize", () => handleNav());
    };
  }, [width]);
  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  const routes = [
    { name: "Home", path: "/" },
    { name: "Massage", path: "/massage" },
    { name: "Shop", path: "/products" },
    { name: "About me", path: "/about" },
    { name: "Contact", path: "/about" },
  ];
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {routes.map((item) => {
        return (
          <Typography
            as="li"
            variant="small"
            color={isMobile ? "black" : "white"}
            className="p-1 mx-4 font-normal text-md hover:underline"
            key={item.name}
            onClick={() => setOpenNav(false)}
          >
            <Link href={item.path} className="flex items-center">
              {item.name}
            </Link>
          </Typography>
        );
      })}
    </ul>
  );

  return (
    <Navbar
      className="mx-auto absolute
       py-2 px-4 lg:px-8 lg:py-6 z-50 "
      fullWidth={true}
      color={isMobile ? "white" : "transparent"}
    >
      <div className="container mx-auto flex items-center justify-between text-black">
        <Typography
          as="a"
          href="#"
          variant="small"
          className="mr-4 cursor-pointer py-1.5 font-normal"
        >
          <span>Reia</span>
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <Button
          onClick={() => toggleCart()}
          variant="outlined"
          color="white"
          size="sm"
          className="hidden lg:inline-block"
        >
          <span className="text-white">Shopping cart</span>
        </Button>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav} className="color-black">
        {navList}
        <Button
          onClick={() => {
            toggleCart();
            setOpenNav(false);
          }}
          variant="outlined"
          color="brown"
          size="sm"
          fullWidth
          className="mb-2"
        >
          <span className="text-black">Shoping cart</span>
        </Button>
      </MobileNav>
    </Navbar>
  );
}
