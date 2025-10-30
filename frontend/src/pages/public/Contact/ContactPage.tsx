import MobileNavbar from "../../../components/Layout/MobileNavbar";
import TopBar from "../../../components/Layout/TobBar";
import Loader from "../../../components/Layout/Loader";
import InstagramIcon from "../../../assets/icons/instagram.svg?react";
import LinkedinIcon from "../../../assets/icons/linkedin.svg?react";
import FacebookIcon from "../../../assets/icons/facebook.svg?react";
import PinIcon from "../../../assets/icons/pin.svg?react";
import { Footer } from "../../../components/Layout/Footer";
import { useTexts } from "../../../contexts/TextContext";
import Navbar from "../../../components/Layout/Navbar";
import { useState } from "react";
import { postClient } from "../../../features/client/client.service";
import PhoneInput from "react-phone-input-2";
import { AnimatedButton } from "../../../components/UI/AnimatedButton";
import { AnimatedLink } from "../../../components/UI/AnimatedLink";

export default function ContactPage() {
  const { findText, loadingTexts } = useTexts();

  const [clientName, setClientName] = useState("");
  const [clientNumber, setClientNumber] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  const infos = clientName != "" && clientNumber != "" && clientEmail != "";

  async function handlePostClient() {
    const data = {
      name: clientName,
      email: clientEmail,
      number: clientNumber,
    };

    setClientName("");
    setClientEmail("");
    setClientNumber("");

    await postClient(data);
  }

  return (
    <div className="h-full w-full">
      {loadingTexts && <Loader />}
      {!loadingTexts && (
        <div className="min-h-screen h-full w-screen bg-gray-50 flex flex-col overflow-x-hidden">
          <div className="flex flex-col mb-20 md:mb-50 items-center">
            <TopBar />
            <MobileNavbar />
            <Navbar />
            <div className="flex flex-col-reverse items-center md:grid md:grid-cols-5 mt-5 md:mt-20 md:w-4/6 gap-5 overflow-hidden justify-center">
              <div className="col-span-2 pl-5 flex flex-col h-full gap-15 overflow-hidden p-5">
                <div>
                  <div className="h-fit flex flex-col gap-10 text-gray-800 overflow-hidden">
                    <div>
                      <h3 className="text-left font-bold text-3xl">Nossa Localização</h3>
                    </div>
                    <div className="w-full flex flex-col gap-10">
                      <div className="flex items-center gap-5">
                        <PinIcon className="text-3xl fill-orange-500" />
                        <p className="text-xl">{findText("Localização")}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="h-fit flex flex-col gap-5 text-gray-800 overflow-hidden">
                    <div>
                      <h3 className="text-left font-bold text-3xl">Contato</h3>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <div className="flex items-center gap-5">
                        <p className="text-xl">(048) 99206-7057</p>
                      </div>
                      <div className="flex items-center gap-5">
                        <p className="text-xl">valdecir@vajupecas.com.br</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-8 text-3xl">
                  <span className="w-full text-left text-gray-800 font-bold">Siga-nos</span>
                  <div className="flex gap-8 w-full text-2xl">
                    <AnimatedLink color="#1e2939" content={<InstagramIcon />} to="#" />
                    <AnimatedLink color="#1e2939" content={<FacebookIcon />} to="#" />
                    <AnimatedLink color="#1e2939" content={<LinkedinIcon />} to="#" />
                  </div>
                </div>
              </div>
              <div className="w-7/8 md:w-4/5 col-span-3 flex gap-3 justify-self-center overflow-hidden rounded-2xl bg-neutral-950">
                <div className="flex flex-col items-center w-full h-full gap-5 md:gap-10 py-10 px-2 md:px-10 text-white">
                  <div>
                    <h4 className="font-semibold text-center text-xl md:text-2xl">ENTRE EM CONTATO CONOSCO</h4>
                  </div>
                  <div className="flex flex-col gap-12 md:w-1/2">
                    <div className="flex flex-col gap-7 w-full">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="name">Nome</label>
                        <input
                          className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-800 outline-1 outline-gray-200 placeholder:text-white0 focus:outline-2  focus:outline-orange-600 sm:text-sm/6"
                          id="name"
                          type="text"
                          onChange={(e) => setClientName(e.target.value)}
                          value={clientName}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email">Email</label>
                        <input
                          className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base orange-500 text-gray-800 outline-1 outline-gray-200 placeholder:text-white0 focus:outline-2 focus:outline-orange-600 sm:text-sm/6"
                          id="email"
                          type="email"
                          onChange={(e) => setClientEmail(e.target.value)}
                          value={clientEmail}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 text-gray-800">
                        <label className="text-white" htmlFor="tel">
                          Número
                        </label>
                        <PhoneInput
                          inputStyle={{ width: "100%" }}
                          placeholder="Digite seu telefone"
                          country={"br"}
                          onlyCountries={["br"]}
                          disableDropdown
                          countryCodeEditable={false}
                          value={clientNumber}
                          onChange={(phone) => setClientNumber(phone)}
                        />
                      </div>
                    </div>
                    <AnimatedButton
                      color="#ff6900"
                      colorHover="#ff6900"
                      colorDisabled="#ffd6a8"
                      content={"Enviar"}
                      disabled={!infos}
                      onClickFunction={() => handlePostClient()}
                      adicionalStyle="w-full px-4 py-2 text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
