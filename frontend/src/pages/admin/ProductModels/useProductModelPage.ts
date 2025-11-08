import { useEffect, useState } from "react";
import type { ProductTypeResponseDTO } from "../../../features/product_type/productType.model";
import { getProductModelsByTypeId, getProductTypes } from "../../../features/product_type/productType.service";
import type { ProductModelResponseDTO } from "../../../features/product_model/productModels.model";
import { deleteProductModel, getProductModels, postProductModel, updateProductModel } from "../../../features/product_model/productModels.service";

export function useProductModelPage() {
  const [productModels, setProductModels] = useState<ProductModelResponseDTO[]>([]);
  const [productTypes, setProductTypes] = useState<ProductTypeResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterSearch, setFilterSearch] = useState("");
  const [productTypeSelected, setProductTypeSelected] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setProductModels(await getProductModels());
      setProductTypes(await getProductTypes());
      setLoading(false);
    };
    fetchData();
  }, []);

  const refreshProductModel = async () => setProductModels(await getProductModels());

  const addProductModel = async (productModelName: string, productModelProductType: number) => {
    const data = {
      name: productModelName,
      product_type_id: productModelProductType,
    };

    return postProductModel(data);
  };

  const editProductModel = async (productModelId: number, productModelName: string, productModelProductType: number) => {
    const data = {
      name: productModelName,
      product_type_id: productModelProductType,
    };

    return updateProductModel(productModelId, data);
  };

  const removeProductModel = async (productModelId: number) => {
    return deleteProductModel(productModelId);
  };

  const filterByProductType = async (productTypeId: number) => {
    if (productTypeSelected === productTypeId) {
      setProductTypeSelected(null);
      return refreshProductModel();
    }
    setProductTypeSelected(productTypeId);
    setProductModels(await getProductModelsByTypeId(productTypeId));
  };

  const filteredProductModels = filterSearch
    ? productModels.filter((obj) => obj.name.toLowerCase().includes(filterSearch.toLowerCase()))
    : productModels;

  return {
    productModels: filteredProductModels,
    productTypes,
    loading,
    productTypeSelected,
    refreshProductModel,
    addProductModel,
    editProductModel,
    removeProductModel,
    filterByProductType,
    filterSearch,
    setFilterSearch,
  };
}
