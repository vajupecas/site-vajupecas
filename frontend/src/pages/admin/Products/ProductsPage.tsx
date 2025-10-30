import { useState } from "react";
import { Loader, Search } from "lucide-react";
import AdminNavbar from "../../../components/Layout/AdminNavbar";
import type { ProductResponseDTO } from "../../../features/product/product.model";
import Alert from "../../../components/UI/Alert";
import { motion } from "framer-motion";
import { useProductsPage } from "./useProductsPage";
import AddProductForm from "./components/AddProductForm";
import EditProductForm from "./components/EditProductForm";
import ProductsTable from "./components/ProductsTable";
import RemoveProductForm from "./components/RemoveProductForm";
import { AnimatedButton } from "../../../components/UI/AnimatedButton";

export default function ProductsPage() {
  const {
    products,
    producers,
    loading,
    producerSelected,
    refreshProducts,
    addProduct,
    editProduct,
    removeProduct,
    filterByProducer,
    filterSearch,
    setFilterSearch,
  } = useProductsPage();

  const [filterList, setFilterList] = useState(false);

  const [addProductForm, setAddProductForm] = useState(false);
  const [editProductForm, setEditProductForm] = useState(false);
  const [productEdit, setProductEdit] = useState<ProductResponseDTO | null>(null);
  const [productRemove, setProductRemove] = useState<ProductResponseDTO | null>(null);
  const [removeProductForm, setRemoveProductForm] = useState(false);

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
          <h2 className="w-full 2xl:text-5xl lg:text-4xl text-center text-orange-500 font-semibold">PRODUTOS</h2>
          <div className="2xl:w-1/2 lg:w-3/5 h-full">
            <div className="flex justify-between">
              <div className="flex gap-8">
                <AnimatedButton
                  color="#6a7282"
                  colorHover="#4a5565"
                  colorDisabled="#d1d5dc"
                  content={
                    <>
                      Filtrar
                      <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                      </svg>
                    </>
                  }
                  disabled={producers.length === 0}
                  onClickFunction={() => setFilterList((prev) => !prev)}
                  adicionalStyle="px-4 py-2 text-white"
                />
                <AnimatedButton
                  color="#00c950"
                  colorHover="#00a63e"
                  colorDisabled="#7bf1a8"
                  content={"Adicionar"}
                  disabled={producers.length === 0}
                  onClickFunction={() => setAddProductForm(true)}
                  adicionalStyle="px-4 py-2 text-white"
                />
                {filterList && producers.length != 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={filterList ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="divide-y absolute mt-11 w-fit"
                  >
                    <ul className="bg-gray-700 rounded-lg text-white px-4 py-3 space-y-2 max-h-55 overflow-y-auto">
                      {producers.map((obj) => (
                        <>
                          <li key={obj.id} id={`${obj.id}`}>
                            <div className="flex gap-2 items-center rounded-lg px-1 py-1 hover:bg-gray-600">
                              <input
                                id={`${obj.id}`}
                                type="checkbox"
                                name="filter"
                                value={obj.id}
                                checked={producerSelected === obj.id}
                                onChange={() => filterByProducer(obj.id)}
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
                  placeholder="Pesquisar Produtos"
                  className="w-full pl-10 pr-3 py-2 outline-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filterSearch}
                  onChange={(e) => setFilterSearch(e.target.value)}
                />
              </div>
            </div>
            {products.length === 0 && (
              <div className="self-center justify-self-center flex items-center h-full">
                {loading && <Loader className="mb-40 animate-spin" />}
                {!loading && <p className="text-white0 mb-40">Nenhum Produto Cadastrado</p>}
              </div>
            )}
            {products.length != 0 && (
              <>
                <ProductsTable
                  products={products}
                  setProductEdit={setProductEdit}
                  setEditProductForm={setEditProductForm}
                  setProductRemove={setProductRemove}
                  setRemoveProductForm={setRemoveProductForm}
                />
              </>
            )}
          </div>
          {addProductForm && (
            <>
              <AddProductForm addProduct={addProduct} setAddProductForm={setAddProductForm} producers={producers} refreshProducts={refreshProducts} />
            </>
          )}
          {editProductForm && (
            <>
              <EditProductForm
                product={productEdit}
                editProduct={editProduct}
                setEditProductForm={setEditProductForm}
                setProductEdit={setProductEdit}
                producers={producers}
                refreshProducts={refreshProducts}
              />
            </>
          )}
          {removeProductForm && (
            <RemoveProductForm
              productRemove={productRemove}
              removeProduct={removeProduct}
              setProductRemove={setProductRemove}
              setRemoveProductForm={setRemoveProductForm}
              refreshProducts={refreshProducts}
            />
          )}
        </div>
        {alert && <Alert color={alertColor} text={alertText} icon={alertIcon} onClose={() => resetAlert()} />}
      </div>
    </>
  );
}
