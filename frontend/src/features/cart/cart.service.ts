import type { ProductResponseDTO } from "../product/product.model";

import type { CartItem } from "./cart.model";

export function getCart(): CartItem[] {
  return JSON.parse(localStorage.getItem("cart") ?? "[]");
}

function saveCart(cart: any[]) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(produto: ProductResponseDTO) {
  let cart: CartItem[] = getCart();

  const index = cart.findIndex((item) => item.id === produto.id);

  if (index >= 0) {
    cart[index].quantity += 1;
  } else {
    cart.push({ ...produto, quantity: 1 });
  }

  saveCart(cart);
}

export function decreaseQuantity(id: number) {
  let cart: CartItem[] = getCart();

  cart = cart.map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item)).filter((item) => item.quantity > 0);

  saveCart(cart);
}

export function removeFromCartById(id: number) {
  let cart: CartItem[] = getCart();

  cart = cart.filter((item) => item.id !== id);

  saveCart(cart);
}
