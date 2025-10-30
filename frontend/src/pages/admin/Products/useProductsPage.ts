import { useEffect, useState } from "react";
import type { ProductResponseDTO } from "../../../features/product/product.model";
import type { ProducerResponseDTO } from "../../../features/producer/producer.model";
import { deleteProduct, getProducts, getProductsByProducer, postProduct, updateProduct } from "../../../features/product/product.service";
import { getProducers } from "../../../features/producer/producer.service";
import { uploadFile } from "../../../features/media/media.service";

export function useProductsPage() {
  const [products, setProducts] = useState<ProductResponseDTO[]>([]);
  const [producers, setProducers] = useState<ProducerResponseDTO[]>([]);
  const [filterSearch, setFilterSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [producerSelected, setProducerSelected] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setProducts(await getProducts());
      setProducers(await getProducers());
      setLoading(false);
    };
    fetchData();
  }, []);

  const refreshProducts = async () => setProducts(await getProducts());

  const addProduct = async (productName: string, productDescription: string, file: File, productProducer: string) => {
    const response_image = file ? await uploadFile(file) : { url: "" };
    const url_image = response_image.url;

    const data = {
      name: productName,
      description: productDescription,
      url_image: url_image,
      producer_id: Number(productProducer),
    };

    return postProduct(data);
  };

  const editProduct = async (
    productId: number,
    productName: string,
    productDescription: string,
    file: File | null = null,
    productProducer: string
  ) => {
    const response_image = file ? await uploadFile(file) : { url: "" };
    const url_image = response_image.url;

    const data: any = {
      name: productName,
      description: productDescription,
      producer_id: Number(productProducer),
    };

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
