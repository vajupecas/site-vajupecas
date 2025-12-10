import { useEffect, useState } from "react";
import type { ModelResponseDTO } from "../../../../features/model/models.model";
import { RotateCcw } from "lucide-react";
import { AnimatedButton } from "../../../../components/UI/AnimatedButton";
import { AnimatedResetButton } from "../../../../components/UI/AnimatedResetButton";
import type { ProducerResponseDTO } from "../../../../features/producer/producer.model";

interface EditModelFormProps {
  model: ModelResponseDTO | null;
  setEditModelForm: Function;
  editModel: Function;
  setModelEdit: Function;
  producers: ProducerResponseDTO[];
  refreshModel: Function;
}

export default function EditModelForm({ model, setEditModelForm, editModel, setModelEdit, producers, refreshModel }: EditModelFormProps) {
  const [modelName, setModelName] = useState(model?.name);
  const [modelProductType, setModelProductType] = useState(String(model?.producer_id));
  const [enableEdit, setEnableEdit] = useState(false);

  useEffect(() => {
    if (modelName !== model?.name || modelProductType !== String(model?.producer_id)) {
      setEnableEdit(true);
    } else {
      setEnableEdit(false);
    }
  }, [modelName, modelProductType]);

  function cancelEditModel() {
    setEditModelForm(false);
    setModelEdit(null);
  }

  async function handleEditModel() {
    await editModel(model?.id, modelName, modelProductType);
    setModelEdit(null);
    setEditModelForm(false);
    await refreshModel();
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm " onClick={() => cancelEditModel()}></div>
      <div className="z-50 flex flex-col gap-5 px-16 pb-3 absolute 2xl:w-1/4 w-1/3 bg-gray-200 rounded-lg shadow-lg">
        <h3 className="text-center px-4 py-2 text-2xl bg-orange-500 w-fit self-center rounded-b-lg text-white">EDITAR MODELO</h3>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-row gap-1.5 items-center">
              <label htmlFor="name">Nome</label>
              <AnimatedResetButton
                content={<RotateCcw size={14} color="black" />}
                onClickFunction={() => setModelName(model?.name ? model?.name : "")}
              />
            </div>
            <input
              className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-200 placeholder:text-white0 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 00 sm:text-sm/6"
              id="name"
              type="text"
              onChange={(e) => setModelName(e.target.value)}
              value={modelName}
            />
          </div>
          <div className="flex flex-col gap-1.5 mb-5">
            <div className="flex flex-row gap-1.5 items-center">
              <p>Fabricante</p>
              <AnimatedResetButton
                content={<RotateCcw size={14} color="black" />}
                onClickFunction={() => setModelProductType(String(model?.producer_id))}
              />
            </div>
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
              onClickFunction={() => cancelEditModel()}
              adicionalStyle="w-24 px-4 py-2 text-white"
            />
            <AnimatedButton
              // Green
              color="#00c950"
              colorHover="#00a63e"
              colorDisabled="#7bf1a8"
              content={"Confirmar"}
              disabled={!enableEdit}
              onClickFunction={() => handleEditModel()}
              adicionalStyle="w-24 px-4 py-2 text-white"
            />
          </div>
        </div>
      </div>
    </>
  );
}
