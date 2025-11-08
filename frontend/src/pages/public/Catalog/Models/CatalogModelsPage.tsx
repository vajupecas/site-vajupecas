import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import Navbar from "../../../../components/Layout/Navbar";
import TopBar from "../../../../components/Layout/TobBar";
import Loader from "../../../../components/Layout/Loader";
import MobileNavbar from "../../../../components/Layout/MobileNavbar";
import { Footer } from "../../../../components/Layout/Footer";
import { useCatalogModelsPage } from "./useCatalogModelsPage";

function convertSlug(slug: string) {
  return slug
    .toLowerCase()
    .replaceAll("-", " ")
    .split(" ")
    .map((word: string) => (word != "de" ? word.charAt(0).toUpperCase() + word.slice(1) : word))
    .join(" ");
}

export default function CatalogModelsPage() {
  const { productTypeSlug } = useParams();
  const productTypeName = convertSlug(productTypeSlug ?? "");
  const navigate = useNavigate();
  const { models, loading } = useCatalogModelsPage(productTypeSlug ?? "");

  return (
    <div className="bg-gray-50 h-full w-full">
      <div className="min-h-screen w-screen items-center flex flex-col overflow-x-hidden">
        <div className="w-full">
          <TopBar />
          <MobileNavbar />
          <Navbar />
        </div>
        <div className="flex flex-col mt-5 h-full w-4/5 md:w-3/4 items-center">
          <div className="w-full flex flex-col gap-3 md:gap-5">
            <div className="flex gap-2 text-sm 2xl:text-base text-gray-800">
              <span onClick={() => navigate("/")} className="cursor-pointer">
                Home
              </span>
              <span className="text-orange-400 font-medium cursor-default">/</span>
              <span onClick={() => navigate(`/catalogo/${productTypeSlug}/modelos`)} className="cursor-pointer">
                {productTypeName}
              </span>
            </div>
            <h2 className="text-gray-700 text-2xl md:text-3xl 2xl:text-5xl font-medium">
              Selecione o{" "}
              <span className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.75 after:w-full after:bg-orange-400">
                Modelo
              </span>
              :
            </h2>
          </div>
          {loading && <Loader />}
          {!loading && (
            <div
              className={`2xl:w-2/3 mt-10 mb-20 md:0 2xl:mt-15 flex flex-col md:grid gap-6 ${
                models.length === 1 ? "md:grid-cols-1" : models.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"
              }`}
            >
              {models.map((obj) => (
                <motion.button
                  key={obj.name}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  type="button"
                  onClick={() => navigate(`${obj.name.replaceAll(" ", "-").toLowerCase()}`)}
                  className="flex bg-white cursor-pointer select-none outline-1 outline-gray-400 rounded-lg items-center justify-center min-w-fit w-50 md:w-60 2xl:w-75 h-25 md:h-35 2xl:h-45"
                >
                  <h4 className="text-gray-700 text-xl md:text-2xl 2xl:text-3xl font-medium px-2">{obj.name}</h4>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
