import useSWR from "swr";

const useData = (key) => {
  const fetchData = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      // Attach extra info to the error object.
      res.status === 404
        ? (error.message =
            "404: The resources that you are looking for doesn't exist")
        : (error.message = await res.text());
      error.status = res.status;
      throw error;
    }

    return res.json();
  };

  return useSWR(key, fetchData);
};

export default useData;
