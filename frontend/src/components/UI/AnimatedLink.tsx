import { motion } from "framer-motion";
import { Link } from "react-router";
import type { ReactNode } from "react";

interface AnimatedButtonProps {
  content: ReactNode;
  to: string;
  color: string;
  target?: string;
  adicionalStyle?: string;
}

export function AnimatedLink({ content, to, color = "white", target, adicionalStyle }: AnimatedButtonProps) {
  const MotionLink = motion(Link);
  return (
    <MotionLink
      whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.9, transition: { duration: 0.2 } }}
      to={to}
      target={target ?? "_self"}
      className={`cursor-pointer flex flex-row rounded-lg ${adicionalStyle ?? ""}`}
      style={{ color: `${color}` }}
    >
      {content}
    </MotionLink>
  );
}
