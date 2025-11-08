import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { NavbarLink } from "../UI/NavbarLink";
import { AnimatedLinkDropdownSidebar } from "../UI/AnimatedLinkDropdownSidebar";
import type { ProductTypeResponseDTO } from "../../features/product_type/productType.model";
import { getProductTypes } from "../../features/product_type/productType.service";
import SiteLogo from "../../assets/images/logos/logo.webp";
import HomeIcon from "../../assets/icons/house.svg?react";
import AboutIcon from "../../assets/icons/people.svg?react";
import CatalogIcon from "../../assets/icons/truck.svg?react";
import ContactIcon from "../../assets/icons/telephone.svg?react";
import ToolIcon from "../../assets/icons/tool.svg?react";

export default function MobileNavbar() {
  const [productTypes, setProductTypes] = useState<ProductTypeResponseDTO[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setProductTypes(await getProductTypes());
    };
    fetchData();
  }, []);

  function toggleNavbar() {
    setOpen(!open);
  }

  return (
    <div className={`sm:hidden h-fit w-full flex items-center flex-col bg-white ${open ? "" : "shadow-sm"}`}>
      <div className="flex items-center justify-between w-full">
        <div className="mx-5">
          <NavLink to={"/"} className="block w-fit">
            <img src={SiteLogo} className="w-15" alt="" />
          </NavLink>
        </div>
        <button onClick={toggleNavbar} className="m-6 flex flex-col gap-1.5">
          <div className={`h-1 w-9 bg-orange-500 transition-transform duration-300 ${open ? "rotate-45 translate-y-2.5" : ""}`}></div>
          <div className={`h-1 w-9 bg-orange-500 transition-all duration-300 ${open ? "opacity-0" : "opacity-100"}`}></div>
          <div className={`h-1 w-9 bg-orange-500 transition-transform duration-300 ${open ? "-rotate-45 -translate-y-2.5" : ""}`}></div>
        </button>
      </div>
      <nav
        className={`transition-all flex justify-center duration-300 absolute z-50 top-25 w-full bg-white overflow-hidden
    ${open ? "max-h-[100vh] opacity-100 pb-10" : "max-h-0 opacity-0"}`}
      >
        <div className="flex items-center flex-col gap-6 text-lg w-fit text-gray-700">
          <NavbarLink
            to="/"
            content={
              <div className="flex w-full justify-center items-center gap-2">
                <HomeIcon />
                Home
              </div>
            }
            color="#ff8904"
          />
          <NavbarLink
            to="/sobre"
            content={
              <div className="flex w-full justify-center items-center gap-2">
                <AboutIcon />
                Sobre
              </div>
            }
            color="#ff8904"
          />
          <NavbarLink
            to="/servicos"
            content={
              <div className="flex w-full justify-center items-center gap-2">
                <ToolIcon />
                Serviços
              </div>
            }
            color="#ff8904"
          />
          <AnimatedLinkDropdownSidebar
            to="/catalogo"
            content={
              <div className="flex w-full justify-center items-center gap-2">
                <CatalogIcon />
                Catálogo
              </div>
            }
            color="#ff8904"
            colorDropdown="#364153"
            dropdownContent={productTypes}
            mobile={true}
          />
          <NavbarLink
            to="/contato"
            content={
              <div className="flex w-full justify-self-center items-center gap-2">
                <ContactIcon />
                Contato
              </div>
            }
            color="#ff8904"
            adicionalStyle="transition-all duration-300 justify-center"
          />
        </div>
      </nav>
    </div>
  );
}
