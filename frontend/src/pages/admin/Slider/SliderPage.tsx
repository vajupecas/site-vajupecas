import { useState } from "react";
import { Loader, Search } from "lucide-react";
import Alert from "../../../components/UI/Alert";
import AdminNavbar from "../../../components/Layout/AdminNavbar";
import type { SliderImage } from "../../../features/slider/slider.model";
import { useSliderPage } from "./useSliderPage";
import {} from "./components/AddSliderForm";
import { AddSliderImageForm } from "./components/AddSliderForm";
import { EditSliderImageForm } from "./components/EditSliderForm";
import { SliderTable } from "./components/SliderTable";
import { AnimatedButton } from "../../../components/UI/AnimatedButton";
import RemoveSliderImageForm from "./components/RemoveSliderForm";

export default function SliderImagePage() {
  const { slider, loading, addSliderImage, editSliderImage, refreshSlider, removeSliderImage, setFilterSearch, filterSearch } = useSliderPage();
  const [addSliderImageForm, setAddSliderImageForm] = useState(false);
  const [editSliderImageForm, setEditSliderImageForm] = useState(false);
  const [removeSliderImageForm, setRemoveSliderImageForm] = useState(false);
  const [sliderImageEdit, setSliderImageEdit] = useState<SliderImage | null>(null);
  const [sliderImageRemove, setSliderImageRemove] = useState<SliderImage | null>(null);

  const [alert, setAlert] = useState(false);
  const [alertColor, setAlertColor] = useState("");
  const [alertSliderImage, setAlertSliderImage] = useState("");
  const [alertIcon, setAlertIcon] = useState<React.ReactNode | null>(null);

  function resetAlert() {
    setAlert(false);
    setAlertColor("");
    setAlertSliderImage("");
    setAlertIcon(null);
  }

  return (
    <>
      <div className="h-screen w-screen flex">
        <AdminNavbar />
        <div className="flex-1 justify-self-center flex flex-col gap-14 2xl:mt-20 lg:mt-15 mx-12 mb-12 items-center">
          <h2 className="w-full 2xl:text-5xl lg:text-4xl text-center text-orange-500 font-semibold">IMAGENS CARROSEL</h2>
          <div className="2xl:w-1/2 xl:w-4/6 w-5/6 h-full">
            <div className="flex justify-between">
              <div className="flex gap-8">
                <AnimatedButton
                  color="#00c950"
                  colorHover="#00a63e"
                  colorDisabled="#7bf1a8"
                  content={"Adicionar"}
                  disabled={false}
                  onClickFunction={() => setAddSliderImageForm(true)}
                  adicionalStyle="2xl:px-4 2xl:py-2 px-3 text-white 2xl:text-base text-sm"
                />
              </div>
              <div className="relative flex items-center">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="filter-search"
                  id="filter-search"
                  placeholder="Pesquisar Imagens"
                  className="w-full 2xl:pl-10 2xl:pr-3 2xl:py-2 2xl:text-base pr-2 py-1.5 pl-9 text-sm outline-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filterSearch}
                  onChange={(e) => setFilterSearch(e.target.value)}
                />
              </div>
            </div>
            {slider.length === 0 && (
              <div className="self-center justify-self-center flex items-center h-full">
                {loading && <Loader className="mb-40 animate-spin" />}
                {!loading && <p className="text-white0 mb-40">Nenhuma Imagem Cadastrada</p>}
              </div>
            )}
            {slider.length != 0 && (
              <SliderTable
                sliderImages={slider}
                setEditSliderImageForm={setEditSliderImageForm}
                setSliderImageEdit={setSliderImageEdit}
                setSliderImageRemove={setSliderImageRemove}
                setRemoveSliderImageForm={setRemoveSliderImageForm}
              />
            )}
          </div>
          {addSliderImageForm && (
            <>
              <AddSliderImageForm addSliderImage={addSliderImage} refreshSlider={refreshSlider} setAddSliderImageForm={setAddSliderImageForm} />
            </>
          )}
          {editSliderImageForm && (
            <>
              <EditSliderImageForm
                editSliderImage={editSliderImage}
                refreshSlider={refreshSlider}
                setEditSliderImageForm={setEditSliderImageForm}
                setSliderImageEdit={setSliderImageEdit}
                sliderImage={sliderImageEdit}
              />
            </>
          )}
          {removeSliderImageForm && (
            <>
              <RemoveSliderImageForm
                removeSliderImage={removeSliderImage}
                refreshSlider={refreshSlider}
                setRemoveSliderImageForm={setRemoveSliderImageForm}
                setSliderImageRemove={setSliderImageRemove}
                sliderImageRemove={sliderImageRemove}
              />
            </>
          )}
        </div>
        {alert && <Alert color={alertColor} text={alertSliderImage} icon={alertIcon} onClose={() => resetAlert()} />}
      </div>
    </>
  );
}
