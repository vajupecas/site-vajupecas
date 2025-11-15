import { useState } from "react";
import type { ProducerResponseDTO } from "../../../../features/producer/producer.model";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ProducersTableProps {
  producers: ProducerResponseDTO[];
  setProducerEdit: Function;
  setEditProducerForm: Function;
  setProducerRemove: Function;
  setRemoveProducerForm: Function;
}

export default function ProducersTable({
  producers,
  setProducerEdit,
  setEditProducerForm,
  setProducerRemove,
  setRemoveProducerForm,
}: ProducersTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const maxButtons = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = producers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(producers.length / itemsPerPage);

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

  function handleEditProducerForm(producer: ProducerResponseDTO) {
    setProducerEdit(producer);
    setEditProducerForm(true);
  }

  function handleRemoveProducerForm(producer: ProducerResponseDTO) {
    setProducerRemove(producer);
    setRemoveProducerForm(true);
  }

  return (
    <>
      <div className="overflow-x-auto shadow-md rounded-lg mt-5">
        <table className="w-full max-h-fit text-sm text-left rtl:text-right text-white0 outline-5">
          <thead className="text-xs text-center text-gray-700 uppercase bg-gray-300">
            <tr>
              <th scope="col" className="2xl:px-4 2xl:py-3 py-2 w-58 border-r-2 border-gray-400">
                Nome
              </th>
              <th scope="col" className="2xl:px-4 2xl:py-3 w-58 border-r-2 border-gray-400">
                Família
              </th>
              <th scope="col" className="2xl:px-4 2xl:py-3 w-40 border-r-2 border-gray-400">
                Tem Modelos?
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
              <tr id={`${obj.id}`} className="bg-gray-100 border-b  border-gray-500 hover:bg-gray-50 text-center 2xl:text-base text-xs">
                <th scope="row" className="2xl:px-6 2xl:py-4 font-medium text-gray-900 whitespace-nowrap border-r-2 border-gray-300">
                  {obj.name}
                </th>
                <td className="px-6 py-4 text-gray-700 font-medium border-r-2 border-gray-300">{obj.product_type.name}</td>
                <td className="px-6 py-4 text-gray-700 font-medium border-r-2 border-gray-300">{obj.has_model ? "Sim" : "Não"}</td>
                <td className="px-6 py-4 font-medium text-right ">
                  <button onClick={() => handleEditProducerForm(obj)} className="cursor-pointer text-blue-600 hover:underline">
                    Editar
                  </button>
                </td>
                <td className="px-6 py-4 font-medium text-right">
                  <button
                    onClick={() => handleRemoveProducerForm(obj)}
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
