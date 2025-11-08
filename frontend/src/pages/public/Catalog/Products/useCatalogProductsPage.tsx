import { useEffect, useState } from "react";
import type { ProductResponseDTO } from "../../../../features/product/product.model";
import {
  getProductsByProducer,
  getProductsByProducerSlug,
  getProductsByProductModelSlug,
  getProductsByProductTypeSlug,
} from "../../../../features/product/product.service";
import type { ProducerSummaryDTO } from "../../../../features/producer/producer.model";
import { getProducersByTypeSlug } from "../../../../features/product_type/productType.service";
interface UseCatalogProductsPageParams {
  productTypeSlug: string;
  producerSlug?: string;
  modelSlug?: string;
}

export function useCatalogProductsPage({ productTypeSlug, producerSlug, modelSlug }: UseCatalogProductsPageParams) {
  const [products, setProducts] = useState<ProductResponseDTO[]>([]);
  const [producers, setProducers] = useState<ProducerSummaryDTO[]>([]);
  const [filterSearch, setFilterSearch] = useState("");
  const [producerSelected, setProducerSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let fetchedProducts: ProductResponseDTO[] = [];
      let fetchedProducers: ProducerSummaryDTO[] = [];
      if (producerSlug) {
        fetchedProducts = await getProductsByProducerSlug(producerSlug);
      } else if (modelSlug) {
        fetchedProducers = await getProducersByTypeSlug(productTypeSlug);
        fetchedProducts = await getProductsByProductModelSlug(modelSlug);
      } else if (productTypeSlug) {
        fetchedProducers = await getProducersByTypeSlug(productTypeSlug);
        fetchedProducts = await getProductsByProductTypeSlug(productTypeSlug);
      }

      setProducers(fetchedProducers);
      setProducts(fetchedProducts);
      setLoading(false);
    };

    fetchData();
  }, [productTypeSlug, producerSlug, modelSlug]);

  const refreshProducts = async () => {
    let fetchedProducts: ProductResponseDTO[] = [];
    if (producerSlug) {
      fetchedProducts = await getProductsByProducerSlug(producerSlug);
    } else if (modelSlug) {
      fetchedProducts = await getProductsByProductModelSlug(modelSlug);
    } else if (productTypeSlug) {
      fetchedProducts = await getProductsByProductTypeSlug(productTypeSlug);
    }

    setProducts(fetchedProducts);
  };

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
    producerSelected,
    loading,
    filterSearch,
    filterByProducer,
    setFilterSearch,
  };
}
