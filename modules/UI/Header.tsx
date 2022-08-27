import { Logo } from "./Logo";
import { ShoppingBagIcon } from "@heroicons/react/outline";
import { useCartContext } from "../../context/useCartContext";
import { useCart } from "../../core/hooks/useCart";
import { LoadingSpinner } from "./LoadingSpinner";
export const Header = () => {
  const { toggleMenu, isOpen } = useCartContext();
  const { data, isLoading, error } = useCart();

  // if (isLoading) return <LoadingSpinner />;

  if (error) return <p>'An error has occurred:{error.message}'</p>;

  return (
    <header className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <Logo />
          <div className="relative flex items-center justify-end md:flex-1">
            <button onClick={toggleMenu}>
              <ShoppingBagIcon className="text-black w-12 h-12" />
            </button>
            <div className="rounded-full border-2 border-black bg-black text-white flex items-center justify-center p-2 absolute right-7">
              <span className="absolute">{data?.total_items}</span>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
