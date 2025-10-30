import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import type { SliderImage } from "../../../../features/slider/slider.model";
import { AnimatedResetButton } from "../../../../components/UI/AnimatedResetButton";
import { AnimatedButton } from "../../../../components/UI/AnimatedButton";

interface EditSliderImageFormProps {
  sliderImage: SliderImage | null;
  editSliderImage: Function;
  setEditSliderImageForm: Function;
  setSliderImageEdit: Function;
  refreshSlider: Function;
}

export function EditSliderImageForm({
  sliderImage,
  editSliderImage,
  setEditSliderImageForm,
  setSliderImageEdit,
  refreshSlider,
}: EditSliderImageFormProps) {
  const [sliderImageName, setSliderImageName] = useState(sliderImage?.name);
  const [file, setFile] = useState<File | null>(null);
  const [enableEdit, setEnableEdit] = useState(false);

  useEffect(() => {
    if (sliderImageName !== sliderImage?.name || file !== null) {
      setEnableEdit(true);
    } else {
      setEnableEdit(false);
    }
  }, [sliderImageName, file]);

  function cancelEditSliderImage() {
    setEditSliderImageForm(false);
    setSliderImageEdit(null);
  }

  async function handleEditSliderImage() {
    await editSliderImage(sliderImage?.id, sliderImageName, setFile);
    setSliderImageEdit(null);
    setEditSliderImageForm(false);
    await refreshSlider();
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50" onClick={() => cancelEditSliderImage()}></div>
      <div className="z-50 flex flex-col gap-5 px-16 pb-3 absolute mt-26 w-1/3 bg-gray-200 rounded-lg shadow-lg">
        <h3 className="text-center px-4 py-2 text-2xl bg-orange-500 w-fit self-center rounded-b-lg text-white">EDITAR IMAGEM CARROUSEL</h3>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-row gap-1.5 items-center">
              <label htmlFor="name">Nome</label>
              <AnimatedResetButton
                content={<RotateCcw size={14} color="black" />}
                onClickFunction={() => setSliderImageName(sliderImage?.name ? sliderImage.name : "")}
              />
            </div>
            <input
              className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-200 placeholder:text-white0 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 00 sm:text-sm/6"
              id="name"
              type="text"
              onChange={(e) => setSliderImageName(e.target.value)}
              value={sliderImageName}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="" htmlFor="photo_input">
              Foto (Proporção 16:5)
            </label>
            <input
              className="block cursor-pointer w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-200"
              id="file_input"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            />
          </div>
          <div className="flex w-full justify-between mt-3">
            <AnimatedButton
              // Red
              color="#fb2c36"
              colorHover="#e7000b"
              colorDisabled="#ffa2a2"
              content={"Cancelar"}
              disabled={false}
              onClickFunction={() => cancelEditSliderImage()}
              adicionalStyle="w-24 px-4 py-2 text-white"
            />
            <AnimatedButton
              // Green
              color="#00c950"
              colorHover="#00a63e"
              colorDisabled="#7bf1a8"
              content={"Confirmar"}
              disabled={!enableEdit}
              onClickFunction={() => handleEditSliderImage()}
              adicionalStyle="w-24 px-4 py-2 text-white"
            />
          </div>
        </div>
      </div>
    </>
  );
}
