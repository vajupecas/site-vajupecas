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

export default function Sidebar() {
  const [productTypes, setProductTypes] = useState<ProductTypeResponseDTO[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setProductTypes(await getProductTypes());
    };
    fetchData();
  }, []);

  return (
    <aside className="z-50 sm:flex px-10 py-5 gap-15 bg-gray-50 hidden items-end flex-col w-1/4 shadow-xl">
      <div>
        <NavLink to={"/"} className="block w-fit">
          <img src={SiteLogo} className="w-35 2xl:w-40" alt="" />
        </NavLink>
      </div>
      <nav>
        <div className="flex flex-col gap-7 2xl:gap-9 text-lg 2xl:text-xl text-gray-800 items-end">
          <NavbarLink
            to="/"
            content={
              <div className="flex items-center gap-2">
                <HomeIcon />
                Home
              </div>
            }
            color="#ff8904"
          />
          <NavbarLink
            to="/sobre"
            content={
              <div className="flex items-center gap-2">
                <AboutIcon />
                Sobre
              </div>
            }
            color="#ff8904"
          />
          <NavbarLink
            to="/servicos"
            content={
              <div className="flex items-center gap-2">
                <ToolIcon />
                Serviços
              </div>
            }
            color="#ff8904"
          />
          <AnimatedLinkDropdownSidebar
            content={
              <div className="flex items-center gap-2">
                <CatalogIcon />
                Catálogo
              </div>
            }
            color="#ff8904"
            colorDropdown="#364153"
            dropdownContent={productTypes}
          />
          <NavbarLink
            to="/contato"
            content={
              <div className="flex items-center gap-2">
                <ContactIcon />
                Contato
              </div>
            }
            color="#ff8904"
            adicionalStyle="transition-all duration-300"
          />
        </div>
      </nav>
    </aside>
  );
}
