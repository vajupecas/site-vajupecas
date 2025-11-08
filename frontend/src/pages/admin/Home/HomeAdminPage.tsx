import { Package, PackageOpen, Boxes, FileBox, Text, User, Wrench, Images } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../../components/Layout/AdminNavbar";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path: string;
  description: string;
};

const ADMIN_PATH = import.meta.env.VITE_ADMIN_PATH || "/admin";

const navItems: NavItem[] = [
  {
    name: "Famílias",
    icon: <Boxes size={50} color="white" />,
    path: `/${ADMIN_PATH}/familias`,
    description: "Adicionar, Editar ou Apagar Famílias",
  },
  {
    name: "Modelos",
    icon: <FileBox size={50} color="white" />,
    path: `/${ADMIN_PATH}/modelos`,
    description: "Adicionar, Editar ou Apagar Modelos",
  },
  {
    name: "Fabricantes",
    icon: <Package size={50} color="white" />,
    path: `/${ADMIN_PATH}/fabricantes`,
    description: "Adicionar, Editar ou Apagar Fabricantes",
  },
  {
    name: "Produtos",
    icon: <PackageOpen size={50} color="white" />,
    path: `/${ADMIN_PATH}/produtos`,
    description: "Adicionar, Editar ou Apagar Produtos",
  },
  {
    name: "Serviços",
    icon: <Wrench size={50} color="white" />,
    path: `/${ADMIN_PATH}/servicos`,
    description: "Adicionar, Editar ou Apagar Serviços",
  },
  {
    name: "Textos",
    icon: <Text size={50} color="white" />,
    path: `/${ADMIN_PATH}/textos`,
    description: "Adicionar e Editar Textos",
  },
  {
    name: "Imagens",
    icon: <Images size={50} color="white" />,
    path: `/${ADMIN_PATH}/imagens-carrosel`,
    description: "Adicionar, Editar ou Remover Imagens do Carrousel",
  },
  {
    name: "Clients",
    icon: <User size={50} color="white" />,
    path: `/${ADMIN_PATH}/clientes`,
    description: "Visualizar Clientes",
  },
];

export default function HomeAdminPage() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <>
      <div className="h-screen w-screen flex">
        <AdminNavbar />
        <div className="flex-1 justify-self-center flex flex-col gap-14 2xl:mt-20 lg:mt-15 mx-12 mb-12 items-center">
          <div className="w-full ">
            <h2 className="w-full 2xl:text-5xl lg:text-4xl text-center text-orange-500 font-semibold">EDIÇÃO DO SITE</h2>
          </div>
          <div className="grid grid-cols-2 2xl:gap-x-8 lg:gap-x-6 gap-y-3">
            {navItems.map((item) => (
              <motion.button
                ref={ref}
                whileHover={{ scale: 1.025, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.9, transition: { duration: 0.2 } }}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: "easeOut" }}
                key={item.name}
                onClick={() => navigate(item.path)}
                className="flex cursor-pointer items-center gap-3 w-full 2xl:px-12 lg:px-8 2xl:py-5 lg:py-3 rounded-xl bg-orange-400 hover:bg-orange-500 shadow-lg"
              >
                <div className="flex flex-col 2xl:gap-5 lg:gap-4">
                  <div className="flex gap-3 w-full items-center">
                    {item.icon}
                    <span className="2xl:text-4xl lg:text-3xl text-white">{item.name}</span>
                  </div>
                  <p className="text-white text-left">{item.description}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
