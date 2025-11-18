import { useNavigate, useParams } from "react-router";
import { useCatalogProductPage } from "./useCatalogProductPage";
import DollarSignIcon from "../../../../assets/icons/dollar-sign.svg?react";
import TopBar from "../../../../components/Layout/TobBar";
import Navbar from "../../../../components/Layout/Navbar";
import Loader from "../../../../components/Layout/Loader";
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

function WhatsAppLink(productName: string) {
  const phone = "5548992067057";
  const message = `Olá! Gostaria de ter um orçamento do ${productName}.`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`;
  return whatsappLink;
}

export function formatDescription(text: string): string {
  if (!text) return "";
  if (!text.includes("•")) {
    return text;
  }
  const rawParts = text
    .split("•")
    .map((t) => t.trim())
    .filter((t) => t.length > 0);
  const title = rawParts.shift();
  const items = rawParts;
  return `
    <div>
      <div>${title}</div>
      <ul class="list-disc ml-4 marker:text-black">
        ${items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </div>
  `;
}

export default function CatalogProductPage() {
  const { productTypeSlug, producerSlug, productSlug } = useParams();
  const productName = convertSlug(productSlug ?? "");
  const activeName = convertSlug(producerSlug ?? "Produtos");
  const productTypeName = convertSlug(productTypeSlug ?? "");
  const navigate = useNavigate();
  const { product, loading } = useCatalogProductPage(productSlug ?? "");

  return (
    <div className="bg-gray-50 h-full w-full overflow-hidden">
      <div className="min-h-screen w-screen items-center flex flex-col">
        <div className="w-full">
          <TopBar />
          <MobileNavbar />
          <Navbar />
        </div>
        <div className="flex flex-col mt-5 mb-20 md:mb-0 h-full w-4/5 md:w-3/4">
          <div className="flex gap-2 text-sm md:text-xs 2xl:text-base text-gray-800">
            <span onClick={() => navigate("/")} className="cursor-pointer">
              Home
            </span>
            <span className="text-orange-400 font-medium cursor-default">/</span>
            <span
              onClick={() => {
                let path = `/catalogo/${productTypeSlug}`;
                if (producerSlug) {
                  path += `/fabricantes`;
                }
                navigate(path);
              }}
              className="cursor-pointer"
            >
              {productTypeName}
            </span>
            <span className="text-orange-400 font-medium cursor-default">/</span>
            <span
              onClick={() => {
                let path = `/catalogo/${productTypeSlug}`;
                if (producerSlug) {
                  path += `/fabricantes/${producerSlug}/produtos`;
                }
                navigate(path);
              }}
              className="cursor-pointer"
            >
              {activeName}
            </span>
            <span className="text-orange-400 font-medium cursor-default">/</span>
            <span onClick={() => null} className="cursor-pointer">
              {productName}
            </span>
          </div>
          {loading && <Loader />}
          {!loading && (
            <>
              <div className={`flex flex-col md:grid md:grid-cols-5 w-full h-fit gap-3 md:gap-8 md:mt-5 md:px-10 py-5 justify-self-center`}>
                <div className="bg-white rounded-xl not-last:h-fit col-span-3">
                  <img
                    src={product?.url_image}
                    alt=""
                    className="px-2 py-2 w-full h-[300px] md:h-[400px] 2xl:h-[450px] object-fill border-1 rounded-xl border-gray-400"
                  />
                </div>
                <div className="flex flex-col h-full w-full justify-between col-start-4 col-span-2 py-4 gap-7 md:gap-0">
                  <div className="flex flex-col gap-4 2xl:gap-6">
                    <h3 className="text-2xl 2xl:text-4xl font-medium">{product?.name}</h3>

                    <p className="text-md 2xl:text-lg text-justify">
                      <span className="font-semibold">Fabricante:</span> {product?.producer.name}
                    </p>

                    {product?.model && (
                      <p>
                        <span className="font-semibold">Modelo:</span> {product?.model.name}
                      </p>
                    )}

                    <div className="text-md 2xl:text-lg text-justify">
                      <span className="font-semibold">Descrição:</span>
                      <div className="text-sm" dangerouslySetInnerHTML={{ __html: formatDescription(product?.description ?? "") }} />
                    </div>
                  </div>
                  <div>
                    <AnimatedButton
                      color="#ff8904"
                      colorHover="#f8741a"
                      content={
                        <div className="flex gap-2 items-center">
                          <p className="text-lg 2xl:text-xl">Solicitar Orçamento</p>
                          <DollarSignIcon className="text-xl 2xl:text-3xl" />
                        </div>
                      }
                      disabled={false}
                      adicionalStyle="w-fit h-fit p-3 text-white"
                      onClickFunction={() => window.open(WhatsAppLink(productName), "_blank")}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
