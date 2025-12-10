import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { NavbarLink } from "../UI/NavbarLink";
import type { ProductTypeResponseDTO } from "../../features/product_type/productType.model";
import { getProductTypes } from "../../features/product_type/productType.service";
import SiteLogo from "../../assets/images/logos/logo.webp";
import HomeIcon from "../../assets/icons/house.svg?react";
import AboutIcon from "../../assets/icons/people.svg?react";
import CatalogIcon from "../../assets/icons/truck.svg?react";
import ContactIcon from "../../assets/icons/telephone.svg?react";
import ToolIcon from "../../assets/icons/tool.svg?react";
import CartIcon from "../../assets/icons/cart.svg?react";
import { AnimatedLinkDropdownNavbar } from "../UI/AnimatedLinkDropdownNavbar";

export default function Navbar() {
  const [productTypes, setProductTypes] = useState<ProductTypeResponseDTO[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setProductTypes(await getProductTypes());
    };
    fetchData();
  }, []);

  return (
    <div className="z-50 sm:flex hidden items-center text-black bg-white w-full shadow-sm">
      <div className="absolute w-fit mx-20">
        <NavLink to={"/"} className="block w-fit">
          <img src={SiteLogo} className="w-15 2xl:w-18" alt="" />
        </NavLink>
      </div>
      <nav className="flex flex-1 justify-center m-6 2xl:m-7">
        <div className="flex gap-12 text-md 2xl:text-lg text-gray-700 tems-center">
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
          <AnimatedLinkDropdownNavbar
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
          <NavbarLink
            to="/carrinho"
            content={
              <div className="flex items-center gap-2">
                <CartIcon />
                Carrinho
              </div>
            }
            color="#ff8904"
            adicionalStyle="transition-all duration-300"
          />
        </div>
      </nav>
    </div>
  );
}
