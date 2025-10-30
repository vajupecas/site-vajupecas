import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import API from "../api/axios.ts";
import type { Text } from "../features/texts/texts.model.ts";

interface ITextsContext {
  texts: Text[];
  loadingTexts: boolean;
  findText: (name: string) => string;
}
const TextsContext = createContext<ITextsContext | null>(null);

export const TextsProvider = ({ children }: { children: React.ReactNode }) => {
  const [texts, setTexts] = useState<Text[]>([]);
  const [loadingTexts, setLoading] = useState(true);

  useEffect(() => {
    const fetchTexts = async () => {
      try {
        const response = await API.get("/texts");
        setTexts(response.data);
      } catch (error) {
        console.error("Erro ao carregar textos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTexts();
  }, []);

  const textsMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const text of texts) {
      map.set(text.name, text.content);
    }
    return map;
  }, [texts]);

  const findText = useCallback(
    (name: string) => {
      return textsMap.get(name) || `[${name}]`;
    },
    [textsMap]
  );

  return <TextsContext.Provider value={{ texts, loadingTexts, findText }}>{children}</TextsContext.Provider>;
};

export const useTexts = () => {
  const context = useContext(TextsContext);
  if (!context) {
    throw new Error("useTexts deve ser usado dentro de TextsProvider");
  }
  return context;
};
