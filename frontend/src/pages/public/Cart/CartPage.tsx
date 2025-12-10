import MobileNavbar from "../../../components/Layout/MobileNavbar";
import TopBar from "../../../components/Layout/TobBar";
import { Footer } from "../../../components/Layout/Footer";
import Navbar from "../../../components/Layout/Navbar";
import { useCartPage } from "./useCartPage";
import { AnimatedButton } from "../../../components/UI/AnimatedButton";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import type { CartItem } from "../../../features/cart/cart.model";

function finalizarCompra(cart: CartItem[]) {
  const phone = "5548992067057";
  const mensagem = cart.map((item) => `• ${item.quantity}x - ${item.name}${item.model ? ` (${item.model.name})` : ""}`).join("\n");

  const texto = encodeURIComponent(`Olá! Gostaria de ver o orçamento para compra dos seguintes itens:\n\n${mensagem}`);

  window.open(`https://wa.me/${phone}?text=${texto}`, "_blank");
}

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, addProductToCart, removeProductCart, decreaseQuantityProduct } = useCartPage();
  return (
    <div className="h-full w-full">
      <div className="min-h-screen h-full w-screen bg-gray-50 flex flex-col overflow-x-hidden">
        <div className="flex flex-col mb-20 md:mb-50 items-center">
          <TopBar />
          <MobileNavbar />
          <Navbar />
          <div className="flex flex-col items-center mt-2 md:mt-5 pb-5 md:w-4/6 gap-5 overflow-hidden justify-center">
            <div className="overflow-hidden p-5">
              <h3 className="text-gray-700 w-fit text-4xl 2xl:text-5xl font-semibold relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.75 after:w-full after:bg-orange-400">
                Carrinho
              </h3>
            </div>
            <div className="w-full md:w-5/6 2xl:w-4/6 flex flex-col gap-4 px-5">
              {cart.length === 0 && (
                <>
                  <div className="mt-5 flex flex-col gap-5">
                    <p className="text-gray-700 text-center text-2xl">Seu carrinho está vazio.</p>{" "}
                    <p className="text-center text-gray-700">Navegue pelo catálogo e selecione os produtos que desejar.</p>
                  </div>
                  <AnimatedButton
                    color="#ff8904"
                    colorHover="#ff8904"
                    content={<span>Voltar para o site</span>}
                    adicionalStyle="w-fit px-3 py-1 outline-2 outline-orange-500 text-white self-center text-xl mt-10"
                    onClickFunction={() => navigate("/")}
                  ></AnimatedButton>
                </>
              )}

              {cart.map((item) => (
                <div key={item.id} className="bg-white h-[125px] md:h-fit shadow-md rounded-lg px-2 md:px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center md:gap-4 gap-3">
                    <div className="rounded-xl">
                      <img src={item.url_image} alt={item.name} className="w-25 h-25object-contain" />
                    </div>
                    <div className="w-fit">
                      <h4 className="text-gray-800 font-medium w-fit">{item.name}</h4>
                      {item.model && <p className="text-gray-600 text-sm w-fit">Modelo: {item.model.name}</p>}
                    </div>
                  </div>

                  <div className="flex md:flex-row flex-col items-center gap-3">
                    <div className="flex gap-2">
                      <motion.button
                        whileTap={{ scale: 0.9, transition: { duration: 0.2 } }}
                        onClick={() => decreaseQuantityProduct(item.id)}
                        className="px-2 text-xl font-bold cursor-pointer"
                      >
                        -
                      </motion.button>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded">{item.quantity}</span>
                      <motion.button
                        whileTap={{ scale: 0.9, transition: { duration: 0.2 } }}
                        onClick={() => addProductToCart(item)}
                        className="px-2 text-xl font-bold cursor-pointer"
                      >
                        +
                      </motion.button>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.025, transition: { duration: 0.2 } }}
                      onClick={() => removeProductCart(item.id)}
                      className="text-red-500 md:ml-4 cursor-pointer"
                    >
                      Remover
                    </motion.button>
                  </div>
                </div>
              ))}

              {cart.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.025, transition: { duration: 0.2 } }}
                  onClick={() => finalizarCompra(cart)}
                  className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg cursor-pointer"
                >
                  Finalizar pedido via WhatsApp
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
