import { ProductType } from "@/components/services/products";
import React, { useContext, useEffect } from "react";

type CartContextType = {
  cart: ProductType[];
  addProduct: (product: ProductType) => void;
  removeProduct: (productId: number) => void;
};

const CartContext = React.createContext<CartContextType>({} as CartContextType);

export const CartContextProvider = (props: { children: React.ReactNode }) => {
  const [cart, setCart] = React.useState<ProductType[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("shopping-cart");

    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const addProduct = (product: ProductType) => {
    const updatedCart = [...cart, product];
    localStorage.setItem("shopping-cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const removeProduct = (productId: number) => {
    const productIndex = cart.findIndex((product) => product.id === productId);

    if (productIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart.splice(productIndex, 1);
      localStorage.setItem("shopping-cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addProduct, removeProduct }}>
      {props.children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
