import { useEffect, useState } from "react";
import type { ProducerResponseDTO } from "../../../../features/producer/producer.model";
import { getProductModelsByTypeSlug } from "../../../../features/product_type/productType.service";

export function useCatalogModelsPage(productTypeSlug: string) {
  const [models, setModels] = useState<ProducerResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setModels(await getProductModelsByTypeSlug(productTypeSlug));
      setLoading(false);
    };
    fetchData();
  }, [productTypeSlug]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setModels(await getProductModelsByTypeSlug(productTypeSlug));
      setLoading(false);
    };
    fetchData();
  }, []);

  return {
    models,
    loading,
  };
}
