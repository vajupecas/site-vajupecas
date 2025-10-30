import { useEffect, useState } from "react";
import { getServices, postService, updateService, deleteService } from "../../../features/service/service.service";
import type { Service } from "../../../features/service/service.model";
import { uploadFile } from "../../../features/media/media.service";

export function useServicePage() {
  const [loading, setLoading] = useState(true);
  const [filterSearch, setFilterSearch] = useState("");
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getServices();
      setLoading(false);
      setServices(data);
    };
    fetchData();
  }, []);

  const refreshServices = async () => setServices(await getServices());

  const addService = async (serviceName: string, serviceDescription: string, file: File) => {
    const response_image = file ? await uploadFile(file) : { url: "" };
    const url_image = response_image.url;
    const data = {
      name: serviceName,
      description: serviceDescription,
      url_image: url_image,
    };

    return postService(data);
  };

  const editService = async (serviceId: number, serviceName: string, serviceDescription: string, file?: File) => {
    let data: any = {
      name: serviceName,
      description: serviceDescription,
    };

    if (file) {
      const response_image = await uploadFile(file);
      const url_image = response_image.url;
      data.url_image = url_image;
    }

    return updateService(serviceId, data);
  };

  async function removeService(productId: number) {
    return deleteService(productId);
  }

  const filteredSlider = filterSearch ? services.filter((obj) => obj.name.toLowerCase().includes(filterSearch.toLocaleLowerCase())) : services;

  return {
    services: filteredSlider,
    loading,
    addService,
    editService,
    removeService,
    refreshServices,
    setFilterSearch,
    filterSearch,
  };
}
