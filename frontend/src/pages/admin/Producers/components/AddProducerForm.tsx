import { useEffect, useState } from "react";
import type { ProductTypeResponseDTO } from "../../../../features/product_type/productType.model";
import { AnimatedButton } from "../../../../components/UI/AnimatedButton";

interface AddProducerFormProps {
  addProducer: Function;
  productTypes: ProductTypeResponseDTO[];
  setAddProducerForm: Function;
  refreshProducer: Function;
}

export default function AddProducerForm({ addProducer, productTypes, setAddProducerForm, refreshProducer }: AddProducerFormProps) {
  const [infos, setInfos] = useState(false);
  const [producerName, setProducerName] = useState("");
  const [producerHasModel, setProducerHasModel] = useState(false);
  const [producerProductType, setProducerProductType] = useState("");

  useEffect(() => {
    if (producerName.trim() !== "" && producerProductType.trim() !== "") {
      setInfos(true);
    } else {
      setInfos(false);
    }
  }, [producerName, producerHasModel, producerProductType]);

  async function handleAddProducer() {
    await addProducer(producerName, producerProductType, producerHasModel);
    setAddProducerForm(false);
    await refreshProducer();
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50" onClick={() => setAddProducerForm(false)}></div>
      <div className="z-50 flex flex-col gap-5 px-16 pb-3 absolute 2xl:w-1/4 bg-gray-200 rounded-lg shadow-lg">
        <h3 className="text-center px-4 py-2 text-2xl bg-orange-500 w-fit self-center rounded-b-lg text-white">ADICIONAR FABRICANTE</h3>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name">Nome</label>
            <input
              className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-200 placeholder:text-white0 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 00 sm:text-sm/6"
              id="name"
              type="text"
              onChange={(e) => setProducerName(e.target.value)}
              value={producerName}
            />
          </div>
          <div className="flex flex-col gap-1.5 mb-5">
            <p>Família</p>
            <select
              className="bg-gray-50 px-3 py-1.5 rounded-lg"
              onChange={(e) => setProducerProductType(e.target.value)}
              value={producerProductType}
            >
              <option value="" selected>
                - Selecionar -
              </option>
              {productTypes.map((obj) => (
                <option value={`${obj.id}`}>{obj.name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-row items-center gap-3">
            <label htmlFor="model">Tem Modelos?</label>
            <input
              id="model"
              type="checkbox"
              checked={producerHasModel}
              onChange={(e) => setProducerHasModel(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
            />
          </div>
          <div className="flex w-full justify-between mt-3">
            <AnimatedButton
              // Red
              color="#fb2c36"
              colorHover="#e7000b"
              colorDisabled="#ffa2a2"
              content={"Cancelar"}
              disabled={false}
              onClickFunction={() => setAddProducerForm(false)}
              adicionalStyle="w-24 px-4 py-2 text-white"
            />
            <AnimatedButton
              // Green
              color="#00c950"
              colorHover="#00a63e"
              colorDisabled="#7bf1a8"
              content={"Criar"}
              disabled={!infos}
              onClickFunction={() => handleAddProducer()}
              adicionalStyle="w-24 px-4 py-2 text-white"
            />
          </div>
        </div>
      </div>
    </>
  );
}
