import { useEffect, useState } from "react";
import type { ProductResponseDTO } from "../../../../features/product/product.model";
import { getProductsByProducerSlug, getProductsByProductTypeSlug, getProductsByModel } from "../../../../features/product/product.service";
import type { ModelResponseDTO } from "../../../../features/model/models.model";
import { getModelsByProducerSlug } from "../../../../features/producer/producer.service";

interface UseCatalogProductsPageParams {
  productTypeSlug: string;
  producerSlug?: string;
}

export function useCatalogProductsPage({ productTypeSlug, producerSlug }: UseCatalogProductsPageParams) {
  const [products, setProducts] = useState<ProductResponseDTO[]>([]);
  const [models, setModels] = useState<ModelResponseDTO[]>([]);
  const [filterSearch, setFilterSearch] = useState("");
  const [modelSelected, setModelSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let fetchedProducts: ProductResponseDTO[] = [];
      let fetchedModels: ModelResponseDTO[] = [];
      if (producerSlug) {
        fetchedProducts = await getProductsByProducerSlug(producerSlug);
        fetchedModels = await getModelsByProducerSlug(producerSlug);
      } else if (productTypeSlug) {
        fetchedProducts = await getProductsByProductTypeSlug(productTypeSlug);
      }
      setProducts(fetchedProducts);
      setModels(fetchedModels);
      setLoading(false);
    };

    fetchData();
  }, [productTypeSlug, producerSlug]);

  const refreshProducts = async () => {
    let fetchedProducts: ProductResponseDTO[] = [];
    if (producerSlug) {
      fetchedProducts = await getProductsByProducerSlug(producerSlug);
    } else if (productTypeSlug) {
      fetchedProducts = await getProductsByProductTypeSlug(productTypeSlug);
    }

    setProducts(fetchedProducts);
  };

  const filterByModel = async (modelId: number) => {
    if (modelSelected === modelId) {
      setModelSelected(null);
      return refreshProducts();
    }
    setModelSelected(modelId);
    setProducts(await getProductsByModel(modelId));
  };

  const filteredProducts = filterSearch ? products.filter((obj) => obj.name.toLowerCase().includes(filterSearch.toLowerCase())) : products;

  return {
    products: filteredProducts,
    models,
    modelSelected,
    loading,
    filterSearch,
    filterByModel,
    setFilterSearch,
  };
}
