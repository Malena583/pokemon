import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setLoading(true);
      setData(null);
      setError(null);

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "No se encontró el Pokémon. Verificá el nombre o ID."
              : `Error ${response.status}: No se pudo obtener la información.`
          );
        }

        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message || "Error desconocido al realizar la búsqueda.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
