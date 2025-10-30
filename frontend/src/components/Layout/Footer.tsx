import { NavLink } from "react-router";
import InstagramIcon from "../../assets/icons/instagram.svg?react";
import LinkedinIcon from "../../assets/icons/linkedin.svg?react";
import FacebookIcon from "../../assets/icons/facebook.svg?react";
import TelephoneIcon from "../../assets/icons/telephone.svg?react";
import EmailIcon from "../../assets/icons/email.svg?react";
import SiteLogo from "../../assets/images/logos/logo.webp";
import { AnimatedLink } from "../UI/AnimatedLink";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="bg-black flex flex-col items-center justify-center shadow-xl">
      <div className="w-full py-6 flex flex-col items-center justify-center">
        <div className="w-full py-5 md:px-20 grid grid-cols-3 justify-center">
          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-3">
              <NavLink to={"/"} className="block w-fit">
                <img src={SiteLogo} className="w-20 md:w-32" alt="" />
              </NavLink>
              <span className="text-white text-center text-[10px] md:text-base font-semibold">Vaju Pecas de Bombas e Betoneiras Ltda</span>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex flex-col gap-5 text-white">
              <h5 className="text-xs md:text-2xl font-semibold">Entre em Contato</h5>
              <div className="flex flex-col gap-4 font-medium">
                <p className="flex text-[10px] md:text-base gap-2 items-center">
                  <TelephoneIcon />
                  (048) 99206-7057
                </p>
                <p className="flex text-[10px] md:text-base gap-2 items-center">
                  <EmailIcon />
                  valdecir@vajupecas.com.br
                </p>
                <p></p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex flex-col gap-5 text-white">
              <h5 className="text-xs md:text-2xl font-semibold">Redes Sociais</h5>
              <div className="flex flex-col gap-4 font-medium">
                <AnimatedLink
                  color="white"
                  content={
                    <p className="text-[10px] md:text-base flex gap-2 items-center">
                      <InstagramIcon /> @instagram
                    </p>
                  }
                  to="#"
                />
                <AnimatedLink
                  color="white"
                  content={
                    <p className="text-[10px] md:text-base flex gap-2 items-center">
                      <FacebookIcon /> facebook
                    </p>
                  }
                  to="#"
                />
                <AnimatedLink
                  color="white"
                  content={
                    <p className="text-xs md:text-base flex gap-2 items-center">
                      <LinkedinIcon /> linkedin
                    </p>
                  }
                  to="#"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-5 border-t-1 border-t-neutral-600">
        <div className="justify-self-center text-center">
          <span className="text-neutral-700 text-xs md:text-base">&copy; Copyright Vaju Pecas de Bombas e Betoneiras Ltda {year}</span>
        </div>
      </div>
    </div>
  );
}
