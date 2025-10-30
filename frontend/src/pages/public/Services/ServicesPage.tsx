import { useServicesPage } from "./useServicesPage";
import TopBar from "../../../components/Layout/TobBar";
import Navbar from "../../../components/Layout/Navbar";
import Loader from "../../../components/Layout/Loader";
import DollarSignIcon from "../../../assets/icons/dollar-sign.svg?react";
import { AnimatedButton } from "../../../components/UI/AnimatedButton";
import MobileNavbar from "../../../components/Layout/MobileNavbar";
import { Footer } from "../../../components/Layout/Footer";

export default function ServicesPage() {
  const { services, loading } = useServicesPage();

  function WhatsAppLink(serviceName: string) {
    const phone = "5548992067057";
    const message = `Olá! Gostaria de saber mais sobre o serviço ${serviceName}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`;
    return whatsappLink;
  }

  return (
    <div className="bg-gray-50 h-full w-full">
      <div className="min-h-screen h-full w-screen items-center flex flex-col">
        <div className="w-full">
          <TopBar />
          <MobileNavbar />
          <Navbar />
        </div>
        <div className="flex flex-col mt-5 md:mt-10 h-full w-6/7 md:w-3/5 mb-20">
          {loading && <Loader />}
          {!loading && (
            <>
              <div className="w-full flex flex-col gap-10 md:gap-20 space-y-8">
                {services.map((obj, idx) => (
                  <div
                    key={idx}
                    className={`w-full flex flex-col md:flex-row ${
                      idx % 2 !== 0 ? "md:flex-row-reverse" : ""
                    } items-center md:items-start gap-6 md:justify-around rounded-lg`}
                  >
                    <div className="text-gray-700 flex items-center justify-center">
                      <div className="bg-gray-white outline-2 outline-gray-300 pb-4 md:w-150 gap-4 rounded-2xl flex flex-col text-center md:text-left">
                        <span className="px-5 py-4 border-b-6 border-orange-400 rounded-t-2xl text-2xl font-semibold">{obj.name}</span>
                        <div className="px-4 flex flex-col gap-10">
                          <p className="text-gray-600 font-medium text-md mt-2">{obj.description}</p>
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
                            onClickFunction={() => window.open(WhatsAppLink(obj.name), "_blank")}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-60 md:w-74 aspect-[4/5] overflow-hidden rounded-lg shadow-md">
                      <img src={obj.url_image} alt={obj.name} className="w-full h-full object-cover object-center" />
                    </div>
                  </div>
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
