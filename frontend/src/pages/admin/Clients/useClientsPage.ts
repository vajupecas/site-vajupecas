import { useEffect, useState } from "react";
import type { Client } from "../../../features/client/client.model";
import { deleteClient, getClients } from "../../../features/client/client.service";

export function useClientPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [filterSearch, setFilterSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getClients();
      setLoading(false);
      setClients(data);
    };
    fetchData();
  }, []);

  const refreshClients = async () => setClients(await getClients());

  const removeClient = async (clientId: number) => {
    return deleteClient(clientId);
  };

  const filteredClients = filterSearch ? clients.filter((obj) => obj.name.toLowerCase().includes(filterSearch.toLowerCase())) : clients;

  return {
    clients: filteredClients,
    loading,
    refreshClients,
    removeClient,
    filterSearch,
    setFilterSearch,
  };
}
