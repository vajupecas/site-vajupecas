import { AnimatedButton } from "../../../../components/UI/AnimatedButton";
import type { ProductModelResponseDTO } from "../../../../features/product_model/productModels.model";

interface RemoveProductModelFormProps {
  productModel: ProductModelResponseDTO | null;
  removeProductModel: Function;
  setRemoveProductModelForm: Function;
  setProductModelRemove: Function;
  refreshProductModel: Function;
}

export default function RemoveProductModelForm({
  productModel,
  removeProductModel,
  setRemoveProductModelForm,
  setProductModelRemove,
  refreshProductModel,
}: RemoveProductModelFormProps) {
  function cancelRemoveProductModel() {
    setProductModelRemove(null);
    setRemoveProductModelForm(false);
  }

  async function handleRemoveProductModel() {
    await removeProductModel(productModel?.id);
    setProductModelRemove(null);
    setRemoveProductModelForm(false);
    await refreshProductModel();
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50" onClick={() => cancelRemoveProductModel()}></div>
      <div className="z-50 flex flex-col gap-5 px-16 pb-3 absolute mt-41 w-1/4 h-3/10 bg-gray-200 rounded-lg shadow-lg">
        <h3 className="text-center px-4 py-2 text-2xl bg-orange-500 w-fit self-center rounded-b-lg text-white">REMOVER MODELO</h3>
        <div className="flex flex-col gap-1 mt-2 font-semibold">
          <p className="text-gray-800 text-center text-lg">Você realmente quer remover o modelo</p>
          <span className="text-gray-800 text-center text-xl">{productModel?.name}?</span>
        </div>
        <div className="flex flex-col gap-3 h-full items-center">
          <div className="flex w-full justify-around mb-8 h-full items-center">
            <AnimatedButton
              // Red
              color="#fb2c36"
              colorHover="#e7000b"
              colorDisabled="#ffa2a2"
              content={"Cancelar"}
              disabled={false}
              onClickFunction={() => cancelRemoveProductModel()}
              adicionalStyle="w-24 px-4 py-2 text-white"
            />
            <AnimatedButton
              // Green
              color="#00c950"
              colorHover="#00a63e"
              colorDisabled="#7bf1a8"
              content={"Confirmar"}
              disabled={false}
              onClickFunction={() => handleRemoveProductModel()}
              adicionalStyle="w-24 px-4 py-2 text-white"
            />
          </div>
        </div>
      </div>
    </>
  );
}
