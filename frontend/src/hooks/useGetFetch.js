import { useState, useEffect } from "react"

const queryString = params =>
  Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join("&")

export default (url, query) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [refetchIndex, setRefetchIndex] = useState(0);

    let options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

    const refetch = () => setRefetchIndex((refetchIndex) => refetchIndex + 1);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch(url + "?" + queryString(query), options);
          const json = await res.json();
          setResponse(json);
        } catch (error) {
          setError(error);
        }
      };

      fetchData();
    }, [refetchIndex, url, JSON.stringify(query)]);
    return [{ response, error }, refetch];
  };