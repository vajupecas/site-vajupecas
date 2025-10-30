import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ProductTypeResponseDTO } from "../../features/product_type/productType.model";
import { AnimatedLink } from "./AnimatedLink";
import ArrowDownIcon from "../../assets/icons/arrow_down.svg?react";

interface AnimatedLinkDropdownProps {
  content: React.ReactNode;
  dropdownContent: ProductTypeResponseDTO[];
  color?: string;
  colorDropdown?: string;
  mobile?: boolean;
}

export function AnimatedLinkDropdownNavbar({ content, dropdownContent, color = "white", colorDropdown = color }: AnimatedLinkDropdownProps) {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen((prev) => !prev);
  const [hover, setHover] = useState(false);

  return (
    <div onClick={handleClick} className="flex flex-col group relative h-fit w-fit">
      <motion.div
        className="w-fit relative flex justify-self-center cursor-pointer"
        whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.9, transition: { duration: 0.2 } }}
      >
        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="flex items-center gap-1">
          <span
            className={`relative transition-all after:content-[''] after:block after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-[var(--after-bg)] ${
              open || hover ? "after:w-full" : ""
            }`}
            style={{
              ["--after-bg" as any]: color,
            }}
          >
            {content}
          </span>
          <ArrowDownIcon className="text-sm" />
        </div>
      </motion.div>
      <AnimatePresence>
        {open && (
          <motion.ul
            layout
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="z-50 absolute py-2 px-4 top-8 bg-gray-50 border-lg shadow-lg w-fit text-left overflow-hidden"
          >
            {dropdownContent.map((obj) => (
              <motion.li layout key={obj.name} className={`py-3 text-xs`}>
                <AnimatedLink
                  color={colorDropdown}
                  content={obj.name}
                  to={`/catalogo/${obj.name.replace(/\s+/g, "-").toLowerCase()}`}
                  adicionalStyle="w-fit"
                />
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
