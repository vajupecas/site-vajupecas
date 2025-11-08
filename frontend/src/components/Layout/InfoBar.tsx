import DiamondIcon from "../../assets/icons/diamond.svg?react";
import TargetIcon from "../../assets/icons/target.svg?react";
import EyeIcon from "../../assets/icons/eye.svg?react";
import { useTexts } from "../../contexts/TextContext";
import { motion } from "framer-motion";

export default function InfoBar() {
  const { findText } = useTexts();

  return (
    <div className="md:w-4/6 p-3 h-fit flex flex-col gap-12 text-white justify-self-center overflow-hidden">
      <div>
        <h3 className="text-center font-bold text-3xl 2xl:text-4xl">Nossos Princípios</h3>
      </div>
      <div className="w-full flex flex-col md:grid md:grid-cols-3 gap-10 2xl:gap-20 justify-self-center">
        <motion.div
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.9, transition: { duration: 0.2 } }}
          className="flex md:flex-col items-start gap-5 p-4 border-1 rounded-xl border-neutral-800 select-none"
        >
          <div className="flex py-4 px-4 border-5 border-orange-500 rounded-full">
            <TargetIcon className=" text-xl 2xl:text-2xl w-fit fill-orange-500" />
          </div>
          <div>
            <h4 className="font-semibold text-xl 2xl:text-2xl pb-2 md:pb-4">Missão</h4>
            <p className="font-medium text-xs 2xl:text-sm">{findText("Missão")}</p>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.9, transition: { duration: 0.2 } }}
          className="flex md:flex-col items-start gap-5 p-4 border-1 rounded-xl border-neutral-800 select-none"
        >
          <div className="flex items-center py-4 px-4 border-5 border-orange-500 rounded-full">
            <EyeIcon className="text-xl 2xl:text-2xl fill-orange-500" />
          </div>
          <div>
            <h4 className="font-semibold text-xl 2xl:text-2xl pb-2 md:pb-4">Visão</h4>
            <p className="font-medium text-xs 2xl:text-sm">{findText("Visão")}</p>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.9, transition: { duration: 0.2 } }}
          className="flex md:flex-col items-start gap-5 p-4 border-1 rounded-xl border-neutral-800 select-none"
        >
          <div className="flex justify-center items-center py-4 px-4 border-5 border-orange-500 rounded-full">
            <DiamondIcon className="text-xl 2xl:text-2xl fill-orange-500" />
          </div>
          <div>
            <h4 className="font-semibold text-xl 2xl:text-2xl pb-2 md:pb-4">Valores</h4>
            <p className="font-medium text-xs 2xl:text-sm">{findText("Valores")}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
