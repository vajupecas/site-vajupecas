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
  const lastIdx = productTypes.length;

  return (
    <>
      <div className="flex flex-1 flex-col select-none">
        <div className="flex flex-1 group">
          {productTypes.map((obj, idx) => {
            const isFocused = idx === focus;
            const listToRender = obj.has_product_model ? obj.product_model_list : obj.has_producer ? obj.producer_list : null;
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
                        ${
                          isFocused
                            ? "text-3xl md:text-4xl 2xl:text-5xl after:w-full"
                            : "text-2xl md:text-3xl 2xl:text-4xl opacity-50 after:w-0 after:opacity-0"
                        }
                      `}
                    >
                      {obj.name.toUpperCase()}
                    </h3>
                  </div>
                  {listToRender && (
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
                      <ul className="flex flex-col 2xl:gap-5 gap-2 list-disc font-medium marker:text-orange-400">
                        {listToRender.map((item) => (
                          <motion.button
                            type="button"
                            onClick={() => {
                              const objSlug = obj.name.replaceAll(/\s+/g, "-").toLowerCase();
                              const itemSlug = item.name.replaceAll(/\s+/g, "-").toLowerCase();

                              if (obj.has_product_model) {
                                navigate(`/catalogo/${objSlug}/modelos/${itemSlug}`);
                              } else if (obj.has_producer) {
                                navigate(`/catalogo/${objSlug}/fabricantes/${itemSlug}`);
                              }
                            }}
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
                            <li>{item.name}</li>
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
                      adicionalStyle="text-white w-fit text-md 2xl:text-base px-5 py-1 2xl:px-7 2xl:py-2 font-semibold"
                      onClickFunction={() => {
                        const slug = obj.name.replaceAll(/\s+/g, "-").toLowerCase();
                        if (obj.has_product_model) {
                          navigate(`/catalogo/${slug}/modelos`);
                        } else if (obj.has_producer) {
                          navigate(`/catalogo/${slug}/fabricantes`);
                        } else {
                          navigate(`/catalogo/${slug}/produtos`);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
          <div
            onMouseEnter={() => setFocus(lastIdx)}
            key={"Mangueria Hidráulica"}
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
              flexGrow: window.innerWidth >= 768 ? (lastIdx === focus ? 2 : 0.5) : lastIdx === focus ? 2 : 0.25,
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
                    ${lastIdx === focus ? "" : "justify-end"}
                  `}
            >
              <div
                className={`
                      flex
                      justify-center
                      ease-out
                      ${lastIdx === focus ? "" : "-rotate-180 [writing-mode:vertical-lr]"}
                      ${lastIdx === focus ? "mb-12" : "mb-2"}
                    `}
              >
                <h3
                  className={`
                        2xl:w-fit
                        w-min
                        font-semibold
                        cursor-default
                        relative
                        after:content-['']
                        after:absolute
                        after:left-0
                        after:-bottom-2
                        after:h-1
                        after:bg-orange-400
                        after:transition-[width]
                        after:duration-600
                        ${
                          lastIdx === focus
                            ? "text-3xl md:text-4xl 2xl:text-5xl after:w-full"
                            : "text-2xl md:text-3xl 2xl:text-4xl opacity-50 after:w-0 after:opacity-0"
                        }
                      `}
                >
                  MANGUEIRA HIDRÁULICA
                </h3>
              </div>
              <div
                className={`
                      flex
                      justify-center
                      ease-out
                      ${lastIdx === focus ? "opacity-100 max-h-screen mt-8" : "opacity-0 max-h-0 pointer-events-none overflow-hidden"}
                    `}
              >
                <AnimatedButton
                  color="#ff8904"
                  colorHover="#ff8904"
                  disabled={false}
                  content={"Mais"}
                  adicionalStyle="text-white w-fit text-md md:text-base px-5 py-1 md:px-7 md:py-2 font-semibold"
                  onClickFunction={() => navigate(`/mangueira-hidraulica`)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
