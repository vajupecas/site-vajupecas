import { useEffect, useState } from "react";
import { getTexts, postText, updateText } from "../../../features/texts/texts.service";
import type { Text } from "../../../features/texts/texts.model";

export function useTextsPage() {
  const [loading, setLoading] = useState(true);
  const [filterSearch, setFilterSearch] = useState("");
  const [pageSelected, setPageSelected] = useState("");
  const [texts, setTexts] = useState<Text[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getTexts();
      setLoading(false);
      setTexts(data);
    };
    fetchData();
  }, []);

  const refreshTexts = async () => setTexts(await getTexts());

  const addText = async (textName: string, textContent: string, textPage: string) => {
    const data = {
      name: textName,
      content: textContent,
      page: textPage,
    };

    return postText(data);
  };

  const editText = async (textId: number, textName: string, textContent: string, textPage: string) => {
    const data = {
      name: textName,
      content: textContent,
      page: textPage,
    };

    return updateText(textId, data);
  };

  const filterByPage = async (page: string) => {
    if (pageSelected === page) {
      setPageSelected("");
      return refreshTexts();
    }
    setPageSelected(page);
    setTexts(texts.filter((obj) => obj.page.toLocaleLowerCase().match(page.toLocaleLowerCase())));
  };

  const filteredTexts = filterSearch ? texts.filter((obj) => obj.name.toLowerCase().includes(filterSearch.toLocaleLowerCase())) : texts;

  return {
    texts: filteredTexts,
    loading,
    addText,
    editText,
    refreshTexts,
    filterByPage,
    pageSelected,
    setFilterSearch,
    filterSearch,
  };
}
