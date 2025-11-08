import { useState } from "react";
import { AnimatedButton } from "../../../../components/UI/AnimatedButton";

interface addProductTypeFormProps {
  addProductType: Function;
  setAddProductTypeForm: Function;
  refreshProductTypes: Function;
}

export default function addProductTypeForm({ addProductType, setAddProductTypeForm, refreshProductTypes }: addProductTypeFormProps) {
  const [productTypeName, setProductTypeName] = useState("");
  const [productTypeHasProducer, setProductTypeHasProducer] = useState(true);
  const [productTypeHasProductModel, setProductTypeHasProductModel] = useState(false);

  async function handleAddProductType() {
    await addProductType(productTypeName, productTypeHasProducer, productTypeHasProductModel);
    setAddProductTypeForm(false);
    await refreshProductTypes();
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50" onClick={() => setAddProductTypeForm(false)}></div>
      <div className="z-50 flex flex-col gap-5 px-16 pb-3 absolute 2xl:w-1/4 bg-gray-200 rounded-lg shadow-lg">
        <h3 className="text-center px-4 py-2 text-2xl bg-orange-500 w-fit self-center rounded-b-lg text-white">ADICIONAR FAMÍLIA</h3>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name">Nome</label>
            <input
              className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-200 placeholder:text-white0 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 00 sm:text-sm/6"
              id="name"
              type="text"
              onChange={(e) => setProductTypeName(e.target.value)}
              value={productTypeName}
            />
          </div>
          <div className="flex gap-10 justify-around">
            <div className="flex flex-row items-center gap-3">
              <label htmlFor="producer">Tem Fabricantes?</label>
              <input
                id="producer"
                type="checkbox"
                checked={productTypeHasProducer}
                onChange={(e) => {
                  setProductTypeHasProducer(e.target.checked);
                  setProductTypeHasProductModel(false);
                }}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-row items-center gap-3">
              <label htmlFor="model">Tem Modelos?</label>
              <input
                id="model"
                type="checkbox"
                disabled={!productTypeHasProducer}
                checked={productTypeHasProductModel}
                onChange={(e) => setProductTypeHasProductModel(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex w-full justify-between mt-3">
            <AnimatedButton
              color="#fb2c36"
              colorHover="#e7000b"
              colorDisabled="#ffa2a2"
              content={"Cancelar"}
              disabled={false}
              onClickFunction={() => setAddProductTypeForm(false)}
              adicionalStyle="w-24 px-4 py-2 text-white"
            />
            <AnimatedButton
              color="#00c950"
              colorHover="#00a63e"
              colorDisabled="#7bf1a8"
              content={"Criar"}
              disabled={false}
              onClickFunction={() => handleAddProductType()}
              adicionalStyle="w-24 px-4 py-2 text-white"
            />
          </div>
        </div>
      </div>
    </>
  );
}
