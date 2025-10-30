import { useEffect, useState } from "react";
import type { ProducerResponseDTO } from "../../../../features/producer/producer.model";
import { AnimatedButton } from "../../../../components/UI/AnimatedButton";

interface AddProductFormProps {
  addProduct: Function;
  setAddProductForm: Function;
  producers: ProducerResponseDTO[];
  refreshProducts: Function;
}

export default function AddProductForm({ addProduct, setAddProductForm, producers, refreshProducts }: AddProductFormProps) {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productProducer, setProductProducer] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [infos, setInfos] = useState(false);

  useEffect(() => {
    if (productName.trim() !== "" && productDescription.trim() !== "" && productProducer.trim() !== "" && file !== null) {
      setInfos(true);
    } else {
      setInfos(false);
    }
  }, [productName, productDescription, productProducer, file]);

  async function handlePostProduct() {
    await addProduct(productName, productDescription, file, productProducer);
    setAddProductForm(false);
    await refreshProducts();
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50" onClick={() => setAddProductForm(false)}></div>
      <div className="z-50 flex flex-col gap-5 px-16 pb-3 absolute mt-26 w-1/4 bg-gray-200 rounded-lg shadow-lg">
        <h3 className="text-center px-4 py-2 text-2xl bg-orange-500 w-fit self-center rounded-b-lg text-white">ADICIONAR PRODUTO</h3>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name">Nome</label>
            <input
              className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-200 placeholder:text-white0 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 00 sm:text-sm/6"
              id="name"
              type="text"
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="description">Descrição</label>
            <textarea
              name="description"
              id="description"
              className="block w-full min-h-10 h-30 rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-200 placeholder:text-white0 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 00 sm:text-sm/6"
              onChange={(e) => setProductDescription(e.target.value)}
              value={productDescription}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <p>Fabricante</p>
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
            <label className="" htmlFor="photo_input">
              Foto
            </label>
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
              // Red
              color="#fb2c36"
              colorHover="#e7000b"
              colorDisabled="#ffa2a2"
              content={"Cancelar"}
              disabled={false}
              onClickFunction={() => setAddProductForm(false)}
              adicionalStyle="w-24 px-4 py-2 text-white"
            />
            <AnimatedButton
              // Green
              color="#00c950"
              colorHover="#00a63e"
              colorDisabled="#7bf1a8"
              content={"Criar"}
              disabled={!infos}
              onClickFunction={() => handlePostProduct()}
              adicionalStyle="w-24 px-4 py-2 text-white"
            />
          </div>
        </div>
      </div>
    </>
  );
}
