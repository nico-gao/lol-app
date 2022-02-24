import { useState, useCallback } from "react";

const useHttp = () => {
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(false);

  const fetchData = useCallback(
    ({ url, method = "GET", body = null, headers = {} }, applyData) => {
      setloading(true);
      fetch(url, {
        method,
        body,
        headers,
      })
        .then((res) => res.json())
        .then((res) => {
          applyData(res);
        })
        .catch((err) => {
          setError(err.message || "Something went wrong!");
        })
        .finally(() => {
          setloading(false);
        });
    },
    []
  );

  return { error, loading, fetchData };
};

export default useHttp;
