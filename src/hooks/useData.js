import useSWR from "swr";

const useData = (key) => {
  const fetchData = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      // Attach extra info to the error object.
      const error = new Error();
      error.message = await res.text();
      error.status = res.status;
      throw error;
    }

    return res.json();
  };

  return useSWR(key, fetchData);
};

export default useData;
