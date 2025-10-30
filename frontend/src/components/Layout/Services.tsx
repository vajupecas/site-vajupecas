import DiamondIcon from "../../assets/icons/diamond.svg?react";
import TargetIcon from "../../assets/icons/target.svg?react";
import EyeIcon from "../../assets/icons/eye.svg?react";
import { useTexts } from "../../contexts/TextContext";

export default function InfoBar() {
  const { findText } = useTexts();

  return (
    <div className="w-4/6 h-fit flex flex-col gap-12 text-white justify-self-center overflow-hidden">
      <div>
        <h3 className="text-center font-bold text-4xl">Nossos Princípios</h3>
      </div>
      <div className="w-full grid grid-cols-3 gap-20 justify-self-center">
        <div className="flex flex-col items-start gap-5 p-3 border-1 rounded-xl border-neutral-800">
          <div className="flex py-5 px-5 border-5 border-orange-500 rounded-full">
            <TargetIcon className="text-3xl w-fit fill-orange-500" />
          </div>
          <div>
            <h4 className="font-semibold text-3xl pb-4">Missão</h4>
            <p className="font-medium">{findText("Missão")}</p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-5 p-3 border-1 rounded-xl border-neutral-800">
          <div className="flex items-center py-5 px-5 border-5 border-orange-500 rounded-full">
            <EyeIcon className="text-3xl fill-orange-500" />
          </div>
          <div>
            <h4 className="font-semibold text-3xl pb-4">Visão</h4>
            <p className="font-medium text-gray-200">{findText("Visão")}</p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-5 p-3 border-1 rounded-xl border-neutral-800">
          <div className="flex justify-center items-center py-3 px-3 border-5 border-orange-500 rounded-full">
            <DiamondIcon className="text-3xl fill-orange-500" />
          </div>
          <div>
            <h4 className="font-semibold text-3xl pb-4">Valores</h4>
            <p className="font-medium">{findText("Valores")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
