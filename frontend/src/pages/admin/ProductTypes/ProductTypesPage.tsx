import { useState } from "react";
import { Search, Loader } from "lucide-react";
import Alert from "../../../components/UI/Alert";
import AdminNavbar from "../../../components/Layout/AdminNavbar";
import type { ProductTypeResponseDTO } from "../../../features/product_type/productType.model";
import { useProductTypePage } from "./useProductTypePage";
import AddProductTypeForm from "./components/AddProductTypeForm";
import { EditProductTypeForm } from "./components/EditProductTypeForm";
import { RemoveProductTypeForm } from "./components/RemoveProductTypeForm";
import { ProductTypesTable } from "./components/ProductTypesTable";
import { AnimatedButton } from "../../../components/UI/AnimatedButton";

export default function ProductTypesPage() {
  const {
    productTypes,
    loading,
    refreshProductTypes,
    addProductType,
    editProductType,
    removeProductType,
    filterSearch,
    setFilterSearch,
    reorderTypes,
  } = useProductTypePage();

  const [addProductTypeForm, setAddProductTypeForm] = useState(false);

  const [productTypeEdit, setProductTypeEdit] = useState<ProductTypeResponseDTO | null>(null);
  const [editProductTypeForm, setEditProductTypeForm] = useState(false);

  const [productTypeRemove, setProductTypeRemove] = useState<ProductTypeResponseDTO | null>(null);
  const [removeProductTypeForm, setRemoveProductTypeForm] = useState(false);

  const [reorderMode, setReorderMode] = useState(false);

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
      <div className="min-h-screen w-screen flex">
        <AdminNavbar />
        <div className="flex-1 justify-self-center flex flex-col gap-14 2xl:mt-20 lg:mt-15 mx-12 mb-12 items-center">
          <h2 className="w-full 2xl:text-5xl lg:text-4xl text-center text-orange-500 font-semibold">FAMÍLIAS</h2>
          <div className="2xl:w-1/2 xl:w-4/6 w-5/6 h-full">
            <div className="flex w-full justify-between">
              <div className="flex flex-row gap-10">
                {!reorderMode && (
                  <AnimatedButton
                    color="#00c950"
                    colorHover="#00a63e"
                    colorDisabled="#7bf1a8"
                    content={"Adicionar"}
                    disabled={false}
                    onClickFunction={() => setAddProductTypeForm(true)}
                    adicionalStyle="2xl:px-4 2xl:py-2 px-3 py-1.5 text-white 2xl:text-base text-sm"
                  />
                )}
                <AnimatedButton
                  color={reorderMode ? "#fb2c36" : "#3b82f6"}
                  colorHover={reorderMode ? "#e7000b" : "#2563eb"}
                  colorDisabled="#a5b4fc"
                  content={reorderMode ? "Concluir" : "Reordenar"}
                  disabled={false}
                  onClickFunction={() => setReorderMode((prev) => !prev)}
                  adicionalStyle="2xl:px-4 2xl:py-2 px-3 py-1.5 text-white 2xl:text-base text-sm"
                />
              </div>
              {!reorderMode && (
                <div className="relative flex items-center">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="filter-search"
                    id="filter-search"
                    placeholder="Pesquisar Famílias"
                    className="w-full 2xl:pl-10 2xl:pr-3 2xl:py-2 2xl:text-base pr-2 py-1.5 pl-9 text-sm outline-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filterSearch}
                    onChange={(e) => setFilterSearch(e.target.value)}
                  />
                </div>
              )}
            </div>
            {productTypes.length === 0 && (
              <div className="self-center justify-self-center flex items-center h-full">
                {loading && <Loader className="mb-40 animate-spin" />}
                {!loading && <p className="text-white0 mb-40">Nenhuma Família Cadastrada</p>}
              </div>
            )}
            {productTypes.length != 0 && (
              <>
                <ProductTypesTable
                  productTypes={productTypes}
                  setEditProductTypeForm={setEditProductTypeForm}
                  setProductTypeEdit={setProductTypeEdit}
                  setProductTypeRemove={setProductTypeRemove}
                  setRemoveProductTypeForm={setRemoveProductTypeForm}
                  reorderMode={reorderMode}
                  reorderTypes={reorderTypes}
                />
              </>
            )}
          </div>
          {addProductTypeForm && (
            <>
              <AddProductTypeForm
                addProductType={addProductType}
                refreshProductTypes={refreshProductTypes}
                setAddProductTypeForm={setAddProductTypeForm}
              />
            </>
          )}
          {editProductTypeForm && (
            <>
              <EditProductTypeForm
                editProductType={editProductType}
                productType={productTypeEdit}
                refreshProductTypes={refreshProductTypes}
                setEditProductTypeForm={setEditProductTypeForm}
                setProductTypeEdit={setProductTypeEdit}
              />
            </>
          )}
          {removeProductTypeForm && (
            <RemoveProductTypeForm
              productType={productTypeRemove}
              refreshProductTypes={refreshProductTypes}
              removeProductType={removeProductType}
              setProductTypeRemove={setProductTypeRemove}
              setRemoveProductTypeForm={setRemoveProductTypeForm}
            />
          )}
        </div>
        {alert && <Alert color={alertColor} text={alertText} icon={alertIcon} onClose={() => resetAlert()} />}
      </div>
    </>
  );
}
