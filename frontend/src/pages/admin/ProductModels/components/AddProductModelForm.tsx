import { useEffect, useState } from "react";
import type { ProductTypeResponseDTO } from "../../../../features/product_type/productType.model";
import { AnimatedButton } from "../../../../components/UI/AnimatedButton";

interface AddProductModelFormProps {
  addProductModel: Function;
  productTypes: ProductTypeResponseDTO[];
  setAddProductModelForm: Function;
  refreshProductModel: Function;
}

export default function AddProductModelForm({
  addProductModel,
  productTypes,
  setAddProductModelForm,
  refreshProductModel,
}: AddProductModelFormProps) {
  const [infos, setInfos] = useState(false);
  const [productModelName, setProductModelName] = useState("");
  const [productModelProductType, setProductModelProductType] = useState("");

  useEffect(() => {
    if (productModelName.trim() !== "" && productModelProductType.trim() !== "") {
      setInfos(true);
    } else {
      setInfos(false);
    }
  }, [productModelName, productModelProductType]);

  async function handleAddProductModel() {
    await addProductModel(productModelName, productModelProductType);
    setAddProductModelForm(false);
    await refreshProductModel();
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50" onClick={() => setAddProductModelForm(false)}></div>
      <div className="z-50 flex flex-col gap-6 absolute mt-26 px-16 pb-3 w-1/4 bg-gray-200 rounded-lg shadow-lg">
        <h3 className="text-center px-4 py-2 text-2xl bg-orange-500 w-fit self-center rounded-b-lg text-white">ADICIONAR MODELO</h3>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name">Nome</label>
            <input
              className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-200 placeholder:text-white0 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 00 sm:text-sm/6"
              id="name"
              type="text"
              onChange={(e) => setProductModelName(e.target.value)}
              value={productModelName}
            />
          </div>
          <div className="flex flex-col gap-1.5 mb-5">
            <p>Família</p>
            <select
              className="bg-gray-50 px-3 py-1.5 rounded-lg"
              onChange={(e) => setProductModelProductType(e.target.value)}
              value={productModelProductType}
            >
              <option value="" selected>
                - Selecionar -
              </option>
              {productTypes.map((obj) => (
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
              onClickFunction={() => setAddProductModelForm(false)}
              adicionalStyle="w-24 px-4 py-2 text-white"
            />
            <AnimatedButton
              // Green
              color="#00c950"
              colorHover="#00a63e"
              colorDisabled="#7bf1a8"
              content={"Criar"}
              disabled={!infos}
              onClickFunction={() => handleAddProductModel()}
              adicionalStyle="w-24 px-4 py-2 text-white"
            />
          </div>
        </div>
      </div>
    </>
  );
}
