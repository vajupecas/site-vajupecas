import { useEffect, useState } from "react";
import { AnimatedButton } from "../../../../components/UI/AnimatedButton";
import type { ProducerResponseDTO } from "../../../../features/producer/producer.model";

interface AddModelFormProps {
  addModel: Function;
  producers: ProducerResponseDTO[];
  setAddModelForm: Function;
  refreshModel: Function;
}

export default function AddModelForm({ addModel, producers, setAddModelForm, refreshModel }: AddModelFormProps) {
  const [infos, setInfos] = useState(false);
  const [modelName, setModelName] = useState("");
  const [modelProductType, setModelProductType] = useState("");

  useEffect(() => {
    if (modelName.trim() !== "" && modelProductType.trim() !== "") {
      setInfos(true);
    } else {
      setInfos(false);
    }
  }, [modelName, modelProductType]);

  async function handleAddModel() {
    await addModel(modelName, modelProductType);
    setAddModelForm(false);
    await refreshModel();
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50" onClick={() => setAddModelForm(false)}></div>
      <div className="z-50 flex flex-col gap-5 px-16 pb-3 absolute 2xl:w-1/4 w-1/3 bg-gray-200 rounded-lg shadow-lg">
        <h3 className="text-center px-4 py-2 text-2xl bg-orange-500 w-fit self-center rounded-b-lg text-white">ADICIONAR MODELO</h3>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name">Nome</label>
            <input
              className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-200 placeholder:text-white0 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 00 sm:text-sm/6"
              id="name"
              type="text"
              onChange={(e) => setModelName(e.target.value)}
              value={modelName}
            />
          </div>
          <div className="flex flex-col gap-1.5 mb-5">
            <p>Fabricante</p>
            <select className="bg-gray-50 px-3 py-1.5 rounded-lg" onChange={(e) => setModelProductType(e.target.value)} value={modelProductType}>
              <option value="" selected>
                - Selecionar -
              </option>
              {producers
                .filter((producer) => producer.has_model)
                .map((obj) => (
                  <option value={`${obj.id}`}>{obj.name}</option>
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
              onClickFunction={() => setAddModelForm(false)}
              adicionalStyle="w-24 px-4 py-2 text-white"
            />
            <AnimatedButton
              // Green
              color="#00c950"
              colorHover="#00a63e"
              colorDisabled="#7bf1a8"
              content={"Criar"}
              disabled={!infos}
              onClickFunction={() => handleAddModel()}
              adicionalStyle="w-24 px-4 py-2 text-white"
            />
          </div>
        </div>
      </div>
    </>
  );
}
