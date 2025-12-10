import { useState } from "react";
import { AnimatedButton } from "../../../../components/UI/AnimatedButton";

interface AddTextFormProps {
  addText: Function;
  setAddTextForm: Function;
  refreshTexts: Function;
}

export function AddTextForm({ addText, setAddTextForm, refreshTexts }: AddTextFormProps) {
  const [textName, setTextName] = useState("");
  const [textContent, setTextContent] = useState("");
  const [textPage, setTextPage] = useState("");
  const pages = ["Home", "Sobre Nós", "Contato"];

  async function handleAddText() {
    await addText(textName, textContent, textPage);
    setAddTextForm(false);
    await refreshTexts();
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm " onClick={() => setAddTextForm(false)}></div>
      <div className="z-50 flex flex-col gap-5 px-16 pb-3 absolute w-1/3 bg-gray-200 rounded-lg shadow-lg">
        <h3 className="text-center px-4 py-2 text-2xl bg-orange-500 w-fit self-center rounded-b-lg text-white">ADICIONAR TEXTO</h3>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="textName">Nome</label>
            <input
              className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-200 placeholder:text-white0 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 00 sm:text-sm/6"
              id="textName"
              type="text"
              onChange={(e) => setTextName(e.target.value)}
              value={textName}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="textText">Texto</label>
            <textarea
              name="textText"
              id="textText"
              className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base min-h-10 lg:h-40 xl:h-70 text-gray-700 outline-1 -outline-offset-1 outline-gray-200 placeholder:text-white0 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 00 sm:text-sm/6"
              onChange={(e) => setTextContent(e.target.value)}
              value={textContent}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-row gap-1.5 items-center">
              <p>Página</p>
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
              onClickFunction={() => setAddTextForm(false)}
              adicionalStyle="w-24 px-4 py-2 text-white"
            />
            <AnimatedButton
              // Green
              color="#00c950"
              colorHover="#00a63e"
              colorDisabled="#7bf1a8"
              content={"Criar"}
              disabled={textName === "" || textContent === "" || textPage === ""}
              onClickFunction={() => handleAddText()}
              adicionalStyle="w-24 px-4 py-2 text-white"
            />
          </div>
        </div>
      </div>
    </>
  );
}
