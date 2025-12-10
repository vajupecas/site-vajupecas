import MobileNavbar from "../../../components/Layout/MobileNavbar";
import TopBar from "../../../components/Layout/TobBar";
import Loader from "../../../components/Layout/Loader";
import { Footer } from "../../../components/Layout/Footer";
import InfoBar from "../../../components/Layout/InfoBar";
import { useTexts } from "../../../contexts/TextContext";
import Navbar from "../../../components/Layout/Navbar";
import Counter from "../../../components/UI/Counter";
import { motion } from "framer-motion";
import { ScrollAnimation } from "../../../components/UI/ScrollAnimation";

export default function AboutUsPage() {
  const { findText, loadingTexts } = useTexts();
  const year = new Date().getFullYear();

  return (
    <div className="h-full w-full">
      {loadingTexts && <Loader />}
      {!loadingTexts && (
        <div className="h-full w-screen bg-gray-50 flex flex-col overflow-x-hidden">
          <div className="flex flex-col mb-25 md:mb-50 items-center">
            <TopBar />
            <MobileNavbar />
            <Navbar />
            <div className="flex flex-col mt-5 md:mt-20 md:w-7/8 2xl:w-5/6 gap-10 items-center overflow-hidden">
              <div className="flex flex-col gap-10 md:grid md:grid-cols-2 md:grid-rows-1 md:gap-30">
                <div className="flex flex-col gap-10">
                  <h2 className="text-gray-700 w-fit text-4xl font-semibold relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.75 after:w-full after:bg-orange-400">
                    Sobre Nós
                  </h2>
                  <div className="flex flex-col gap-7 text-gray-800">
                    <p>{findText("Sobre - Parágrafo 1")}</p>
                    <p>{findText("Sobre - Parágrafo 2")}</p>
                  </div>
                </div>
                <div className="flex justify-center w-full">
                  <div className="grid p-3 grid-cols-2 grid-rows-2 gap-2 md:gap-10">
                    <ScrollAnimation from="x">
                      <motion.div
                        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 0.9, transition: { duration: 0.2 } }}
                        className="flex flex-col justify-center items-center px-4 md:px-10 border-1 border-gray-300 rounded-2xl"
                      >
                        <span className="text-2xl md:text-3xl font-bold text-orange-500">
                          <Counter target={year - 2020}></Counter>
                          <sup className="text-gray-800"> +</sup>
                        </span>
                        <span className="text-center text-sm font-medium">Anos de Atividade</span>
                      </motion.div>
                    </ScrollAnimation>
                    <ScrollAnimation from="x">
                      <motion.div
                        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 0.9, transition: { duration: 0.2 } }}
                        className="flex flex-col justify-center items-center px-4 md:px-10 border-1 border-gray-300 rounded-2xl"
                      >
                        <span className="text-2xl md:text-3xl font-bold text-orange-500">
                          <Counter target={Number(findText("Clientes Atendidos"))}></Counter>
                          <sup className="text-gray-800"> +</sup>
                        </span>
                        <span className="text-sm text-center font-medium">Clientes Atendidos</span>
                      </motion.div>
                    </ScrollAnimation>
                    <ScrollAnimation from="x">
                      <motion.div
                        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 0.9, transition: { duration: 0.2 } }}
                        className="flex flex-col w-full justify-center items-center px-4 md:px-10 border-1 border-gray-300 rounded-2xl"
                      >
                        <span className="text-2xl md:text-3xl font-bold text-orange-500">
                          <Counter target={Number(findText("Quantidade Produtos"))}></Counter>
                        </span>
                        <span className="text-sm font-medium">Produtos</span>
                      </motion.div>
                    </ScrollAnimation>
                    <ScrollAnimation from="x">
                      <motion.div
                        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 0.9, transition: { duration: 0.2 } }}
                        className="flex flex-col justify-center items-center px-4 md:px-10 border-1 border-gray-300 rounded-2xl"
                      >
                        <span className="text-2xl md:text-3xl font-bold text-orange-500">São José</span>
                        <span className="text-sm font-medium">Santa Catarina</span>
                      </motion.div>
                    </ScrollAnimation>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-neutral-950 flex pt-10 pb-30 flex-col gap-25 items-center">
            <InfoBar />
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}
