import MobileNavbar from "../../../components/Layout/MobileNavbar";
import TopBar from "../../../components/Layout/TobBar";
import Loader from "../../../components/Layout/Loader";
import { Footer } from "../../../components/Layout/Footer";
import { useTexts } from "../../../contexts/TextContext";
import Navbar from "../../../components/Layout/Navbar";
import HydraulicHoseImage from "../../../assets/images/general/mangueira-hidraulica.jpg";
import { AnimatedButton } from "../../../components/UI/AnimatedButton";
import DollarSignIcon from "../../../assets/icons/dollar-sign.svg?react";

export default function HydraulicHosePage() {
  const { loadingTexts } = useTexts();

  function WhatsAppLink(serviceName: string) {
    const phone = "5548992067057";
    const message = `Olá! Gostaria de saber mais sobre as ${serviceName}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`;
    return whatsappLink;
  }

  return (
    <div className="h-full w-full">
      {loadingTexts && <Loader />}
      {!loadingTexts && (
        <div className="h-full w-screen bg-gray-50 flex flex-col overflow-x-hidden">
          <div className="flex min-h-screen flex-col mb-25 md:mb-10 items-center">
            <TopBar />
            <MobileNavbar />
            <Navbar />
            <div className="flex flex-col mt-5 md:mt-10 2xl:mt-20 w-5/6 gap-10 items-center overflow-hidden">
              <div className="flex flex-col-reverse justify-center items-center gap-10 md:flex-row md:gap-50">
                <div className="flex justify-center w-2/3 overflow-hidden rounded-lg shadow-md">
                  <img src={HydraulicHoseImage} alt="" />
                </div>
                <div className="flex flex-col gap-10">
                  <h2 className="text-gray-700 w-fit text-4xl md:text-3xl xl:text-4xl font-semibold relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.75 after:w-full after:bg-orange-400">
                    Mangueiras Hidráulicas
                  </h2>
                  <div className="flex flex-col gap-7 text-gray-800 md:text-sm 2xl:text-lg">
                    <p>
                      As mangueiras hidráulicas são fundamentais para o funcionamento seguro e eficiente de sistemas que operam sob alta pressão.
                      Desenvolvidas com tecnologia de ponta e materiais de excelente desempenho, garantem resistência, durabilidade e confiabilidade
                      mesmo nas aplicações mais exigentes.
                    </p>
                    <p>
                      Cada mangueira é projetada para oferecer máxima segurança contra vazamentos, rupturas e desgastes prematuros, assegurando que o
                      equipamento mantenha seu desempenho ideal por muito mais tempo. Essa qualidade se reflete diretamente na produtividade e na
                      tranquilidade de quem utiliza nossos produtos no dia a dia.
                    </p>
                    <p>
                      Com foco na praticidade e na eficiência, nossas mangueiras hidráulicas proporcionam uma montagem simples e segura, reduzindo
                      paradas e otimizando o tempo de trabalho. É a combinação perfeita entre robustez, segurança e praticidade.
                    </p>
                  </div>
                  <div>
                    <AnimatedButton
                      color="#ff8904"
                      colorHover="#f8741a"
                      content={
                        <div className="flex gap-2 items-center">
                          <p className="text-lg md:text-xl">Solicitar Orçamento</p>
                          <DollarSignIcon className="text-xl md:text-3xl" />
                        </div>
                      }
                      disabled={false}
                      adicionalStyle="w-fit h-fit text p-3 font-medium text-white"
                      onClickFunction={() => window.open(WhatsAppLink("Mangueiras Hidráulicas"), "_blank")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}
