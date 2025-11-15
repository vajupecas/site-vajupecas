import { useState } from "react";
import { Search, Loader } from "lucide-react";
import Alert from "../../../components/UI/Alert";
import AdminNavbar from "../../../components/Layout/AdminNavbar";
import { useClientPage } from "./useClientsPage";
import { RemoveClientForm } from "./components/RemoveClientsForm";
import { ClientsTable } from "./components/ClientsTable";
import type { Client } from "../../../features/client/client.model";

export default function ClientsPage() {
  const { clients, loading, refreshClients, removeClient, filterSearch, setFilterSearch } = useClientPage();

  const [clientRemove, setClientRemove] = useState<Client | null>(null);
  const [removeClientForm, setRemoveClientForm] = useState(false);

  const [alert, setAlert] = useState(false);
  const [alertColor, setAlertColor] = useState("");
  const [alertText, setAlertText] = useState("");
  const [alertIcon, setAlertIcon] = useState<React.ReactNode | null>(null);

  function resetAlert() {
    setAlert(false);
    setAlertColor("");
    setAlertText("");
    setAlertIcon(null);
  }

  return (
    <>
      <div className="min-h-screen w-screen flex">
        <AdminNavbar />
        <div className="flex-1 justify-self-center flex flex-col gap-14 2xl:mt-20 lg:mt-15 mx-12 mb-12 items-center">
          <h2 className="w-full 2xl:text-5xl lg:text-4xl text-center text-orange-500 font-semibold">CLIENTES</h2>
          <div className="2xl:w-1/2 xl:w-4/6 w-5/6 h-full">
            <div className="flex justify-end">
              <div className="relative flex items-center">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="filter-search"
                  id="filter-search"
                  placeholder="Pesquisar Clientes"
                  className="w-full 2xl:pl-10 2xl:pr-3 2xl:py-2 2xl:text-base pr-2 py-1.5 pl-9 text-sm outline-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filterSearch}
                  onChange={(e) => setFilterSearch(e.target.value)}
                />
              </div>
            </div>
            {clients.length === 0 && (
              <div className="self-center justify-self-center flex items-center h-full">
                {loading && <Loader className="mb-40 animate-spin" />}
                {!loading && <p className="text-white0 mb-40">Nenhum Cliente Cadastrado</p>}
              </div>
            )}
            {clients.length != 0 && (
              <>
                <ClientsTable clients={clients} setClientRemove={setClientRemove} setRemoveClientForm={setRemoveClientForm} />
              </>
            )}
          </div>
          {removeClientForm && (
            <RemoveClientForm
              client={clientRemove}
              refreshClients={refreshClients}
              removeClient={removeClient}
              setClientRemove={setClientRemove}
              setRemoveClientForm={setRemoveClientForm}
            />
          )}
        </div>
        {alert && <Alert color={alertColor} text={alertText} icon={alertIcon} onClose={() => resetAlert()} />}
      </div>
    </>
  );
}
