import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedButtonProps {
  content: ReactNode;
  onClickFunction?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  color: string;
  colorHover: string;
  colorDisabled?: string;
  disabled?: boolean;
  adicionalStyle?: string;
}

export function AnimatedButton({
  content,
  onClickFunction,
  color,
  colorHover,
  colorDisabled = "transparent",
  disabled = false,
  adicionalStyle,
}: AnimatedButtonProps) {
  return (
    <motion.button
      type="button"
      whileHover={disabled ? {} : { scale: 1.025, transition: { duration: 0.2 } }}
      whileTap={disabled ? {} : { scale: 0.9, transition: { duration: 0.2 } }}
      onClick={onClickFunction}
      className={`cursor-pointer flex flex-row items-center justify-center rounded-lg
    bg-[var(--bg)] hover:bg-[var(--hover-bg)] disabled:bg-[var(--disabled-bg)] disabled:text-gray-100 disabled:cursor-default
    ${adicionalStyle ?? ""}`}
      style={{
        ["--bg" as any]: color,
        ["--hover-bg" as any]: colorHover,
        ["--disabled-bg" as any]: colorDisabled,
      }}
      disabled={disabled}
    >
      {content}
    </motion.button>
  );
}
