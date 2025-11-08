import { useState } from "react";
import { Loader, Search } from "lucide-react";
import AdminNavbar from "../../../components/Layout/AdminNavbar";
import type { ProductModelResponseDTO } from "../../../features/product_model/productModels.model";
import Alert from "../../../components/UI/Alert";
import { motion } from "framer-motion";
import { AnimatedButton } from "../../../components/UI/AnimatedButton";
import { useProductModelPage } from "./useProductModelPage";
import AddProductModelForm from "./components/AddProductModelForm";
import EditProductModelForm from "./components/EditProductModelForm";
import RemoveProductModelForm from "./components/RemoveProductModelForm";
import ProductModelsTable from "./components/ProductModelTable";

export default function ProductModelsPage() {
  const {
    productModels,
    productTypes,
    loading,
    productTypeSelected,
    refreshProductModel,
    addProductModel,
    editProductModel,
    removeProductModel,
    filterByProductType,
    filterSearch,
    setFilterSearch,
  } = useProductModelPage();

  const [filterList, setFilterList] = useState(false);

  const [addProductModelForm, setAddProductModelForm] = useState(false);
  const [editProductModelForm, setEditProductModelForm] = useState(false);
  const [productModelEdit, setProductModelEdit] = useState<ProductModelResponseDTO | null>(null);
  const [removeProductModelForm, setRemoveProductModelForm] = useState<ProductModelResponseDTO | null>(null);
  const [productModelRemove, setProductModelRemove] = useState<ProductModelResponseDTO | null>(null);

  const [alert, setAlert] = useState(false);
  const [alertColor, setAlertColor] = useState("");
  const [alertText, setAlertText] = useState("");
  const [alertIcon, setAlertIcon] = useState<React.ReactNode | null>(null);

  function resetAlert() {
    setAlert(false);
    setAlertColor("");
    setAlertText("");
    setAlertIcon(null);
  }

  return (
    <>
      <div className="h-screen w-screen flex">
        <AdminNavbar />
        <div className="flex-1 justify-self-center flex flex-col gap-14 2xl:mt-20 lg:mt-15 mx-12 mb-12 items-center">
          <h2 className="w-full 2xl:text-5xl lg:text-4xl text-center text-orange-500 font-semibold">MODELOS</h2>
          <div className="2xl:w-1/2 lg:w-3/5 h-full">
            <div className="flex justify-between">
              <div className="flex gap-8">
                <AnimatedButton
                  color="#6a7282"
                  colorHover="#4a5565"
                  colorDisabled="#d1d5dc"
                  content={
                    <>
                      Filtrar{" "}
                      <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                      </svg>
                    </>
                  }
                  disabled={productTypes.length === 0}
                  onClickFunction={() => setFilterList((prev) => !prev)}
                  adicionalStyle="px-4 py-2 text-white"
                />
                <AnimatedButton
                  color="#00c950"
                  colorHover="#00a63e"
                  colorDisabled="#7bf1a8"
                  disabled={productTypes.length === 0}
                  onClickFunction={() => setAddProductModelForm(true)}
                  content={"Adicionar"}
                  adicionalStyle="px-4 py-2 text-white"
                />
                {filterList && productTypes.length != 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={filterList ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="divide-y absolute mt-11 w-fit"
                  >
                    <ul className="bg-gray-700 rounded-lg w-fit text-white px-4 py-3 space-y-2 max-h-55 overflow-y-auto">
                      {productTypes.map((obj) => (
                        <>
                          <li key={obj.id} id={`${obj.id}`}>
                            <div className="flex gap-2 items-center rounded-lg px-1 py-1 hover:bg-gray-600">
                              <input
                                id={`${obj.id}`}
                                type="checkbox"
                                name="filter"
                                value={obj.id}
                                checked={productTypeSelected === obj.id}
                                onChange={() => filterByProductType(obj.id)}
                              />
                              <label htmlFor={`${obj.id}`}>{obj.name}</label>
                            </div>
                          </li>
                        </>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
              <div className="relative flex items-center">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="filter-search"
                  id="filter-search"
                  placeholder="Pesquisar Modelos"
                  className="w-full pl-10 pr-3 py-2 outline-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filterSearch}
                  onChange={(e) => setFilterSearch(e.target.value)}
                />
              </div>
            </div>
            {productModels.length === 0 && (
              <div className="self-center justify-self-center flex items-center h-full">
                {loading && <Loader className="mb-40 animate-spin" />}
                {!loading && <p className="text-white0 mb-40">Nenhum Modelo Cadastrado</p>}
              </div>
            )}
            {productModels.length != 0 && (
              <ProductModelsTable
                productModels={productModels}
                setEditProductModelForm={setEditProductModelForm}
                setProductModelEdit={setProductModelEdit}
                setProductModelRemove={setProductModelRemove}
                setRemoveProductModelForm={setRemoveProductModelForm}
              />
            )}
          </div>
          {addProductModelForm && (
            <>
              <AddProductModelForm
                addProductModel={addProductModel}
                productTypes={productTypes}
                setAddProductModelForm={setAddProductModelForm}
                refreshProductModel={refreshProductModel}
              />
            </>
          )}
          {editProductModelForm && (
            <>
              <EditProductModelForm
                editProductModel={editProductModel}
                productModel={productModelEdit}
                productTypes={productTypes}
                setEditProductModelForm={setEditProductModelForm}
                setProductModelEdit={setProductModelEdit}
                refreshProductModel={refreshProductModel}
              />
            </>
          )}
          {removeProductModelForm && (
            <>
              <RemoveProductModelForm
                productModel={productModelRemove}
                removeProductModel={removeProductModel}
                setProductModelRemove={setProductModelRemove}
                setRemoveProductModelForm={setRemoveProductModelForm}
                refreshProductModel={refreshProductModel}
              />
            </>
          )}
        </div>
        {alert && <Alert color={alertColor} text={alertText} icon={alertIcon} onClose={() => resetAlert()} />}
      </div>
    </>
  );
}
