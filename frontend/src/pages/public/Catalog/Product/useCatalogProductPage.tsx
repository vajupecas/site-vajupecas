import { useEffect, useState } from "react";
import type { ProductResponseDTO } from "../../../../features/product/product.model";
import { getProductsBySlug } from "../../../../features/product/product.service";

export function useCatalogProductPage(productSlug: string, modelSlug: string) {
  const [product, setProduct] = useState<ProductResponseDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setProduct(await getProductsBySlug(productSlug, modelSlug));
      setLoading(false);
    };
    fetchData();
  }, [productSlug, modelSlug]);

  return {
    product,
    loading,
  };
}
