import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import type { Text } from "../../../../features/texts/texts.model";
import { AnimatedResetButton } from "../../../../components/UI/AnimatedResetButton";
import { AnimatedButton } from "../../../../components/UI/AnimatedButton";

interface EditTextFormProps {
  text: Text | null;
  editText: Function;
  setEditTextForm: Function;
  setTextEdit: Function;
  refreshTexts: Function;
}

export function EditTextForm({ text, editText, setEditTextForm, setTextEdit, refreshTexts }: EditTextFormProps) {
  const [textName, setTextName] = useState(text?.name);
  const [textContent, setTextContent] = useState(text?.content);
  const [textPage, setTextPage] = useState(text?.page);
  const [enableEdit, setEnableEdit] = useState(false);
  const pages = ["Home", "Sobre Nós", "Contato"];

  useEffect(() => {
    if (textName !== text?.name || textContent !== text?.content || textPage !== text?.page) {
      setEnableEdit(true);
    } else {
      setEnableEdit(false);
    }
  }, [textName, textContent, textPage]);

  function cancelEditText() {
    setEditTextForm(false);
    setTextEdit(null);
  }

  async function handleEditText() {
    await editText(text?.id, textName, textContent, textPage);
    setTextEdit(null);
    setEditTextForm(false);
    await refreshTexts();
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50" onClick={() => cancelEditText()}></div>
      <div className="z-50 flex flex-col gap-5 px-16 pb-3 absolute mt-26 w-1/3 bg-gray-200 rounded-lg shadow-lg">
        <h3 className="text-center px-4 py-2 text-2xl bg-orange-500 w-fit self-center rounded-b-lg text-white">EDITAR TEXTO</h3>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-row gap-1.5 items-center">
              <label htmlFor="textName">Nome</label>
              <AnimatedResetButton content={<RotateCcw size={14} color="black" />} onClickFunction={() => setTextName(text?.name ?? "")} />
            </div>
            <input
              className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-200 placeholder:text-white0 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 00 sm:text-sm/6"
              id="textName"
              type="text"
              onChange={(e) => setTextName(e.target.value)}
              value={textName}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-row gap-1.5 items-center">
              <label htmlFor="textContent">Texto</label>
              <AnimatedResetButton content={<RotateCcw size={14} color="black" />} onClickFunction={() => setTextContent(text?.content ?? "")} />
            </div>
            <textarea
              name="textContent"
              id="textContent"
              className="block w-full min-h-10 h-70 rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-200 placeholder:text-white0 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 00 sm:text-sm/6"
              onChange={(e) => setTextContent(e.target.value)}
              value={textContent}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-row gap-1.5 items-center">
              <p>Página</p>
              <AnimatedResetButton content={<RotateCcw size={14} color="black" />} onClickFunction={() => setTextPage(String(text?.page))} />
            </div>
            <select className="bg-gray-50 px-3 py-1.5 rounded-lg" onChange={(e) => setTextPage(e.target.value)} value={textPage}>
              <option value="" selected>
                - Selecionar -
              </option>
              {pages.map((obj) => (
                <option value={obj}>{obj}</option>
              ))}
            </select>
          </div>
          <div className="flex w-full justify-between mt-3">
            <AnimatedButton
              // Red
              color="#fb2c36"
              colorHover="#e7000b"
              colorDisabled="#ffa2a2"
              content={"Cancelar"}
              disabled={false}
              onClickFunction={() => cancelEditText()}
              adicionalStyle="w-24 px-4 py-2 text-white"
            />
            <AnimatedButton
              // Green
              color="#00c950"
              colorHover="#00a63e"
              colorDisabled="#7bf1a8"
              content={"Confirmar"}
              disabled={!enableEdit}
              onClickFunction={() => handleEditText()}
              adicionalStyle="w-24 px-4 py-2 text-white"
            />
          </div>
        </div>
      </div>
    </>
  );
}
