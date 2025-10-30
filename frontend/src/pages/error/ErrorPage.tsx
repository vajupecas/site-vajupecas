import { motion } from "framer-motion";
import { useNavigate } from "react-router";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="h-dvh w-dvw flex items-center justify-center">
      <div className="mb-20 flex flex-col items-start justify-center gap-9 sm:m-0 ml-5">
        <div className="text-left">
          <h3 className="text-orange-500 font-bold sm:text-8xl text-5xl">Error 404</h3>
          <p className="font-semibold text-gray-800 sm:text-2xl text-xl mt-7">Ops! Página não encontrada</p>
          <p className="font-semibold text-gray-800 sm:text-2xl text-xl mt-3">
            Parece que você tentou acessar um endereço que não existe ou foi removido.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.9, transition: { duration: 0.2 } }}
          type="button"
          onClick={() => navigate("/")}
          className="bg-orange-500 text-xl font-semibold w-fit px-8 py-1 rounded-lg text-white cursor-pointer hover:bg-orange-600"
        >
          VOLTAR
        </motion.button>
      </div>
    </div>
  );
}
