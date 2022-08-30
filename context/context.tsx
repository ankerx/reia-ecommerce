import { ReactNode, createContext, useReducer, useContext, useMemo, useState } from "react";

type CartProviderProps = { readonly children: React.ReactNode };
type CartContextType = { isOpen: boolean; toggleCart: () => void };
export const CartStateContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  return (
    <CartStateContext.Provider value={{ toggleCart, isOpen }}>{children}</CartStateContext.Provider>
  );
};
