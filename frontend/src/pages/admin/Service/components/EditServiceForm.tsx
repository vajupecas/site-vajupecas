import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatedResetButton } from "../../../../components/UI/AnimatedResetButton";
import { AnimatedButton } from "../../../../components/UI/AnimatedButton";
import type { Service } from "../../../../features/service/service.model";

interface EditServiceFormProps {
  service: Service | null;
  editService: Function;
  setEditServiceForm: Function;
  setServiceEdit: Function;
  refreshServices: Function;
}

export function EditServiceForm({ service, editService, setEditServiceForm, setServiceEdit, refreshServices }: EditServiceFormProps) {
  const [serviceName, setServiceName] = useState(service?.name);
  const [serviceDescription, setServiceDescription] = useState(service?.description);
  const [file, setFile] = useState<File | null>(null);
  const [enableEdit, setEnableEdit] = useState(false);

  useEffect(() => {
    if (serviceName !== service?.name || serviceDescription !== service?.description || file !== null) {
      setEnableEdit(true);
    } else {
      setEnableEdit(false);
    }
  }, [serviceName, serviceDescription, file]);

  function cancelEditService() {
    setEditServiceForm(false);
    setServiceEdit(null);
  }

  async function handleEditService() {
    await editService(service?.id, serviceName, serviceDescription, file);
    setServiceEdit(null);
    setEditServiceForm(false);
    await refreshServices();
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50" onClick={() => cancelEditService()}></div>
      <div className="z-50 flex flex-col gap-5 px-16 pb-3 absolute 2xl:w-1/4 bg-gray-200 rounded-lg shadow-lg">
        <h3 className="text-center px-4 py-2 text-2xl bg-orange-500 w-fit self-center rounded-b-lg text-white">EDITAR SERVIÇO</h3>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-row gap-1.5 items-center">
              <label htmlFor="name">Nome</label>
              <AnimatedResetButton
                content={<RotateCcw size={14} color="black" />}
                onClickFunction={() => setServiceName(service?.name ? service.name : "")}
              />
            </div>
            <input
              className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-200 placeholder:text-white0 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 00 sm:text-sm/6"
              id="name"
              type="text"
              onChange={(e) => setServiceName(e.target.value)}
              value={serviceName}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-row gap-1.5 items-center">
              <label htmlFor="description">Descrição</label>
              <AnimatedResetButton
                content={<RotateCcw size={14} color="black" />}
                onClickFunction={() => setServiceDescription(service?.description ?? "")}
              />
            </div>
            <textarea
              name="description"
              id="description"
              className="block w-full min-h-10 h-30 rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-200 placeholder:text-white0 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 00 sm:text-sm/6"
              onChange={(e) => setServiceDescription(e.target.value)}
              value={serviceDescription}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="" htmlFor="photo_input">
              Foto (Proporção 4:5)
            </label>
            <input
              className="block cursor-pointer w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-200"
              id="file_input"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            />
          </div>
          <div className="flex w-full justify-between mt-3">
            <AnimatedButton
              // Red
              color="#fb2c36"
              colorHover="#e7000b"
              colorDisabled="#ffa2a2"
              content={"Cancelar"}
              disabled={false}
              onClickFunction={() => cancelEditService()}
              adicionalStyle="w-24 px-4 py-2 text-white"
            />
            <AnimatedButton
              // Green
              color="#00c950"
              colorHover="#00a63e"
              colorDisabled="#7bf1a8"
              content={"Confirmar"}
              disabled={!enableEdit}
              onClickFunction={() => handleEditService()}
              adicionalStyle="w-24 px-4 py-2 text-white"
            />
          </div>
        </div>
      </div>
    </>
  );
}
