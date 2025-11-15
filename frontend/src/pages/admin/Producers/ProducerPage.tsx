import { useState } from "react";
import { Loader, Search } from "lucide-react";
import AdminNavbar from "../../../components/Layout/AdminNavbar";
import type { ProducerResponseDTO } from "../../../features/producer/producer.model";
import Alert from "../../../components/UI/Alert";
import { motion } from "framer-motion";
import { AnimatedButton } from "../../../components/UI/AnimatedButton";
import { useProducerPage } from "./useProducerPage";
import AddProducerForm from "./components/AddProducerForm";
import EditProducerForm from "./components/EditProducerForm";
import RemoveProducerForm from "./components/RemoveProducerForm";
import ProducersTable from "./components/ProducersTable";

export default function ProducersPage() {
  const {
    producers,
    productTypes,
    loading,
    productTypeSelected,
    refreshProducer,
    addProducer,
    editProducer,
    removeProducer,
    filterByProductType,
    filterSearch,
    setFilterSearch,
  } = useProducerPage();

  const [filterList, setFilterList] = useState(false);

  const [addProducerForm, setAddProducerForm] = useState(false);
  const [editProducerForm, setEditProducerForm] = useState(false);
  const [producerEdit, setProducerEdit] = useState<ProducerResponseDTO | null>(null);
  const [removeProducerForm, setRemoveProducerForm] = useState<ProducerResponseDTO | null>(null);
  const [producerRemove, setProducerRemove] = useState<ProducerResponseDTO | null>(null);

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
          <h2 className="w-full 2xl:text-5xl lg:text-4xl text-center text-orange-500 font-semibold">FABRICANTES</h2>
          <div className="2xl:w-1/2 xl:w-4/6 w-5/6 h-full">
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
                  adicionalStyle="2xl:px-4 2xl:py-2 px-3 py-1.5 text-white 2xl:text-base text-sm"
                />
                <AnimatedButton
                  color="#00c950"
                  colorHover="#00a63e"
                  colorDisabled="#7bf1a8"
                  disabled={productTypes.length === 0}
                  onClickFunction={() => setAddProducerForm(true)}
                  content={"Adicionar"}
                  adicionalStyle="2xl:px-4 2xl:py-2 px-3 py-1.5 text-white 2xl:text-base text-sm"
                />
                {filterList && productTypes.length != 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={filterList ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="divide-y absolute mt-11 w-fit"
                  >
                    <ul className="bg-gray-700 rounded-lg w-fit text-white px-4 py-3 space-y-2 max-h-55 overflow-y-auto 2xl:text-base text-xs">
                      {productTypes.map((obj) => (
                        <>
                          <li key={obj.id} id={`${obj.id}`}>
                            <div className="flex gap-2 items-center rounded-lg px-1 py-1 hover:bg-gray-600">
                              <input
                                id={`${obj.id}`}
                                type="checkbox"
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
                  placeholder="Pesquisar Fabricantes"
                  className="w-full 2xl:pl-10 2xl:pr-3 2xl:py-2 2xl:text-base pr-2 py-1.5 pl-9 text-sm outline-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filterSearch}
                  onChange={(e) => setFilterSearch(e.target.value)}
                />
              </div>
            </div>
            {producers.length === 0 && (
              <div className="self-center justify-self-center flex items-center h-full">
                {loading && <Loader className="mb-40 animate-spin" />}
                {!loading && <p className="text-white0 mb-40">Nenhum Fabricante Cadastrado</p>}
              </div>
            )}
            {producers.length != 0 && (
              <ProducersTable
                producers={producers}
                setEditProducerForm={setEditProducerForm}
                setProducerEdit={setProducerEdit}
                setProducerRemove={setProducerRemove}
                setRemoveProducerForm={setRemoveProducerForm}
              />
            )}
          </div>
          {addProducerForm && (
            <>
              <AddProducerForm
                addProducer={addProducer}
                productTypes={productTypes}
                setAddProducerForm={setAddProducerForm}
                refreshProducer={refreshProducer}
              />
            </>
          )}
          {editProducerForm && (
            <>
              <EditProducerForm
                editProducer={editProducer}
                producer={producerEdit}
                productTypes={productTypes}
                setEditProducerForm={setEditProducerForm}
                setProducerEdit={setProducerEdit}
                refreshProducer={refreshProducer}
              />
            </>
          )}
          {removeProducerForm && (
            <>
              <RemoveProducerForm
                producer={producerRemove}
                removeProducer={removeProducer}
                setProducerRemove={setProducerRemove}
                setRemoveProducerForm={setRemoveProducerForm}
                refreshProducer={refreshProducer}
              />
            </>
          )}
        </div>
        {alert && <Alert color={alertColor} text={alertText} icon={alertIcon} onClose={() => resetAlert()} />}
      </div>
    </>
  );
}
