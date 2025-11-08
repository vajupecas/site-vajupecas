import { useEffect, useState } from "react";
import type { ProductTypeResponseDTO } from "../../../features/product_type/productType.model";
import { deleteProductType, getProductTypes, postProductType, updateProductType } from "../../../features/product_type/productType.service";

export function useProductTypePage() {
  const [productTypes, setProductTypes] = useState<ProductTypeResponseDTO[]>([]);
  const [filterSearch, setFilterSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getProductTypes();
      setLoading(false);
      setProductTypes(data);
    };
    fetchData();
  }, []);

  const refreshProductTypes = async () => setProductTypes(await getProductTypes());

  const addProductType = async (productTypeName: string, producTypeHasProcucer: boolean, productTyoeHasProductModel: boolean) => {
    const data = {
      name: productTypeName,
      has_producer: producTypeHasProcucer,
      has_product_model: productTyoeHasProductModel,
    };

    return postProductType(data);
  };

  const editProductType = async (
    productTypeId: number,
    productTypeName: string,
    producTypeHasProcucer: boolean,
    productTyoeHasProductModel: boolean
  ) => {
    const data = {
      name: productTypeName,
      has_producer: producTypeHasProcucer,
      has_product_model: productTyoeHasProductModel,
    };

    return updateProductType(productTypeId, data);
  };

  const removeProductType = async (productTypeId: number) => {
    return deleteProductType(productTypeId);
  };

  const filteredProductTypes = filterSearch
    ? productTypes.filter((obj) => obj.name.toLowerCase().includes(filterSearch.toLowerCase()))
    : productTypes;

  return {
    productTypes: filteredProductTypes,
    loading,
    refreshProductTypes,
    addProductType,
    editProductType,
    removeProductType,
    filterSearch,
    setFilterSearch,
  };
}
