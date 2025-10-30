import { useEffect, useState } from "react";
import { deleteProducer, getProducers, postProducer, updateProducer } from "../../../features/producer/producer.service";
import type { ProducerResponseDTO } from "../../../features/producer/producer.model";
import type { ProductTypeResponseDTO } from "../../../features/product_type/productType.model";
import { getProducersByTypeId, getProductTypes } from "../../../features/product_type/productType.service";

export function useProducerPage() {
  const [producers, setProducers] = useState<ProducerResponseDTO[]>([]);
  const [productTypes, setProductTypes] = useState<ProductTypeResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterSearch, setFilterSearch] = useState("");
  const [productTypeSelected, setProductTypeSelected] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setProducers(await getProducers());
      setProductTypes(await getProductTypes());
      setLoading(false);
    };
    fetchData();
  }, []);

  const refreshProducer = async () => setProducers(await getProducers());

  const addProducer = async (producerName: string, producerProductType: number) => {
    const data = {
      name: producerName,
      product_type_id: producerProductType,
    };

    return postProducer(data);
  };

  const editProducer = async (producerId: number, producerName: string, producerProductType: number) => {
    const data = {
      name: producerName,
      product_type_id: producerProductType,
    };

    return updateProducer(producerId, data);
  };

  const removeProducer = async (producerId: number) => {
    return deleteProducer(producerId);
  };

  const filterByProductType = async (productTypeId: number) => {
    if (productTypeSelected === productTypeId) {
      setProductTypeSelected(null);
      return refreshProducer();
    }
    setProductTypeSelected(productTypeId);
    setProducers(await getProducersByTypeId(productTypeId));
  };

  const filteredProducers = filterSearch ? producers.filter((obj) => obj.name.toLowerCase().includes(filterSearch.toLowerCase())) : producers;

  return {
    producers: filteredProducers,
    productTypes,
    loading,
    productTypeSelected,
    refreshProducer,
    addProducer,
    editProducer,
    removeProducer,
    filterByProductType,
    filterSearch,
    setFilterSearch,
  };
}
