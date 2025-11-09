import { Home, Package, PackageOpen, Boxes, FileBox, User, Text, Wrench, Images } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SiteLogo from "../../../public/logo/logo.png";
import { motion } from "framer-motion";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path: string;
};

const ADMIN_PATH = import.meta.env.VITE_ADMIN_PATH || "/admin";

const navItems: NavItem[] = [
  { name: "Home", icon: <Home className="2xl:w-5 lg:w-4" />, path: `/${ADMIN_PATH}/home` },
  { name: "Famílias", icon: <Boxes className="2xl:w-5 lg:w-4" />, path: `/${ADMIN_PATH}/familias` },
  { name: "Modelos", icon: <FileBox className="2xl:w-5 lg:w-4" />, path: `/${ADMIN_PATH}/modelos` },
  { name: "Fabricantes", icon: <Package className="2xl:w-5 lg:w-4" />, path: `/${ADMIN_PATH}/fabricantes` },
  { name: "Produtos", icon: <PackageOpen className="2xl:w-5 lg:w-4" />, path: `/${ADMIN_PATH}/produtos` },
  { name: "Serviços", icon: <Wrench className="2xl:w-5 lg:w-4" />, path: `/${ADMIN_PATH}/servicos` },
  { name: "Textos", icon: <Text className="2xl:w-5 lg:w-4" />, path: `/${ADMIN_PATH}/textos` },
  { name: "Imagens", icon: <Images className="2xl:w-5 lg:w-4" />, path: `/${ADMIN_PATH}/imagens-carrosel` },
  { name: "Clientes", icon: <User className="2xl:w-5 lg:w-4" />, path: `/${ADMIN_PATH}/clientes` },
];

export default function AdminNavbar() {
  const navigate = useNavigate();

  return (
    <>
      <aside className="z-50 bg-gray-300 2xl:w-70 lg:w-56 flex flex-col shadow-lg">
        <div>
          <img src={SiteLogo} className="2xl:w-30 lg:w-26 justify-self-center mt-2" alt="" />
        </div>
        <div>
          <h1 className="cursor-default p-4 2xl:text-base lg:text-sm font-bold">PAINEL DE ADMINISTRADOR</h1>
        </div>

        <nav className="flex-1 px-4 2xl:space-y-3 lg:space-y-2">
          {navItems.map((item) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              key={item.name}
              onClick={() => navigate(item.path)}
              className="flex cursor-pointer items-center 2xl:text-base lg:text-sm gap-3 w-full px-3 py-2 rounded-lg hover:bg-orange-300 transition-colors"
            >
              {item.icon}
              <span>{item.name}</span>
            </motion.button>
          ))}
        </nav>
      </aside>
    </>
  );
}
