import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Client } from "../../../../features/client/client.model";

interface ClientsTableProps {
  clients: Client[];
  setClientRemove: Function;
  setRemoveClientForm: Function;
}

export function ClientsTable({ clients, setClientRemove, setRemoveClientForm }: ClientsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const maxButtons = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = (clients ?? []).slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((clients ?? []).length / itemsPerPage);

  const getVisiblePages = (currentPage: number, totalPages: number) => {
    let start = Math.max(currentPage - 1, 1); // começa em 1
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

  function handleRemoveClient(client: Client) {
    setClientRemove(client);
    setRemoveClientForm(true);
  }

  function formatNumber(telephoneNumber: string) {
    const semCodigoPais = telephoneNumber.startsWith("55") ? telephoneNumber.slice(2) : telephoneNumber;

    if (semCodigoPais.length < 10) return telephoneNumber;

    const ddd = semCodigoPais.slice(0, 2);
    const isCelular = semCodigoPais.length === 11;
    const parte1 = isCelular ? semCodigoPais.slice(2, 7) : semCodigoPais.slice(2, 6);
    const parte2 = isCelular ? semCodigoPais.slice(7) : semCodigoPais.slice(6);

    return `(${ddd}) ${parte1}-${parte2}`;
  }

  return (
    <>
      <div className="overflow-x-auto shadow-md rounded-lg mt-5">
        <table className="w-full max-h-fit text-sm text-center text-white0 outline-5 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-300">
            <tr>
              <th scope="col" className="2xl:px-4 2xl:py-3 py-2 w-60 border-r-2 border-gray-400">
                Nome
              </th>
              <th scope="col" className="w-50 border-r-2 border-gray-400">
                Email
              </th>
              <th scope="col" className=" w-50 border-r-2 border-gray-400">
                Telefone
              </th>
              <th scope="col" className="px-6">
                <span className="sr-only">Remove</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((obj) => (
              <tr className="bg-gray-100 border-b border-gray-500 hover:bg-gray-50 2xl:text-base text-xs">
                <th scope="row" className="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap border-r-2 border-gray-300">
                  {obj.name}
                </th>
                <td className="cursor-pointer px-6 py-4 text-center text-gray-900 font-medium border-r-2 border-gray-300">{obj.email}</td>
                <td className="cursor-pointer px-6 py-4 text-center text-gray-900 font-medium border-r-2 border-gray-300">
                  {formatNumber(obj.number)}
                </td>
                <td className="px-6 py-4 font-medium text-right">
                  <button
                    onClick={() => handleRemoveClient(obj)}
                    type="button"
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
          className="2xl:px-3 2xl:py-1 px-2.5 2xl:text-base text-xs bg-gray-200 rounded disabled:opacity-50 cursor-pointer disabled:cursor-default"
        >
          <ArrowLeft className="2xl:size-6 size-5" />
        </button>
        {getVisiblePages(currentPage, totalPages).map((i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`2xl:px-3 2xl:py-1 px-2.5 2xl:text-base text-xs rounded ${
              currentPage === i ? "bg-orange-500 text-white" : "bg-gray-200"
            } cursor-pointer`}
          >
            {i}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="2xl:px-3 2xl:py-1 px-2.5 py-0.5 2xl:text-base text-xs bg-gray-200 rounded disabled:opacity-50 cursor-pointer disabled:cursor-default"
        >
          <ArrowRight className="2xl:size-6 size-5" />
        </button>
      </div>
    </>
  );
}
