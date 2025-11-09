import whatsappIcon from "../../assets/icons/whatsapp-icon.png";
import { useState, useEffect } from "react";
import * as motion from "motion/react-client";

const WhatsApp = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <motion.div
        initial={{ x: "-100vw" }}
        animate={isLoaded ? { x: 0 } : { x: "-100vw" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ x: { duration: 2.5 }, scale: { duration: 0.25 } }}
        className="fixed z-50 bottom-4 right-4"
      >
        <a href="https://api.whatsapp.com/send?phone=5548992067057" target="blank">
          <img className="w-15 2xl:w-17" src={whatsappIcon} alt="WhatsApp Button" />
        </a>
      </motion.div>
    </>
  );
};

export default WhatsApp;
