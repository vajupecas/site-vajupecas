import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ScrollAnimationProps {
  children: React.ReactNode;
  from?: string;
  distance?: number;
  duration?: number;
}

export function ScrollAnimation({ children, from = "y", distance = 50, duration = 1 }: ScrollAnimationProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, [from]: distance }}
      animate={inView ? { opacity: 1, [from]: 0 } : {}}
      transition={{ duration: duration, ease: "easeOut" }}
      style={{ height: "100%", display: "flex", justifyContent: "center" }}
    >
      {children}
    </motion.div>
  );
}
