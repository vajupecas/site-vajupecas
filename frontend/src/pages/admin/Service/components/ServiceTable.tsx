import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Service } from "../../../../features/service/service.model";

interface ServiceTableProps {
  services: Service[];
  setServiceEdit: Function;
  setEditServiceForm: Function;
  setServiceRemove: Function;
  setRemoveServiceForm: Function;
}

export function ServiceTable({ services, setServiceEdit, setEditServiceForm, setServiceRemove, setRemoveServiceForm }: ServiceTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const maxButtons = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = services.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(services.length / itemsPerPage);

  const getVisiblePages = (currentPage: number, totalPages: number) => {
    let start = Math.max(currentPage - 1, 1);
    let end = start + maxButtons - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - maxButtons + 1, 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  function handleEditServiceForm(service: Service) {
    setServiceEdit(service);
    setEditServiceForm(true);
  }

  function handleRemoveServiceForm(service: Service) {
    setServiceRemove(service);
    setRemoveServiceForm(true);
  }

  return (
    <>
      <div className="overflow-x-auto shadow-md rounded-lg mt-5">
        <table className="w-full max-h-fit text-sm text-center text-white0 outline-5 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3 w-65  border-r-2 border-gray-400">
                Nome
              </th>
              <th scope="col" className="px-6 py-3 w-65 border-r-2 border-gray-400">
                Descrição
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Remove</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((obj) => (
              <tr className="bg-gray-100 border-b border-gray-500 hover:bg-gray-50">
                <th scope="row" className="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap border-r-2 border-gray-300">
                  {obj.name}
                </th>
                <td
                  className="cursor-pointer px-6 py-4 truncate text-center text-gray-900 font-medium border-r-2 border-gray-300"
                  title={obj.description}
                >
                  {obj.description.slice(0, 10) + `${obj.description.length > 10 ? "..." : ""}`}
                </td>
                <td className="px-6 py-4 font-medium text-center">
                  <button onClick={() => handleEditServiceForm(obj)} type="button" className="cursor-pointer text-blue-600 hover:underline">
                    Editar
                  </button>
                </td>
                <td className="px-6 py-4 font-medium text-right">
                  <button
                    onClick={() => handleRemoveServiceForm(obj)}
                    className="cursor-pointer rounded-lg bg-red-500 hover:bg-red-600 text-white px-4 py-2"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-5 space-x-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer disabled:cursor-default"
        >
          <ArrowLeft />
        </button>

        {getVisiblePages(currentPage, totalPages).map((i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`px-3 py-1 rounded ${currentPage === i ? "bg-orange-500 text-white" : "bg-gray-200"} cursor-pointer`}
          >
            {i}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer disabled:cursor-default"
        >
          <ArrowRight />
        </button>
      </div>
    </>
  );
}
