import { useState, useEffect } from "react";
import type { ProductTypeResponseDTO } from "../../../../features/product_type/productType.model";
import { ArrowLeft, ArrowRight, GripVertical } from "lucide-react";

import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ProductTypesTableProps {
  productTypes: ProductTypeResponseDTO[];
  setProductTypeEdit: Function;
  setEditProductTypeForm: Function;
  setProductTypeRemove: Function;
  setRemoveProductTypeForm: Function;
  reorderMode: boolean;
  reorderTypes: (ids: number[]) => Promise<void>;
}

function SortableProductTypeRow(props: { productType: ProductTypeResponseDTO }) {
  const { productType } = props;

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: productType.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 10 : 0,
    position: "relative" as "relative",
  };

  return (
    <tr ref={setNodeRef} style={style} className="bg-gray-100 border-b border-gray-500 2xl:text-base text-xs">
      <td {...attributes} {...listeners} className="py-4 text-center cursor-grab touch-none">
        <GripVertical className="inline-block text-gray-500" />
      </td>

      <th scope="row" className="2xl:px-6 2xl:py-4 font-medium text-center text-gray-900 whitespace-nowrap border-r-2 border-gray-300">
        {productType.name}
      </th>
      <td className="px-6 py-4 text-center text-gray-900 font-medium border-r-2 border-gray-300">{productType.has_producer ? "Sim" : "Não"}</td>

      <td className="px-6 py-4 font-medium text-right">
        <span className="text-gray-400">Editar</span>
      </td>
      <td className="px-6 py-4 font-medium text-right">
        <span className="text-gray-400">Remover</span>
      </td>
    </tr>
  );
}

export function ProductTypesTable({
  productTypes,
  setProductTypeEdit,
  setEditProductTypeForm,
  setProductTypeRemove,
  setRemoveProductTypeForm,
  reorderMode,
  reorderTypes,
}: ProductTypesTableProps) {
  const [localItems, setLocalItems] = useState(productTypes);

  useEffect(() => {
    setLocalItems(productTypes);
  }, [productTypes, reorderMode]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const maxButtons = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = (localItems ?? []).slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((localItems ?? []).length / itemsPerPage);

  const getVisiblePages = (currentPage: number, totalPages: number) => {
    let start = Math.max(currentPage - 1, 1);
    let end = start + maxButtons - 1;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - maxButtons + 1, 1);
    }
    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  function handleEditProductTypeForm(productType: ProductTypeResponseDTO) {
    setProductTypeEdit(productType);
    setEditProductTypeForm(true);
  }

  function handleRemoveProductType(productType: ProductTypeResponseDTO) {
    setProductTypeRemove(productType);
    setRemoveProductTypeForm(true);
  }
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = localItems.findIndex((item) => item.id === active.id);
      const newIndex = localItems.findIndex((item) => item.id === over.id);
      const newArray = arrayMove(localItems, oldIndex, newIndex);
      setLocalItems(newArray);

      const newOrderedIds = newArray.map((item) => item.id);
      await reorderTypes(newOrderedIds);
    }
  }
  if (reorderMode) {
    return (
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="overflow-x-auto shadow-md rounded-lg mt-5">
          <table className="w-full max-h-fit text-sm text-center outline-5 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-300">
              <tr>
                <th scope="col" className="w-10">
                  <span className="sr-only">Arrastar</span>
                </th>
                <th scope="col" className="2xl:px-4 2xl:py-3 py-2 w-60 border-r-2 border-gray-400">
                  Nome
                </th>
                <th scope="col" className="w-50 border-r-2 border-gray-400">
                  Tem Fabricante?
                </th>
                <th scope="col">
                  <span className="sr-only">Edit</span>
                </th>
                <th scope="col">
                  <span className="sr-only">Remove</span>
                </th>
              </tr>
            </thead>
            <SortableContext items={localItems} strategy={verticalListSortingStrategy}>
              <tbody>
                {localItems.map((obj) => (
                  <SortableProductTypeRow key={obj.id} productType={obj} />
                ))}
              </tbody>
            </SortableContext>
          </table>
        </div>
      </DndContext>
    );
  }

  return (
    <>
      <div className="overflow-x-auto shadow-md rounded-lg mt-5">
        <table className="w-full max-h-fit text-sm text-center outline-5 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-300">
            <tr>
              <th scope="col" className="2xl:px-4 2xl:py-3 py-2 w-60 border-r-2 border-gray-400">
                Nome
              </th>
              <th scope="col" className="w-50 border-r-2 border-gray-400">
                Tem Fabricante?
              </th>
              <th scope="col">
                <span className="sr-only">Edit</span>
              </th>
              <th scope="col">
                <span className="sr-only">Remove</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((obj) => (
              <tr key={obj.id} className="bg-gray-100 border-b border-gray-500 hover:bg-gray-50 2xl:text-base text-xs">
                <th scope="row" className="2xl:px-6 2xl:py-4 font-medium text-center text-gray-900 whitespace-nowrap border-r-2 border-gray-300">
                  {obj.name}
                </th>
                <td className="cursor-pointer px-6 py-4 text-center text-gray-900 font-medium border-r-2 border-gray-300">
                  {obj.has_producer ? "Sim" : "Não"}
                </td>
                <td className="px-6 py-4 font-medium text-right">
                  <button onClick={() => handleEditProductTypeForm(obj)} type="button" className="cursor-pointer text-blue-600 hover:underline">
                    Editar
                  </button>
                </td>
                <td className="px-6 py-4 font-medium text-right">
                  <button
                    onClick={() => handleRemoveProductType(obj)}
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
