import { useCartContext } from "../../context/useCartContext";

import Nav from "./Navbar";
import { Cart } from "../cart/Cart";

export const Header = () => {
  const { isOpen } = useCartContext();

  return (
    <header className="bg-white">
      <Nav />
      {isOpen && <Cart />}
    </header>
  );
};
