import { useEffect, useState } from "react";
import { getSliderImages, postSliderImage, deleteSliderImage, updateSliderImage } from "../../../features/slider/slider.service";
import type { SliderImage } from "../../../features/slider/slider.model";
import { uploadFile } from "../../../features/media/media.service";

export function useSliderPage() {
  const [loading, setLoading] = useState(true);
  const [filterSearch, setFilterSearch] = useState("");
  const [sliderImages, setSliderImages] = useState<SliderImage[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getSliderImages();
      setLoading(false);
      setSliderImages(data);
    };
    fetchData();
  }, []);

  const refreshSlider = async () => setSliderImages(await getSliderImages());

  const addSliderImage = async (sliderImageName: string, file: File) => {
    const response_image = file ? await uploadFile(file) : { url: "" };
    const url_image = response_image.url;
    const data = {
      name: sliderImageName,
      url_image: url_image,
    };

    return postSliderImage(data);
  };

  const editSliderImage = async (sliderImageId: number, sliderImageName: string, file: File) => {
    const response_image = file ? await uploadFile(file) : { url: "" };
    const url_image = response_image.url;
    const data = {
      name: sliderImageName,
      url_image: url_image,
    };

    return updateSliderImage(sliderImageId, data);
  };

  async function removeSliderImage(productId: number) {
    return deleteSliderImage(productId);
  }

  const filteredSlider = filterSearch
    ? sliderImages.filter((obj) => obj.name.toLowerCase().includes(filterSearch.toLocaleLowerCase()))
    : sliderImages;

  return {
    slider: filteredSlider,
    loading,
    addSliderImage,
    editSliderImage,
    removeSliderImage,
    refreshSlider,
    setFilterSearch,
    filterSearch,
  };
}
