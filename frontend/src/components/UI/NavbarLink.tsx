import { motion } from "framer-motion";
import { NavLink } from "react-router";

interface NavbarLinkProps {
  content: React.ReactNode;
  to: string;
  color?: string;
  hover?: boolean;
  adicionalStyle?: string;
}

export function NavbarLink({ content, to, color = "white", hover = false, adicionalStyle }: NavbarLinkProps) {
  return (
    <motion.div
      className="w-fit flex justify-self-center"
      whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.9, transition: { duration: 0.2 } }}
    >
      <NavLink
        to={to}
        className={({ isActive }) =>
          [
            "relative transition-all after:content-[''] after:block after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-[var(--after-bg)]",
            adicionalStyle ?? "",
            isActive || hover ? "after:w-full" : "",
          ].join(" ")
        }
        style={{
          ["--after-bg" as any]: color,
        }}
      >
        {content}
      </NavLink>
    </motion.div>
  );
}
