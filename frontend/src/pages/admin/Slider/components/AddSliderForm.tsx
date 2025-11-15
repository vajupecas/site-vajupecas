import { useState } from "react";
import { AnimatedButton } from "../../../../components/UI/AnimatedButton";

interface AddSliderImageFormProps {
  addSliderImage: Function;
  setAddSliderImageForm: Function;
  refreshSlider: Function;
}

export function AddSliderImageForm({ addSliderImage, setAddSliderImageForm, refreshSlider }: AddSliderImageFormProps) {
  const [sliderImageName, setSliderImageName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  async function handleAddSlider() {
    await addSliderImage(sliderImageName, file);
    setAddSliderImageForm(false);
    await refreshSlider();
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50" onClick={() => setAddSliderImageForm(false)}></div>
      <div className="z-50 flex flex-col gap-5 px-16 pb-3 absolute w-1/3 bg-gray-200 rounded-lg shadow-lg">
        <h3 className="text-center px-4 py-2 text-2xl bg-orange-500 w-fit self-center rounded-b-lg text-white">ADICIONAR IMAGEM CARROUSEL</h3>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-row gap-1.5 items-center">
              <label htmlFor="name">Nome</label>
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
              onClickFunction={() => setAddSliderImageForm(false)}
              adicionalStyle="w-24 px-4 py-2 text-white"
            />
            <AnimatedButton
              // Green
              color="#00c950"
              colorHover="#00a63e"
              colorDisabled="#7bf1a8"
              content={"Criar"}
              disabled={sliderImageName === "" || file === null}
              onClickFunction={() => handleAddSlider()}
              adicionalStyle="w-24 px-4 py-2 text-white"
            />
          </div>
        </div>
      </div>
    </>
  );
}
