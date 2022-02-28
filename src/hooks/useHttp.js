import { useCallback } from "react";

const useHttp = () => {
  const fetchData = useCallback(
    (
      { url, method = "GET", body = null, headers = {} },
      applyData,
      errorHandler
    ) => {
      fetch(url, {
        method,
        body,
        headers,
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          applyData(res);
        })
        .catch((err) => {
          if (errorHandler) {
            errorHandler(err.message || "Something went wrong!");
          } else {
            return "Something went wrong";
          }
        });
    },
    []
  );

  return { fetchData };
};

export default useHttp;
