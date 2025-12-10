import { useEffect, useState } from "react";
import { getCart, removeFromCartById, decreaseQuantity, addToCart } from "../../../features/cart/cart.service";
import type { CartItem } from "../../../features/cart/cart.model";

export function useCartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    function fetchData() {
      const cartItems = getCart();
      console.log(cartItems);
      setCart(cartItems);
    }

    fetchData();
  }, []);

  const reloadCart = () => {
    setCart(getCart());
  };

  const addProductToCart = (product: CartItem) => {
    addToCart(product);
    reloadCart();
  };

  const removeProductCart = (id: number) => {
    removeFromCartById(id);
    reloadCart();
  };

  const decreaseQuantityProduct = (id: number) => {
    decreaseQuantity(id);
    reloadCart();
  };

  return { cart, addProductToCart, removeProductCart, decreaseQuantityProduct };
}
