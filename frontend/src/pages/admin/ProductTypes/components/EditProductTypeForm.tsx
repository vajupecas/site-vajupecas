import { useState } from "react";
import type { ProductTypeResponseDTO } from "../../../../features/product_type/productType.model";
import { RotateCcw } from "lucide-react";
import { AnimatedButton } from "../../../../components/UI/AnimatedButton";
import { AnimatedResetButton } from "../../../../components/UI/AnimatedResetButton";

interface EditProductTypeFormProps {
  productType: ProductTypeResponseDTO | null;
  editProductType: Function;
  setProductTypeEdit: Function;
  setEditProductTypeForm: Function;
  refreshProductTypes: Function;
}

export function EditProductTypeForm({
  productType,
  editProductType,
  setProductTypeEdit,
  setEditProductTypeForm,
  refreshProductTypes,
}: EditProductTypeFormProps) {
  const [productTypeName, setProductTypeName] = useState(productType?.name);
  const [productTypeHasProducer, setProductTypeHasProducer] = useState(productType?.has_producer);

  function cancelEditProductType() {
    setProductTypeEdit(null);
    setEditProductTypeForm(false);
  }

  async function handleEditProductType() {
    await editProductType(productType?.id, productTypeName, productTypeHasProducer);
    setEditProductTypeForm(false);
    await refreshProductTypes();
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50" onClick={() => cancelEditProductType()}></div>
      <div className="z-50 flex flex-col gap-5 px-16 pb-3 absolute mt-26 w-1/4 bg-gray-200 rounded-lg shadow-lg">
        <h3 className="text-center px-4 py-2 text-2xl bg-orange-500 w-fit self-center rounded-b-lg text-white">EDITAR PRODUTO</h3>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-row gap-1.5 items-center">
              <label htmlFor="name">Nome</label>
              <AnimatedResetButton
                content={<RotateCcw size={14} color="black" />}
                onClickFunction={() => setProductTypeName(productType?.name ?? "")}
              />
            </div>
            <input
              className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-200 placeholder:text-white0 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 00 sm:text-sm/6"
              id="name"
              type="text"
              onChange={(e) => setProductTypeName(e.target.value)}
              value={productTypeName}
            />
          </div>
          <div className="flex flex-row items-center gap-3">
            <label htmlFor="producer">Tem Fabricante?</label>
            <AnimatedResetButton
              content={<RotateCcw size={14} color="black" />}
              onClickFunction={() => setProductTypeHasProducer(productType?.has_producer ?? false)}
            />
            <input
              id="producer"
              type="checkbox"
              checked={productTypeHasProducer}
              onChange={(e) => setProductTypeHasProducer(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
            />
          </div>
          <div className="flex w-full justify-between mt-3">
            <AnimatedButton
              color="#fb2c36"
              colorHover="#e7000b"
              colorDisabled="#ffa2a2"
              content={"Cancelar"}
              disabled={false}
              onClickFunction={() => cancelEditProductType()}
              adicionalStyle="w-24 px-4 py-2 text-white"
            />
            <AnimatedButton
              color="#00c950"
              colorHover="#00a63e"
              colorDisabled="#7bf1a8"
              content={"Confirmar"}
              disabled={productType?.name === productTypeName && productType?.has_producer === productTypeHasProducer}
              onClickFunction={() => handleEditProductType()}
              adicionalStyle="w-24 px-4 py-2 text-white"
            />
          </div>
        </div>
      </div>
    </>
  );
}
