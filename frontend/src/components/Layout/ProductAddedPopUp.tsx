import { motion } from "framer-motion";
import { useNavigate } from "react-router";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ProductAddedPopup({ open, onClose }: Props) {
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm flex flex-col items-center text-center"
      >
        <h2 className="text-xl font-semibold text-gray-800">Produto adicionado!</h2>
        <p className="text-gray-600 mt-2">Deseja ir para o carrinho ou continuar no site?</p>

        <div className="flex gap-4 mt-6 w-full justify-center">
          <button
            className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium transition"
            onClick={() => navigate("/carrinho")}
          >
            Ir para o carrinho
          </button>

          <button className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-800 text-white font-medium transition" onClick={onClose}>
            Continuar
          </button>
        </div>
      </motion.div>
    </div>
  );
}
