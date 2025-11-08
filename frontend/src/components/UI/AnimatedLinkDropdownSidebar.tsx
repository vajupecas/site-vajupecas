import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ProductTypeResponseDTO } from "../../features/product_type/productType.model";
import { AnimatedLink } from "./AnimatedLink";
import ArrowDownIcon from "../../assets/icons/arrow_down.svg?react";

interface AnimatedLinkDropdownProps {
  to: string;
  content: React.ReactNode;
  dropdownContent: ProductTypeResponseDTO[];
  color?: string;
  colorDropdown?: string;
  mobile?: boolean;
}

export function AnimatedLinkDropdownSidebar({
  content,
  dropdownContent,
  color = "white",
  colorDropdown = color,
  mobile = false,
}: AnimatedLinkDropdownProps) {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen((prev) => !prev);

  return (
    <div onClick={handleClick} className="flex flex-col group relative h-fit w-fit">
      <motion.div
        className="w-fit flex justify-self-center cursor-pointer"
        whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.9, transition: { duration: 0.2 } }}
      >
        <div className="flex items-center gap-1">
          <span
            className={`relative transition-all after:content-[''] after:block after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-[var(--after-bg)] ${
              open ? "after:w-full" : ""
            }`}
            style={{
              ["--after-bg" as any]: color,
            }}
          >
            {content}
          </span>
          <ArrowDownIcon className={`${mobile ? "text-xs" : "text-sm"}`} />
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
            className="w-full text-left text-lg"
          >
            {dropdownContent.map((obj, idx) => (
              <motion.li layout key={obj.name} className={`${idx == 0 ? "pt-6 pb-3" : "py-3"} ${mobile ? "text-xs" : "text-sm"}`}>
                <AnimatedLink
                  color={colorDropdown}
                  content={obj.name}
                  to={
                    obj.has_producer
                      ? `/catalogo/${obj.name.replaceAll(/\s+/g, "-").toLowerCase()}`
                      : `/catalogo/${obj.name.replaceAll(/\s+/g, "-").toLowerCase()}/produtos`
                  }
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
