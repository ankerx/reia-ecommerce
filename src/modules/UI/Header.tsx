import { useCartContext } from "src/context/useCartContext";

import { Cart } from "../cart/Cart";
import Nav from "./Navbar";

export const Header = () => {
  const { isOpen } = useCartContext();

  return (
    <header className="bg-white">
      <Nav />
      {isOpen && <Cart />}
    </header>
  );
};
