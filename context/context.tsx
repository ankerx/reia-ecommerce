import { ReactNode, createContext, useReducer, useContext, useMemo, useState } from "react";

type CartProviderProps = { readonly children: React.ReactNode };
type CartContextType = { isOpen: boolean; toggleMenu: () => void };
export const CartStateContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <CartStateContext.Provider value={{ toggleMenu, isOpen }}>{children}</CartStateContext.Provider>
  );
};
