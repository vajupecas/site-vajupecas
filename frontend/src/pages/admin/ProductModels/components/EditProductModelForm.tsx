import { useEffect, useState } from "react";
import type { ProductModelResponseDTO } from "../../../../features/product_model/productModels.model";
import type { ProductTypeResponseDTO } from "../../../../features/product_type/productType.model";
import { RotateCcw } from "lucide-react";
import { AnimatedButton } from "../../../../components/UI/AnimatedButton";
import { AnimatedResetButton } from "../../../../components/UI/AnimatedResetButton";

interface EditProductModelFormProps {
  productModel: ProductModelResponseDTO | null;
  setEditProductModelForm: Function;
  editProductModel: Function;
  setProductModelEdit: Function;
  productTypes: ProductTypeResponseDTO[];
  refreshProductModel: Function;
}

export default function EditProductModelForm({
  productModel,
  setEditProductModelForm,
  editProductModel,
  setProductModelEdit,
  productTypes,
  refreshProductModel,
}: EditProductModelFormProps) {
  const [productModelName, setProductModelName] = useState(productModel?.name);
  const [productModelProductType, setProductModelProductType] = useState(String(productModel?.product_type_id));
  const [enableEdit, setEnableEdit] = useState(false);

  useEffect(() => {
    if (productModelName !== productModel?.name || productModelProductType !== String(productModel?.product_type_id)) {
      setEnableEdit(true);
    } else {
      setEnableEdit(false);
    }
  }, [productModelName, productModelProductType]);

  function cancelEditProductModel() {
    setEditProductModelForm(false);
    setProductModelEdit(null);
  }

  async function handleEditProductModel() {
    await editProductModel(productModel?.id, productModelName, productModelProductType);
    setProductModelEdit(null);
    setEditProductModelForm(false);
    await refreshProductModel();
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50" onClick={() => cancelEditProductModel()}></div>
      <div className="z-50 flex flex-col gap-6  px-16 pb-3 absolute mt-26 w-1/4 bg-gray-200 rounded-lg shadow-lg">
        <h3 className="text-center px-4 py-2 text-2xl bg-orange-500 w-fit self-center rounded-b-lg text-white">EDITAR MODELO</h3>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-row gap-1.5 items-center">
              <label htmlFor="name">Nome</label>
              <AnimatedResetButton
                content={<RotateCcw size={14} color="black" />}
                onClickFunction={() => setProductModelName(productModel?.name ? productModel?.name : "")}
              />
            </div>
            <input
              className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-200 placeholder:text-white0 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 00 sm:text-sm/6"
              id="name"
              type="text"
              onChange={(e) => setProductModelName(e.target.value)}
              value={productModelName}
            />
          </div>
          <div className="flex flex-col gap-1.5 mb-5">
            <div className="flex flex-row gap-1.5 items-center">
              <p>Família</p>
              <AnimatedResetButton
                content={<RotateCcw size={14} color="black" />}
                onClickFunction={() => setProductModelProductType(String(productModel?.product_type_id))}
              />
            </div>
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
              onClickFunction={() => cancelEditProductModel()}
              adicionalStyle="w-24 px-4 py-2 text-white"
            />
            <AnimatedButton
              // Green
              color="#00c950"
              colorHover="#00a63e"
              colorDisabled="#7bf1a8"
              content={"Confirmar"}
              disabled={!enableEdit}
              onClickFunction={() => handleEditProductModel()}
              adicionalStyle="w-24 px-4 py-2 text-white"
            />
          </div>
        </div>
      </div>
    </>
  );
}
