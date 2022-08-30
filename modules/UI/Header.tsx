import { useCartContext } from "../../context/useCartContext";
import { useCart } from "../../core/hooks/useCart";

import Nav from "./Navbar";
import { Cart } from "../cart/Cart";

export const Header = () => {
  const { isOpen } = useCartContext();
  const { data, isLoading, error } = useCart();

  return (
    <header className="bg-white">
      <Nav />
      {/* {isOpen && <Cart />} */}
    </header>
  );
};
