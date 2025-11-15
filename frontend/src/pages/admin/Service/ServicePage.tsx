import { useState } from "react";
import { Loader, Search } from "lucide-react";
import Alert from "../../../components/UI/Alert";
import AdminNavbar from "../../../components/Layout/AdminNavbar";
import type { Service } from "../../../features/service/service.model";
import { useServicePage } from "./useServicePage";
import {} from "./components/AddServiceForm";
import { AddServiceForm } from "./components/AddServiceForm";
import { EditServiceForm } from "./components/EditServiceForm";
import { ServiceTable } from "./components/ServiceTable";
import { AnimatedButton } from "../../../components/UI/AnimatedButton";
import RemoveServiceForm from "./components/RemoveServiceForm";

export default function ServicePage() {
  const { services, loading, addService, editService, refreshServices, removeService, setFilterSearch, filterSearch } = useServicePage();
  const [addServiceForm, setAddServiceForm] = useState(false);
  const [editServiceForm, setEditServiceForm] = useState(false);
  const [removeServiceForm, setRemoveServiceForm] = useState(false);
  const [serviceEdit, setServiceEdit] = useState<Service | null>(null);
  const [serviceRemove, setServiceRemove] = useState<Service | null>(null);

  const [alert, setAlert] = useState(false);
  const [alertColor, setAlertColor] = useState("");
  const [alertService, setAlertService] = useState("");
  const [alertIcon, setAlertIcon] = useState<React.ReactNode | null>(null);

  function resetAlert() {
    setAlert(false);
    setAlertColor("");
    setAlertService("");
    setAlertIcon(null);
  }

  return (
    <>
      <div className="h-screen w-screen flex">
        <AdminNavbar />
        <div className="flex-1 justify-self-center flex flex-col gap-14 2xl:mt-20 lg:mt-15 mx-12 mb-12 items-center">
          <h2 className="w-full 2xl:text-5xl lg:text-4xl text-center text-orange-500 font-semibold">SERVIÇOS</h2>
          <div className="2xl:w-1/2 xl:w-4/6 w-5/6 h-full">
            <div className="flex justify-between">
              <div className="flex gap-8">
                <AnimatedButton
                  color="#00c950"
                  colorHover="#00a63e"
                  colorDisabled="#7bf1a8"
                  content={"Adicionar"}
                  disabled={false}
                  onClickFunction={() => setAddServiceForm(true)}
                  adicionalStyle="2xl:px-4 2xl:py-2 px-3 text-white 2xl:text-base text-sm"
                />
              </div>
              <div className="relative flex items-center">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="filter-search"
                  id="filter-search"
                  placeholder="Pesquisar Serviço"
                  className="w-full 2xl:pl-10 2xl:pr-3 2xl:py-2 2xl:text-base pr-2 py-1.5 pl-9 text-sm outline-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filterSearch}
                  onChange={(e) => setFilterSearch(e.target.value)}
                />
              </div>
            </div>
            {services.length === 0 && (
              <div className="self-center justify-self-center flex items-center h-full">
                {loading && <Loader className="mb-40 animate-spin" />}
                {!loading && <p className="text-white0 mb-40">Nenhum Serviço Cadastrado</p>}
              </div>
            )}
            {services.length != 0 && (
              <ServiceTable
                services={services}
                setEditServiceForm={setEditServiceForm}
                setServiceEdit={setServiceEdit}
                setServiceRemove={setServiceRemove}
                setRemoveServiceForm={setRemoveServiceForm}
              />
            )}
          </div>
          {addServiceForm && (
            <>
              <AddServiceForm addService={addService} refreshServices={refreshServices} setAddServiceForm={setAddServiceForm} />
            </>
          )}
          {editServiceForm && (
            <>
              <EditServiceForm
                editService={editService}
                refreshServices={refreshServices}
                setEditServiceForm={setEditServiceForm}
                setServiceEdit={setServiceEdit}
                service={serviceEdit}
              />
            </>
          )}
          {removeServiceForm && (
            <>
              <RemoveServiceForm
                removeService={removeService}
                refreshServices={refreshServices}
                setRemoveServiceForm={setRemoveServiceForm}
                setServiceRemove={setServiceRemove}
                serviceRemove={serviceRemove}
              />
            </>
          )}
        </div>
        {alert && <Alert color={alertColor} text={alertService} icon={alertIcon} onClose={() => resetAlert()} />}
      </div>
    </>
  );
}
