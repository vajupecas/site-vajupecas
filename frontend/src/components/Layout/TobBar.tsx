import InstagramIcon from "../../assets/icons/instagram.svg?react";
import LinkedinIcon from "../../assets/icons/linkedin.svg?react";
import FacebookIcon from "../../assets/icons/facebook.svg?react";
import EmailIcon from "../../assets/icons/email.svg?react";
import { AnimatedLink } from "../UI/AnimatedLink";

export default function TopBar() {
  return (
    <div className="z-50 flex flex-row gap-6 sm:gap-5 bg-orange-400 text-md 2xl:text-xl py-2 pr-8 sm:pr-12 justify-end w-full">
      <AnimatedLink color="white" content={<InstagramIcon />} to="https://www.instagram.com/vaju_pecas/" target="blank" />
      <AnimatedLink
        color="white"
        content={<FacebookIcon />}
        to="https://www.facebook.com/p/Vaju-Pe%C3%A7as-de-Bombas-e-Betoneiras-100037942788609/"
        target="blank"
      />
      <AnimatedLink color="white" content={<LinkedinIcon />} to="https://www.linkedin.com/in/valdecir-geovani-arend-7598b760/" target="blank" />
      <AnimatedLink color="white" content={<EmailIcon />} to="emailto:valdecir@vajupecas.com.br" target="blank" />
    </div>
  );
}
