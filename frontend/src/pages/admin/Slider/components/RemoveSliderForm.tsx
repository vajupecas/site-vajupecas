import { AnimatedButton } from "../../../../components/UI/AnimatedButton";
import type { SliderImage } from "../../../../features/slider/slider.model";

interface RemoveSliderImageFormProps {
  sliderImageRemove: SliderImage | null;
  removeSliderImage: Function;
  setSliderImageRemove: Function;
  setRemoveSliderImageForm: Function;
  refreshSlider: Function;
}

export default function RemoveSliderImageForm({
  sliderImageRemove,
  setSliderImageRemove,
  removeSliderImage,
  setRemoveSliderImageForm,
  refreshSlider,
}: RemoveSliderImageFormProps) {
  function cancelRemoveSliderImage() {
    setSliderImageRemove(null);
    setRemoveSliderImageForm(false);
  }

  async function handleRemoveSliderImage() {
    await removeSliderImage(sliderImageRemove?.id);
    setRemoveSliderImageForm(false);
    await refreshSlider();
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50" onClick={() => cancelRemoveSliderImage()}></div>
      <div className="z-50 flex flex-col gap-5 px-16 pb-3 absolute mt-41 w-1/4 h-3/10 bg-gray-200 rounded-lg shadow-lg">
        <h3 className="text-center px-4 py-2 text-2xl bg-orange-500 w-fit self-center rounded-b-lg text-white">REMOVER IMAGEM CARROUSEL</h3>
        <div className="flex flex-col gap-1 mt-2 font-semibold">
          <p className="text-gray-800 text-center text-lg">Você realmente quer remover a imagem?</p>
          <span className="text-gray-800 text-center text-xl">{sliderImageRemove?.name}?</span>
        </div>
        <div className="flex flex-col gap-3 h-full items-center">
          <div className="flex w-full justify-around mb-8 h-full items-center">
            <AnimatedButton
              // Red
              color="#fb2c36"
              colorHover="#e7000b"
              colorDisabled="#ffa2a2"
              content={"Cancelar"}
              disabled={false}
              onClickFunction={() => cancelRemoveSliderImage()}
              adicionalStyle="w-24 px-4 py-2 text-white"
            />
            <AnimatedButton
              // Green
              color="#00c950"
              colorHover="#00a63e"
              colorDisabled="#7bf1a8"
              content={"Confirmar"}
              disabled={false}
              onClickFunction={() => handleRemoveSliderImage()}
              adicionalStyle="w-24 px-4 py-2 text-white"
            />
          </div>
        </div>
      </div>
    </>
  );
}
