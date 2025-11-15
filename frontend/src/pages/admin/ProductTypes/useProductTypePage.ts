import { useEffect, useState } from "react";
import type { ProductTypeResponseDTO } from "../../../features/product_type/productType.model";
import {
  deleteProductType,
  getProductTypes,
  postProductType,
  reorderProductTypes,
  updateProductType,
} from "../../../features/product_type/productType.service";
import { uploadFile } from "../../../features/media/media.service";

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

  const addProductType = async (productTypeName: string, producTypeHasProcucer: boolean, file: File) => {
    const response_image = file ? await uploadFile(file) : { url: "" };
    const url_image = response_image.url;

    const data = {
      name: productTypeName,
      has_producer: producTypeHasProcucer,
      url_image: url_image,
    };

    return postProductType(data);
  };

  const editProductType = async (productTypeId: number, productTypeName: string, file: File | null = null, producTypeHasProcucer: boolean) => {
    const response_image = file ? await uploadFile(file) : { url: "" };
    const url_image = response_image.url;

    const data: any = {
      name: productTypeName,
      has_producer: producTypeHasProcucer,
    };

    if (url_image !== "") {
      data.url_image = url_image;
    }

    return updateProductType(productTypeId, data);
  };

  const removeProductType = async (productTypeId: number) => {
    return deleteProductType(productTypeId);
  };

  const reorderTypes = async (orderedIds: number[]) => {
    try {
      await reorderProductTypes(orderedIds);
      await refreshProductTypes();
    } catch (error) {
      console.error("Falha ao reordenar tipos de produto:", error);
    }
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
    reorderTypes,
    filterSearch,
    setFilterSearch,
  };
}
