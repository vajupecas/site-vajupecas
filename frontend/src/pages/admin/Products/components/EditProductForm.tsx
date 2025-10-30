import { useEffect, useState } from "react";
import type { ProducerResponseDTO } from "../../../../features/producer/producer.model";
import { RotateCcw } from "lucide-react";
import type { ProductResponseDTO } from "../../../../features/product/product.model";
import { AnimatedButton } from "../../../../components/UI/AnimatedButton";
import { AnimatedResetButton } from "../../../../components/UI/AnimatedResetButton";

interface EditProductFormProps {
  product: ProductResponseDTO | null;
  editProduct: Function;
  setEditProductForm: Function;
  setProductEdit: Function;
  producers: ProducerResponseDTO[];
  refreshProducts: Function;
}

export default function EditProductForm({
  product,
  editProduct,
  setEditProductForm,
  setProductEdit,
  producers,
  refreshProducts,
}: EditProductFormProps) {
  const [productName, setProductName] = useState(product?.name);
  const [productDescription, setProductDescription] = useState(product?.description);
  const [productProducer, setProductProducer] = useState(String(product?.producer_id));
  const [file, setFile] = useState<File | null>(null);
  const [enableEdit, setEnableEdit] = useState(false);

  useEffect(() => {
    if (
      productName !== product?.name ||
      productDescription !== product?.description ||
      productProducer !== String(product?.producer_id) ||
      file !== null
    ) {
      setEnableEdit(true);
    } else {
      setEnableEdit(false);
    }
  }, [productName, productDescription, productProducer, file]);

  function cancelEditProduct() {
    setEditProductForm(false);
    setProductEdit(null);
  }

  async function handleEditProduct() {
    await editProduct(product?.id, productName, productDescription, file, productProducer);
    setProductEdit(null);
    setEditProductForm(false);
    await refreshProducts();
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50" onClick={() => cancelEditProduct()}></div>
      <div className="z-50 flex flex-col gap-5 px-16 pb-3 absolute mt-26 w-1/4 bg-gray-200 rounded-lg shadow-lg">
        <h3 className="text-center px-4 py-2 text-2xl bg-orange-500 w-fit self-center rounded-b-lg text-white">EDITAR PRODUTO</h3>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-row gap-1.5 items-center">
              <label htmlFor="name">Nome</label>
              <AnimatedResetButton
                content={<RotateCcw size={14} color="black" />}
                onClickFunction={() => setProductName(product?.name ? product.name : "")}
              />
            </div>
            <input
              className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-200 placeholder:text-white0 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 00 sm:text-sm/6"
              id="name"
              type="text"
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-row gap-1.5 items-center">
              <label htmlFor="description">Descrição</label>
              <AnimatedResetButton
                content={<RotateCcw size={14} color="black" />}
                onClickFunction={() => setProductDescription(product?.description ? product.description : "")}
              />
            </div>
            <textarea
              name="description"
              id="description"
              className="block w-full min-h-10 h-30 rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-200 placeholder:text-white0 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 00 sm:text-sm/6"
              onChange={(e) => setProductDescription(e.target.value)}
              value={productDescription}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-row gap-1.5 items-center">
              <p>Fabricante</p>
              <AnimatedResetButton
                content={<RotateCcw size={14} color="black" />}
                onClickFunction={() => setProductProducer(String(product?.producer_id))}
              />
            </div>
            <select className="bg-gray-50 px-3 py-1.5 rounded-lg" onChange={(e) => setProductProducer(e.target.value)} value={productProducer}>
              <option value="" selected>
                - Selecionar -
              </option>
              {producers.map((obj) => (
                <option value={`${obj.id}`}>{obj.name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-row gap-1.5 items-center">
              <label className="" htmlFor="photo_input">
                Foto
              </label>
              <AnimatedResetButton content={<RotateCcw size={14} color="black" />} onClickFunction={() => setFile(null)} />
            </div>
            <input
              className="block cursor-pointer w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-200"
              id="file_input"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            />
          </div>
          <div className="flex w-full justify-between mt-3">
            <AnimatedButton
              color="#fb2c36"
              colorHover="#e7000b"
              colorDisabled="#ffa2a2"
              content={"Cancelar"}
              disabled={false}
              onClickFunction={() => setEditProductForm(false)}
              adicionalStyle="w-24 px-4 py-2 text-white"
            />
            <AnimatedButton
              color="#00c950"
              colorHover="#00a63e"
              colorDisabled="#7bf1a8"
              content={"Confirmar"}
              disabled={!enableEdit}
              onClickFunction={() => handleEditProduct()}
              adicionalStyle="w-24 px-4 py-2 text-white"
            />
          </div>
        </div>
      </div>
    </>
  );
}
