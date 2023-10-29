import axios from "axios";
import { useEffect, useState } from "react";

export default function useCharacters(url, query) {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchData() {
      try {
        setIsLoading(true);
        // destructure data
        const { data } = await axios.get(`${url}=${query}`, { signal });
        setCharacters(data.results);
      } catch (err) {
        // console.log(err.response.data.error);
        // fetch => err.name==="AbortError"
        //  axios => axios.isCancel();
        if (!axios.isCancel()) {
          toast.error(err.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    }

    // if (query.length < 3) {
    //   // setCharacters([]);
    //   return;
    // }
    fetchData();
    return () => {
      controller.abort();
    };
  }, [query]);

  return { isLoading, characters };
}
