import { useEffect, useState } from "react";
import type { ProductTypeResponseDTO } from "../../../features/product_type/productType.model";
import { getProductTypesWithProducers } from "../../../features/product_type/productType.service";
import type { SliderImage } from "../../../features/slider/slider.model";
import { getSliderImages } from "../../../features/slider/slider.service";

export function useHomePage() {
  const [productTypes, setProductTypes] = useState<ProductTypeResponseDTO[]>([]);
  const [slideImages, setSlideImages] = useState<SliderImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setProductTypes((await getProductTypesWithProducers()).sort((a, b) => a.id - b.id));
      setSlideImages(await getSliderImages());
      setLoading(false);
    };
    fetchData();
  }, []);

  return { productTypes, slideImages, loading };
}
