import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ProductResponseDTO } from "../../../../features/product/product.model";
import { useState } from "react";

interface ProductsTableProps {
  products: ProductResponseDTO[];
  setProductEdit: Function;
  setEditProductForm: Function;
  setProductRemove: Function;
  setRemoveProductForm: Function;
  loading: boolean;
}

export default function ProductsTable({
  products,
  setProductEdit,
  setEditProductForm,
  setProductRemove,
  setRemoveProductForm,
  loading,
}: ProductsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const maxButtons = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = (products ?? []).slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((products ?? []).length / itemsPerPage);

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

  function handleEditProductForm(product: ProductResponseDTO) {
    setProductEdit(product);
    setEditProductForm(true);
  }

  function handleRemoveProductForm(product: ProductResponseDTO) {
    setProductRemove(product);
    setRemoveProductForm(true);
  }

  return (
    <>
      <div className="overflow-x-auto shadow-md rounded-lg mt-5">
        <table className="w-full max-h-fit text-sm text-left rtl:text-right text-white0 outline-5">
          <thead className="text-xs text-gray-700 uppercase bg-gray-300  text-center">
            <tr>
              <th scope="col" className="px-6 py-3 w-40 border-r-2 border-gray-400">
                Nome
              </th>
              <th scope="col" className="px-6 py-3 w-40 border-r-2 border-gray-400">
                Fabricante
              </th>
              <th scope="col" className="px-6 py-3 w-40 border-r-2 border-gray-400">
                Modelo
              </th>
              <th scope="col" className="px-6 py-3 w-54 border-r-2 border-gray-400">
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
              <tr id={`${obj.id}`} className="bg-gray-100 border-b  border-gray-500 hover:bg-gray-50">
                <th scope="row" className="px-6 py-4  text-center font-medium text-gray-900 whitespace-nowrap border-r-2 border-gray-300">
                  {obj.name}
                </th>
                <td className="px-6 py-4  text-center text-gray-900 font-medium border-r-2 border-gray-300">
                  {obj.producer_id ? obj.producer.name : "Não possui"}
                </td>
                <td className="px-6 py-4  text-center text-gray-900 font-medium border-r-2 border-gray-300">
                  {obj.model_id ? obj.model.name : "Não possui"}
                </td>
                <td
                  className="cursor-pointer px-6 py-4 truncate text-center text-gray-900 font-medium border-r-2 border-gray-300"
                  title={obj.description}
                >
                  {obj.description.slice(0, 10) + `${obj.description.length > 10 ? "..." : ""}`}
                </td>
                <td className="px-6 py-4  font-medium text-right">
                  <button
                    disabled={loading}
                    onClick={() => handleEditProductForm(obj)}
                    className="cursor-pointer text-blue-600 disabled:text-blue-200 hover:underline"
                  >
                    Editar
                  </button>
                </td>
                <td className="px-6 py-4 font-medium text-right">
                  <button
                    disabled={loading}
                    onClick={() => handleRemoveProductForm(obj)}
                    className="cursor-pointer rounded-lg bg-red-500 hover:bg-red-600 disabled:bg-red-300 disabled:text-gray-200 text-white px-4 py-2"
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
            className={`2xl:px-3 select-none 2xl:py-1 px-2.5 py-0.5 2xl:text-base text-xs rounded ${
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
