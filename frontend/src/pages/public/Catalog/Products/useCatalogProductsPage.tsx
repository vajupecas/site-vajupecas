import { useEffect, useState } from "react";
import type { ProductResponseDTO } from "../../../../features/product/product.model";
import { getProductsByProducerSlug } from "../../../../features/product/product.service";

export function useCatalogProductsPage(producerSlug: string) {
  const [products, setProducts] = useState<ProductResponseDTO[]>([]);
  const [filterSearch, setFilterSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setProducts(await getProductsByProducerSlug(producerSlug));
      setLoading(false);
    };
    fetchData();
  }, [producerSlug]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setProducts(await getProductsByProducerSlug(producerSlug));
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredProducts = filterSearch ? products.filter((obj) => obj.name.toLowerCase().includes(filterSearch.toLowerCase())) : products;

  return {
    products: filteredProducts,
    loading,
    filterSearch,
    setFilterSearch,
  };
}
