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
            const listToRender = obj.has_producer ? obj.producer_list : null;
            return (
              <div
                onMouseEnter={() => setFocus(idx)}
                key={obj.name}
                className={`
                  pt-30
                  md:pt-42
                  flex
                  flex-col
                  text-white
                  h-full
                  flex-1
                  outline-1
                  outline-orange-100
                  overflow-hidden
                  transition-[flex-grow]
                  duration-450
                  ease-out
                  bg-cover
                  bg-center
                  bg-no-repeat
                  after:absolute after:inset-0
                after:bg-black/20
                  after:z-0
                `}
                style={{
                  flexGrow: window.innerWidth >= 768 ? (isFocused ? 2 : 0.5) : isFocused ? 2 : 0.25,
                  backgroundImage: `url(${obj.url_image})`,
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
                    z-10
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

                              if (obj.has_producer) {
                                navigate(`/catalogo/${objSlug}/${itemSlug}`);
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
                        if (obj.has_producer) {
                          navigate(`/catalogo/${slug}/fabricantes`);
                        } else if (obj.name === "Mangueiras Hidráulicas") {
                          navigate(`/catalogo/${slug}`);
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
        </div>
      </div>
    </>
  );
}
