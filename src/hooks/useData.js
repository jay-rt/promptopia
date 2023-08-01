import useSWR from "swr";
import handleError from "@/utils/handleError";

const useData = (key) => {
  const fetchData = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      await handleError(res);
    }

    return res.json();
  };

  return useSWR(key, fetchData);
};

export default useData;
