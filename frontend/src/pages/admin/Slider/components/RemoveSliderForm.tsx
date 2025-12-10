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
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm " onClick={() => cancelRemoveSliderImage()}></div>
      <div className="z-50 flex flex-col gap-5 2xl:px-3 pb-10 absolute xl:mt-41 mt-20 w-1/4 2xl:w-1/5 h-fit bg-gray-200 rounded-lg shadow-lg">
        <h3 className="text-center px-4 py-2 text-2xl bg-orange-500 w-fit self-center rounded-b-lg text-white">REMOVER IMAGEM</h3>
        <div className="flex flex-col gap-1 mt-2 font-medium">
          <p className="text-gray-600 text-center text-lg">Você realmente quer remover a imagem?</p>
          <span className="text-gray-800 text-center text-xl">{sliderImageRemove?.name}?</span>
        </div>
        <div className="flex flex-col gap-3 h-fit mt-3 items-center">
          <div className="flex w-full justify-center gap-10 h-full items-center">
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
