import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import { useCatalogProductsPage } from "./useCatalogProductsPage";
import DollarSignIcon from "../../../../assets/icons/dollar-sign.svg?react";
import TopBar from "../../../../components/Layout/TobBar";
import Navbar from "../../../../components/Layout/Navbar";
import Loader from "../../../../components/Layout/Loader";
import { Search } from "lucide-react";
import { AnimatedButton } from "../../../../components/UI/AnimatedButton";
import MobileNavbar from "../../../../components/Layout/MobileNavbar";
import { Footer } from "../../../../components/Layout/Footer";

function convertSlug(slug: string) {
  return slug
    .toLowerCase()
    .replaceAll("-", " ")
    .split(" ")
    .map((word: string) => (word != "de" ? word.charAt(0).toUpperCase() + word.slice(1) : word))
    .join(" ");
}

export default function CatalogProductsPage() {
  const { productTypeSlug, producerSlug } = useParams();
  const producerName = convertSlug(producerSlug ?? "");
  const productTypeName = convertSlug(productTypeSlug ?? "");
  const navigate = useNavigate();
  const { products, loading, filterSearch, setFilterSearch } = useCatalogProductsPage(producerSlug ?? "");

  return (
    <div className="bg-gray-50 h-full w-full">
      <div className="min-h-screen w-screen items-center flex flex-col">
        <div className="w-full">
          <TopBar />
          <MobileNavbar />
          <Navbar />
        </div>
        <div className="flex flex-col mt-5 mb-20 md:mb-0 h-full w-4/5 md:w-3/4">
          <div className="flex flex-col gap-3 md:gap-5">
            <div className="flex gap-2 text-sm md:text-base text-gray-800">
              <span onClick={() => navigate("/")} className="cursor-pointer">
                Home
              </span>
              <span className="text-orange-400 font-medium cursor-default">/</span>
              <span onClick={() => (producerName != "Produtos" ? navigate(`/catalogo/${productTypeSlug}`) : {})} className="cursor-pointer">
                {productTypeName}
              </span>
              <span className="text-orange-400 font-medium cursor-default">/</span>
              <span onClick={() => null} className="cursor-pointer">
                {producerName}
              </span>
            </div>
            <div className="w-full flex justify-between items-center justify-self-center">
              <h2 className="text-gray-700 text-2xl md:text-5xl relative font-medium after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-0.75 after:w-full after:bg-orange-400">
                {producerName}
              </h2>
              <div className="bg-white relative flex items-center">
                <Search className="size-3 md:size-5 absolute left-2 md:left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="filter-search"
                  id="filter-search"
                  placeholder="Pesquisar Produtos"
                  className="w-fit md:w-full text-[10px] md:text-base pl-6 md:pl-10 pr-1 py-1.5 md:pr-3 md:py-2 outline-1 outline-gray-400 rounded-md md:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filterSearch}
                  onChange={(e) => setFilterSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
          {loading && <Loader />}
          {!loading && (
            <>
              <div className={`mt-15 w-full flex flex-col gap-6 md:grid md:gap-4 sm:grid-cols-3 2xl:grid-cols-4`}>
                {products.map((obj) => (
                  <motion.button
                    className="bg-white cursor-pointer outline-1 outline-gray-300 w-full h-fit rounded-lg"
                    whileHover={{ scale: 1.025, transition: { duration: 0.2 } }}
                    onClick={() => navigate(`${obj.name.replaceAll(" ", "-").toLowerCase()}`)}
                  >
                    <div className="flex flex-col">
                      <img src={obj.url_image} alt="" className="px-2 pt-2 w-full h-[200px] object-fill" />
                      <div className="flex items-center justify-between px-4 py-4 text-lg font-medium">
                        <h4 className="text-gray-800">{obj.name}</h4>
                        <AnimatedButton
                          color="#ff8904"
                          colorHover="#f8741a"
                          content={<DollarSignIcon className="text-xl" />}
                          disabled={false}
                          adicionalStyle="w-fit h-fit text py-1.5 px-2 text-white"
                          onClickFunction={() => navigate(`/${obj.name.replaceAll(" ", "-").toLowerCase()}`)}
                        />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
