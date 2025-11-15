import { useEffect, useState } from "react";
import type { ProducerSummaryDTO } from "../../../../features/producer/producer.model";
import { AnimatedButton } from "../../../../components/UI/AnimatedButton";
import type { ProductTypeSummaryDTO } from "../../../../features/product_type/productType.model";
import type { ModelResponseDTO } from "../../../../features/model/models.model";

interface AddProductFormProps {
  addProduct: Function;
  setAddProductForm: Function;
  producers: ProducerSummaryDTO[];
  productTypes: ProductTypeSummaryDTO[];
  models: ModelResponseDTO[];
  refreshProducts: Function;
}

export default function AddProductForm({ addProduct, setAddProductForm, producers, productTypes, models, refreshProducts }: AddProductFormProps) {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productProducer, setProductProducer] = useState<ProducerSummaryDTO | null>(null);
  const [productModel, setProductModel] = useState("");
  const [productProductType, setProductProductType] = useState<ProductTypeSummaryDTO | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [infos, setInfos] = useState(false);

  useEffect(() => {
    const hasBasicInfo = productName.trim() !== "" && productDescription.trim() !== "" && productProductType !== null && file !== null;
    if (!hasBasicInfo) {
      setInfos(false);
      return;
    }
    if (productProductType.has_producer && productProducer === null) {
      setInfos(false);
      return;
    }
    if (productProducer?.has_model && productModel.trim() === "") {
      setInfos(false);
      return;
    }
    setInfos(true);
  }, [productName, productDescription, productProducer, productModel, productProductType, file]);

  async function handlePostProduct() {
    await addProduct(productName, productDescription, file, productProductType?.id, productProducer?.id, productModel);
    setAddProductForm(false);
    await refreshProducts();
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50" onClick={() => setAddProductForm(false)}></div>
      <div className="z-50 flex flex-col gap-5 px-16 pb-3 absolute 2xl:w-1/4 xl:top-5 lg:top-0 bg-gray-200 rounded-lg shadow-lg">
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
              className="block w-full min-h-10 xl:h-30 rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-200 placeholder:text-white0 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 00 sm:text-sm/6"
              onChange={(e) => setProductDescription(e.target.value)}
              value={productDescription}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <p>Família</p>
            <select
              className="bg-gray-50 px-3 py-1.5 rounded-lg"
              onChange={(e) => {
                const selected = productTypes.find((obj) => obj.id === Number(e.target.value)) || null;
                setProductProductType(selected);
              }}
              value={productProductType?.id ?? ""}
            >
              <option value="" selected>
                - Selecionar -
              </option>
              {productTypes.map((obj) => (
                <option key={obj.id} value={obj.id}>
                  {obj.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <p>Fabricante</p>
            <select
              disabled={!productProductType || !productProductType.has_producer}
              className="bg-gray-50 px-3 py-1.5 rounded-lg disabled:bg-gray-100 disabled:text-gray-400"
              onChange={(e) => {
                const selected = producers.find((obj) => obj.id === Number(e.target.value)) || null;
                setProductProducer(selected);
              }}
              value={productProducer?.id ?? ""}
            >
              <option value="" selected>
                - Selecionar -
              </option>
              (
              {producers
                .filter((obj) => obj.product_type_id == Number(productProductType?.id))
                .map((obj) => (
                  <option value={`${obj.id}`}>{obj.name}</option>
                ))}
              )
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <p>Modelo</p>
            <select
              disabled={!productProducer || !productProducer.has_model}
              className="bg-gray-50 px-3 py-1.5 rounded-lg disabled:bg-gray-100 disabled:text-gray-400"
              onChange={(e) => setProductModel(e.target.value)}
              value={productModel}
            >
              <option value="" selected>
                - Selecionar -
              </option>
              {models
                .filter((obj) => obj.producer_id == Number(productProducer?.id))
                .map((obj) => (
                  <option value={`${obj.id}`}>{obj.name}</option>
                ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="" htmlFor="photo_input">
              Foto (Proporção 5:4)
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
