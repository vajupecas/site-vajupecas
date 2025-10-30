import { useEffect, useState } from "react";
import type { Service } from "../../../features/service/service.model";
import { getServices } from "../../../features/service/service.service";

export function useServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setServices(await getServices());
      setLoading(false);
    };
    fetchData();
  }, []);

  return {
    services,
    loading,
  };
}
