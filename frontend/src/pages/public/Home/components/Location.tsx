import PinIcon from "../../../../assets/icons/pin.svg?react";
import { useTexts } from "../../../../contexts/TextContext";

export default function LocationContainer() {
  const { findText } = useTexts();

  return (
    <div className="w-7/8 md:w-4/6 h-fit flex flex-col gap-10 text-gray-800 justify-self-center overflow-hidden">
      <div>
        <h3 className="text-center font-bold text-3xl md:text-4xl">Nossa Localização</h3>
      </div>
      <div className="w-full flex flex-col gap-10 items-center justify-center justify-self-center">
        <div className="flex items-center gap-5">
          <PinIcon className="text-2xl fill-orange-500" />
          <p className="text-sm md:text-xl">{findText("Localização")}</p>
        </div>
        <div className="md:w-3/5 w-full h-[300px] md:h-[450px] flex justify-center rounded-2xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d442.08999228650043!2d-48.612849466769994!3d-27.571200987235436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x952749b93f5cf7e9%3A0x381749958a56fa7d!2sR.%20Treze%20de%20Maio%2C%2050%20-%20Barreiros%2C%20S%C3%A3o%20Jos%C3%A9%20-%20SC%2C%2088110-035!5e0!3m2!1spt-BR!2sbr!4v1760299290892!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
