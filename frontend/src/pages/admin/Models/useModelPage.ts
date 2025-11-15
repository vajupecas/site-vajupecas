import { useEffect, useState } from "react";
import type { ModelResponseDTO } from "../../../features/model/models.model";
import { deleteModel, getModels, postModel, updateModel } from "../../../features/model/models.service";
import type { ProducerResponseDTO } from "../../../features/producer/producer.model";
import { getModelsByProducerId, getProducers } from "../../../features/producer/producer.service";

export function useModelPage() {
  const [models, setModels] = useState<ModelResponseDTO[]>([]);
  const [producers, setProducers] = useState<ProducerResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterSearch, setFilterSearch] = useState("");
  const [producerSelected, setProducerSelected] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setModels(await getModels());
      setProducers(await getProducers());
      setLoading(false);
    };
    fetchData();
  }, []);

  const refreshModel = async () => setModels(await getModels());

  const addModel = async (modelName: string, modelProducer: number) => {
    const data = {
      name: modelName,
      producer_id: modelProducer,
    };

    return postModel(data);
  };

  const editModel = async (modelId: number, modelName: string, modelProducer: number) => {
    const data = {
      name: modelName,
      producer_id: modelProducer,
    };

    return updateModel(modelId, data);
  };

  const removeModel = async (modelId: number) => {
    return deleteModel(modelId);
  };

  const filterByProducer = async (producerId: number) => {
    if (producerSelected === producerId) {
      setProducerSelected(null);
      return refreshModel();
    }
    setProducerSelected(producerId);
    setModels(await getModelsByProducerId(producerId));
  };

  const filteredModels = filterSearch ? models.filter((obj) => obj.name.toLowerCase().includes(filterSearch.toLowerCase())) : models;

  return {
    models: filteredModels,
    producers,
    loading,
    producerSelected,
    refreshModel,
    addModel,
    editModel,
    removeModel,
    filterByProducer,
    filterSearch,
    setFilterSearch,
  };
}
