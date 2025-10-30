import { useState } from "react";
import { Loader, Search } from "lucide-react";
import Alert from "../../../components/UI/Alert";
import { motion } from "framer-motion";
import AdminNavbar from "../../../components/Layout/AdminNavbar";
import type { Text } from "../../../features/texts/texts.model";
import { useTextsPage } from "./useTextsPage";
import { AddTextForm } from "./components/AddTextForm";
import { EditTextForm } from "./components/EditTextForm";
import { TextsTable } from "./components/TextsTable";
import { AnimatedButton } from "../../../components/UI/AnimatedButton";

export default function TextsPage() {
  const { texts, loading, addText, editText, refreshTexts, filterByPage, pageSelected, setFilterSearch, filterSearch } = useTextsPage();
  const [addTextForm, setAddTextForm] = useState(false);
  const [editTextForm, setEditTextForm] = useState(false);
  const [textEdit, setTextEdit] = useState<Text | null>(null);

  const [filterList, setFilterList] = useState(false);

  const [alert, setAlert] = useState(false);
  const [alertColor, setAlertColor] = useState("");
  const [alertText, setAlertText] = useState("");
  const [alertIcon, setAlertIcon] = useState<React.ReactNode | null>(null);

  const pages = ["Home", "Sobre Nós", "Contato"];

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
          <h2 className="w-full 2xl:text-5xl lg:text-4xl text-center text-orange-500 font-semibold">TEXTOS</h2>
          <div className="2xl:w-1/2 lg:w-3/5 h-full">
            <div className="flex justify-between">
              <div className="flex gap-8">
                <AnimatedButton
                  color="#6a7282"
                  colorHover="#4a5565"
                  colorDisabled="#d1d5dc"
                  disabled={false}
                  content={
                    <>
                      Filtrar
                      <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                      </svg>
                    </>
                  }
                  onClickFunction={() => setFilterList((prev) => !prev)}
                  adicionalStyle="px-4 py-2 text-white"
                />
                <AnimatedButton
                  color="#00c950"
                  colorHover="#00a63e"
                  colorDisabled="#7bf1a8"
                  content={"Adicionar"}
                  disabled={false}
                  onClickFunction={() => setAddTextForm(true)}
                  adicionalStyle="px-4 py-2 text-white"
                />
                {filterList && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={filterList ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="divide-y absolute mt-11 w-fit"
                  >
                    <ul className="bg-gray-700 rounded-lg w-fit text-white px-4 py-3 space-y-2 max-h-55 overflow-y-auto">
                      {pages.map((obj) => (
                        <>
                          <li key={obj} id={`${obj}`}>
                            <div className="flex gap-2 items-center rounded-lg px-1 py-1 hover:bg-gray-600">
                              <input
                                id={`${obj}`}
                                type="checkbox"
                                name="filter"
                                value={obj}
                                checked={pageSelected === obj}
                                onChange={() => filterByPage(obj)}
                              />
                              <label htmlFor={`${obj}`}>{obj}</label>
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
                  placeholder="Pesquisar Textos"
                  className="w-full pl-10 pr-3 py-2 outline-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filterSearch}
                  onChange={(e) => setFilterSearch(e.target.value)}
                />
              </div>
            </div>
            {texts.length === 0 && (
              <div className="self-center justify-self-center flex items-center h-full">
                {loading && <Loader className="mb-40 animate-spin" />}
                {!loading && <p className="text-white0 mb-40">Nenhum Texto Cadastrado</p>}
              </div>
            )}
            {texts.length != 0 && <TextsTable setEditTextForm={setEditTextForm} setTextEdit={setTextEdit} texts={texts} />}
          </div>
          {addTextForm && (
            <>
              <AddTextForm addText={addText} refreshTexts={refreshTexts} setAddTextForm={setAddTextForm} />
            </>
          )}
          {editTextForm && (
            <>
              <EditTextForm
                editText={editText}
                refreshTexts={refreshTexts}
                setEditTextForm={setEditTextForm}
                setTextEdit={setTextEdit}
                text={textEdit}
              />
            </>
          )}
        </div>
        {alert && <Alert color={alertColor} text={alertText} icon={alertIcon} onClose={() => resetAlert()} />}
      </div>
    </>
  );
}
