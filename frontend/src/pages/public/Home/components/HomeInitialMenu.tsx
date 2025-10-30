import type { ProductTypeResponseDTO } from "../../../../features/product_type/productType.model";
import { motion } from "framer-motion";
import { AnimatedButton } from "../../../../components/UI/AnimatedButton";
import { useNavigate } from "react-router";
import { useState } from "react";

interface HomeInitialMenuProps {
  productTypes: ProductTypeResponseDTO[];
}

export default function HomeInitialMenu({ productTypes }: HomeInitialMenuProps) {
  const navigate = useNavigate();
  const [focus, setFocus] = useState(0);

  return (
    <>
      <div className="flex flex-1 flex-col select-none">
        <div className="flex flex-1 group">
          {productTypes.map((obj, idx) => {
            const isFocused = idx === focus;

            return (
              <div
                onMouseEnter={() => setFocus(idx)}
                key={obj.name}
                className={`
                  pt-30
                  md:pt-42
                  flex
                  flex-col
                  bg-neutral-950
                  text-white
                  h-full
                  flex-1
                  outline-1
                  outline-orange-100
                  overflow-hidden
                  transition-[flex-grow]
                  duration-450
                  ease-out
                `}
                style={{
                  flexGrow: window.innerWidth >= 768 ? (isFocused ? 2 : 0.5) : isFocused ? 2 : 0.25,
                }}
              >
                <div
                  className={`
                    flex
                    flex-col
                    items-center
                    h-full
                    w-full
                    transition-all
                    duration-600
                    pb-1
                    ${isFocused ? "" : "justify-end"}
                  `}
                >
                  <div
                    className={`
                      flex
                      justify-center
                      ease-out
                      ${isFocused ? "" : "-rotate-180 [writing-mode:vertical-lr]"}
                      ${isFocused ? "mb-12" : "mb-2"}
                    `}
                  >
                    <h3
                      className={`
                        w-fit
                        font-semibold
                        cursor-default
                        relative
                        whitespace-nowrap
                        after:content-['']
                        after:absolute
                        after:left-0
                        after:-bottom-2
                        after:h-1
                        after:bg-orange-400
                        after:transition-[width]
                        after:duration-600
                        ${isFocused ? "text-3xl md:text-5xl after:w-full" : "text-2xl md:text-4xl opacity-50 after:w-0 after:opacity-0"}
                      `}
                    >
                      {obj.name}
                    </h3>
                  </div>
                  {obj.has_producer && (
                    <div
                      className={`
                        flex
                        flex-col
                        items-center
                        ease-out
                        cursor-default
                        gap-5
                        ${
                          isFocused ? "opacity-100 max-h-screen translate-y-0" : "opacity-0 max-h-0 translate-y-4 pointer-events-none overflow-hidden"
                        }
                      `}
                    >
                      <ul className="flex flex-col gap-5 list-disc font-medium marker:text-orange-400">
                        {obj.producer_list.map((producer) => (
                          <motion.button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/catalogo/${obj.name.replaceAll(/\s+/g, "-").toLowerCase()}/${producer.name.replaceAll(/\s+/g, "-").toLowerCase()}`
                              )
                            }
                            whileHover={{
                              scale: 1.1,
                              transition: { duration: 0.2 },
                            }}
                            whileTap={{
                              scale: 0.9,
                              transition: { duration: 0.2 },
                            }}
                            className="cursor-pointer text-lg md:text-2xl w-fit"
                          >
                            <li>{producer.name}</li>
                          </motion.button>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div
                    className={`
                      flex
                      justify-center
                      ease-out
                      ${isFocused ? "opacity-100 max-h-screen mt-8" : "opacity-0 max-h-0 pointer-events-none overflow-hidden"}
                    `}
                  >
                    <AnimatedButton
                      color="#ff8904"
                      colorHover="#ff8904"
                      disabled={false}
                      content={"Mais"}
                      adicionalStyle="text-white w-fit text-md md:text-base px-5 py-1 md:px-7 md:py-2 font-semibold"
                      onClickFunction={() =>
                        obj.has_producer
                          ? navigate(`/catalogo/${obj.name.replaceAll(/\s+/g, "-").toLowerCase()}`)
                          : navigate(`/catalogo/${obj.name.replaceAll(/\s+/g, "-").toLowerCase()}/produtos`)
                      }
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
