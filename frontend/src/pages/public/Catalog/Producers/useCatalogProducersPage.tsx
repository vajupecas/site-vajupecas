import { useEffect, useState } from "react";
import type { ProducerResponseDTO } from "../../../../features/producer/producer.model";
import { getProducersByTypeSlug } from "../../../../features/product_type/productType.service";

export function useCatalogProducersPage(productTypeSlug: string) {
  const [producers, setProducers] = useState<ProducerResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setProducers(await getProducersByTypeSlug(productTypeSlug));
      setLoading(false);
    };
    fetchData();
  }, [productTypeSlug]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setProducers(await getProducersByTypeSlug(productTypeSlug));
      setLoading(false);
    };
    fetchData();
  }, []);

  return {
    producers,
    loading,
  };
}
