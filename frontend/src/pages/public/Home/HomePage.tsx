import { useHomePage } from "./useHomePage";
import HomeInitialMenu from "./components/HomeInitialMenu";
import Sidebar from "../../../components/Layout/Sidebar";
import MobileNavbar from "../../../components/Layout/MobileNavbar";
import TopBar from "../../../components/Layout/TobBar";
import Loader from "../../../components/Layout/Loader";
import Slider from "../../../components/Layout/Slider";
import { Footer } from "../../../components/Layout/Footer";
import Contact from "./components/Contact";
import InfoBar from "../../../components/Layout/InfoBar";
import LocationContainer from "./components/Location";

export default function HomePage() {
  const { productTypes, slideImages, loading } = useHomePage();

  return (
    <div className="h-full w-full">
      {loading && <Loader />}
      {!loading && (
        <div className="h-full w-screen bg-gray-50 flex flex-col overflow-x-hidden">
          <div className="h-screen flex flex-col">
            <TopBar />
            <div className="flex sm:flex-row flex-col flex-1 overflow-hidden">
              <MobileNavbar />
              <Sidebar />
              <HomeInitialMenu productTypes={productTypes} />
            </div>
          </div>
          <div className="flex bg-neutral-950 py-20 flex-col gap-20 md:gap-25 items-center">
            <InfoBar />
            <div className="w-full flex flex-col gap-10 items-center text-white">
              <h3 className="text-center font-bold text-3xl md:text-4xl">Promoções e Destaques</h3>
              <Slider slideImages={slideImages} />
            </div>
          </div>
          <div className="flex flex-col gap-20 md:gap-25 py-15 md:py-20 items-center">
            <Contact />
            <LocationContainer />
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}
