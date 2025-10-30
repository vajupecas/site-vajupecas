import { AnimatedButton } from "../../../../components/UI/AnimatedButton";
import type { ProductResponseDTO } from "../../../../features/product/product.model";

interface RemoveProductFormProps {
  productRemove: ProductResponseDTO | null;
  removeProduct: Function;
  setProductRemove: Function;
  setRemoveProductForm: Function;
  refreshProducts: Function;
}

export default function RemoveProductForm({
  productRemove,
  setProductRemove,
  removeProduct,
  setRemoveProductForm,
  refreshProducts,
}: RemoveProductFormProps) {
  function cancelRemoveProduct() {
    setProductRemove(null);
    setRemoveProductForm(false);
  }

  async function handleRemoveProduct() {
    await removeProduct(productRemove?.id);
    setRemoveProductForm(false);
    await refreshProducts();
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50" onClick={() => cancelRemoveProduct()}></div>
      <div className="z-50 flex flex-col gap-5 px-16 pb-3 absolute mt-41 w-1/4 h-3/10 bg-gray-200 rounded-lg shadow-lg">
        <h3 className="text-center px-4 py-2 text-2xl bg-orange-500 w-fit self-center rounded-b-lg text-white">REMOVER PRODUTO</h3>
        <div className="flex flex-col gap-1 mt-2 font-semibold">
          <p className="text-gray-800 text-center text-lg">Você realmente quer remover o produto</p>
          <span className="text-gray-800 text-center text-xl">{productRemove?.name}?</span>
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
              onClickFunction={() => cancelRemoveProduct()}
              adicionalStyle="w-24 px-4 py-2 text-white"
            />
            <AnimatedButton
              // Green
              color="#00c950"
              colorHover="#00a63e"
              colorDisabled="#7bf1a8"
              content={"Confirmar"}
              disabled={false}
              onClickFunction={() => handleRemoveProduct()}
              adicionalStyle="w-24 px-4 py-2 text-white"
            />
          </div>
        </div>
      </div>
    </>
  );
}
