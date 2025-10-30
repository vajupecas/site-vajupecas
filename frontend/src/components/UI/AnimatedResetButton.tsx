import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedResetButtonProps {
  content: ReactNode;
  onClickFunction: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  adicionalStyle?: string;
}

export function AnimatedResetButton({ content, onClickFunction, adicionalStyle }: AnimatedResetButtonProps) {
  return (
    <motion.button
      type="button"
      animate={{ rotate: 0 }}
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.8 }}
      whileTap={{ scale: 0.9, transition: { duration: 0.2 } }}
      onClick={onClickFunction}
      className={`cursor-pointer flex flex-row items-center justify-center rounded-lg ${adicionalStyle ?? ""}`}
    >
      {content}
    </motion.button>
  );
}
