import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import { useCatalogProductsPage } from "./useCatalogProductsPage";
import CartIcon from "../../../../assets/icons/cart.svg?react";
import TopBar from "../../../../components/Layout/TobBar";
import Navbar from "../../../../components/Layout/Navbar";
import Loader from "../../../../components/Layout/Loader";
import { Search } from "lucide-react";
import { AnimatedButton } from "../../../../components/UI/AnimatedButton";
import MobileNavbar from "../../../../components/Layout/MobileNavbar";
import { Footer } from "../../../../components/Layout/Footer";
import { useState } from "react";
import { addToCart } from "../../../../features/cart/cart.service";
import type { ProductResponseDTO } from "../../../../features/product/product.model";
import { ProductAddedPopup } from "../../../../components/Layout/ProductAddedPopUp";

function convertSlug(slug: string) {
  return slug
    .toLowerCase()
    .replaceAll("-", " ")
    .split(" ")
    .map((word: string) => (word != "de" ? word.charAt(0).toUpperCase() + word.slice(1) : word))
    .join(" ");
}
export default function CatalogProductsPage() {
  const [filterList, setFilterList] = useState(false);
  const { productTypeSlug, producerSlug } = useParams();
  const navigate = useNavigate();

  const activeName = convertSlug(producerSlug ?? "Produtos");
  const productTypeName = convertSlug(productTypeSlug ?? "");
  const { products, models, modelSelected, loading, filterSearch, filterByModel, setFilterSearch } = useCatalogProductsPage({
    productTypeSlug: productTypeSlug ?? "",
    producerSlug: producerSlug,
  });

  const [showPopUp, setShowPopUp] = useState(false);

  function handleAddToCart(product: ProductResponseDTO) {
    addToCart(product);
    setShowPopUp(true);
  }

  return (
    <div className="bg-gray-50 h-full w-full">
      <div className="min-h-screen w-screen items-center flex flex-col mb-20">
        <div className="w-full">
          <TopBar />
          <MobileNavbar />
          <Navbar />
        </div>
        <div className="flex flex-col mt-5 mb-20 md:mb-0 h-full w-4/5 md:w-4/5">
          <div className="flex flex-col gap-3 md:gap-5">
            <div className="flex gap-2 text-sm md:text-xs 2xl:text-base text-gray-800">
              <span onClick={() => navigate("/")} className="cursor-pointer">
                Home
              </span>
              <span className="text-orange-400 font-medium cursor-default">/</span>
              <span
                onClick={() => {
                  if (producerSlug) navigate(`/catalogo/${productTypeSlug}/fabricantes`);
                }}
                className={producerSlug ? "cursor-pointer" : "cursor-default"}
              >
                {productTypeName}
              </span>
              <span className="text-orange-400 font-medium cursor-default">/</span>
              <span onClick={() => null} className="cursor-pointer">
                {activeName}
              </span>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-5 justify-between md:items-center justify-self-center">
              <h2 className="text-gray-700 w-fit text-2xl md:text-4xl 2xl:text-5xl relative font-medium after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-0.75 after:w-full after:bg-orange-400">
                {activeName}
              </h2>
              <div className="flex flex-row gap-2 md:gap-10">
                {models.length != 0 && (
                  <AnimatedButton
                    color="#6a7282"
                    colorHover="#4a5565"
                    colorDisabled="#d1d5dc"
                    content={
                      <>
                        Filtrar
                        <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                      </>
                    }
                    disabled={models.length === 0}
                    onClickFunction={() => setFilterList((prev) => !prev)}
                    adicionalStyle="2xl:px-4 2xl:py-2 px-3 py-1.5 text-white 2xl:text-base text-sm"
                  />
                )}
                {filterList && models.length != 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={products ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="divide-y absolute mt-11 w-fit z-100"
                  >
                    <ul className="bg-gray-700 rounded-lg text-white px-4 py-3 space-y-2 max-h-55 overflow-y-auto">
                      {models.map((obj) => (
                        <li key={obj.id} id={`${obj.id}`}>
                          <div className="flex gap-2 items-center rounded-lg px-1 py-1 hover:bg-gray-600">
                            <input
                              id={`${obj.id}`}
                              type="checkbox"
                              name="filter"
                              value={obj.id}
                              checked={modelSelected === obj.id}
                              onChange={() => filterByModel(obj.id)}
                            />
                            <label htmlFor={`${obj.id}`}>{obj.name}</label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
                <div className="bg-white relative flex items-center">
                  <Search className="size-3 md:size-5 absolute left-2 md:left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="filter-search"
                    id="filter-search"
                    placeholder="Pesquisar Produtos"
                    className="w-fit md:w-full text-[10px] md:text-[12px] 2xl:text-base pl-6 md:pl-10 pr-1 py-1.5 md:pr-3 md:py-2 outline-1 outline-gray-400 rounded-md md:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filterSearch}
                    onChange={(e) => setFilterSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          {loading && <Loader />}
          {!loading && (
            <>
              <div className={`mt-10 2xl:mt-15 w-4/5 self-center md:w-full flex flex-col gap-6 md:grid md:gap-4 sm:grid-cols-3 md:grid-cols-4`}>
                {products.map((obj) => (
                  <motion.div
                    className="bg-white cursor-pointer outline-1 outline-gray-300 w-full h-fit rounded-lg"
                    whileHover={{ scale: 1.025, transition: { duration: 0.2 } }}
                    onClick={() => {
                      if (obj.model) {
                        navigate(`${obj.name.replaceAll(" ", "-").toLowerCase()}/${obj.model.name.replaceAll(" ", "-").toLowerCase()}`);
                      } else {
                        navigate(`${obj.name.replaceAll(" ", "-").toLowerCase()}`);
                      }
                    }}
                  >
                    <div className="flex flex-col">
                      <img src={obj.url_image} alt="" className="px-2 pt-2 w-full 2xl:h-[200px] md:h-[165px] object-fill" />
                      <div className="flex items-center justify-between px-4 py-4 text-sm 2xl:text-lg font-medium">
                        <div>
                          <h4 className="text-gray-800">{obj.name}</h4>
                          {obj.model && <p className="text-gray-600 2xl:text-sm text-xs">Modelo: {obj.model.name}</p>}
                        </div>
                        <AnimatedButton
                          color="#ff8904"
                          colorHover="#f8741a"
                          content={<CartIcon className="text-xl" />}
                          disabled={false}
                          adicionalStyle="w-fit h-fit text 2xl:py-2 2xl:px-2.5 py-1.5 px-2 text-white z-30"
                          onClickFunction={(e) => {
                            e.stopPropagation();
                            handleAddToCart(obj);
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
        <ProductAddedPopup open={showPopUp} onClose={() => setShowPopUp(false)} />
      </div>
      <Footer />
    </div>
  );
}
