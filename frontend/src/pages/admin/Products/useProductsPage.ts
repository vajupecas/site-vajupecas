import { useEffect, useState } from "react";
import type { ProductResponseDTO } from "../../../features/product/product.model";
import type { ProducerResponseDTO } from "../../../features/producer/producer.model";
import { deleteProduct, getProducts, getProductsByProducer, postProduct, updateProduct } from "../../../features/product/product.service";
import { getProducers } from "../../../features/producer/producer.service";
import { uploadFile } from "../../../features/media/media.service";
import type { ProductTypeSummaryDTO } from "../../../features/product_type/productType.model";
import { getProductTypes } from "../../../features/product_type/productType.service";
import type { ProductModelResponseDTO } from "../../../features/product_model/productModels.model";
import { getProductModels } from "../../../features/product_model/productModels.service";

export function useProductsPage() {
  const [products, setProducts] = useState<ProductResponseDTO[]>([]);
  const [producers, setProducers] = useState<ProducerResponseDTO[]>([]);
  const [productTypes, setProductTypes] = useState<ProductTypeSummaryDTO[]>([]);
  const [productModels, setProductModels] = useState<ProductModelResponseDTO[]>([]);
  const [filterSearch, setFilterSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [producerSelected, setProducerSelected] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setProducts(await getProducts());
      setProducers(await getProducers());
      setProductTypes(await getProductTypes());
      setProductModels(await getProductModels());
      setLoading(false);
    };
    fetchData();
  }, []);

  const refreshProducts = async () => setProducts(await getProducts());

  const addProduct = async (
    productName: string,
    productDescription: string,
    file: File,
    productProductTupe: string,
    productProducer: string | null = null,
    productModel: string | null = null
  ) => {
    const response_image = file ? await uploadFile(file) : { url: "" };
    const url_image = response_image.url;

    const data: any = {
      name: productName,
      description: productDescription,
      url_image: url_image,
      product_type_id: Number(productProductTupe),
    };

    if (productProducer !== "") {
      data.producer_id = Number(productProducer);
    }

    if (productModel !== "") {
      data.productModel = Number(productProducer);
    }

    return postProduct(data);
  };

  const editProduct = async (
    productId: number,
    productName: string,
    productDescription: string,
    file: File | null = null,
    productProductTupe: string,
    productProducer: string | null = null,
    productModel: string | null = null
  ) => {
    const response_image = file ? await uploadFile(file) : { url: "" };
    const url_image = response_image.url;

    const data: any = {
      name: productName,
      description: productDescription,
      product_type_id: Number(productProductTupe),
    };

    if (productProducer !== "") {
      data.producer_id = Number(productProducer);
    }

    if (productModel !== "") {
      data.productModel = Number(productProducer);
    }

    if (url_image !== "") {
      data.url_image = url_image;
    }

    return updateProduct(productId, data);
  };

  async function removeProduct(productId: number) {
    return deleteProduct(productId);
  }

  const filterByProducer = async (producerId: number) => {
    if (producerSelected === producerId) {
      setProducerSelected(null);
      return refreshProducts();
    }
    setProducerSelected(producerId);
    setProducts(await getProductsByProducer(producerId));
  };

  const filteredProducts = filterSearch ? products.filter((obj) => obj.name.toLowerCase().includes(filterSearch.toLowerCase())) : products;

  return {
    products: filteredProducts,
    producers,
    productTypes,
    productModels,
    loading,
    producerSelected,
    refreshProducts,
    addProduct,
    editProduct,
    removeProduct,
    filterByProducer,
    filterSearch,
    setFilterSearch,
  };
}
