import InstagramIcon from "../../assets/icons/instagram.svg?react";
import LinkedinIcon from "../../assets/icons/linkedin.svg?react";
import FacebookIcon from "../../assets/icons/facebook.svg?react";
import EmailIcon from "../../assets/icons/email.svg?react";
import { AnimatedLink } from "../UI/AnimatedLink";

export default function TopBar() {
  return (
    <div className=" flex flex-row gap-6 sm:gap-5 bg-orange-400 text-md 2xl:text-xl py-2 pr-8 sm:pr-12 justify-end w-full">
      <AnimatedLink color="white" content={<InstagramIcon />} to="#" />
      <AnimatedLink color="white" content={<FacebookIcon />} to="#" />
      <AnimatedLink color="white" content={<LinkedinIcon />} to="#" />
      <AnimatedLink color="white" content={<EmailIcon />} to="#" />
    </div>
  );
}
