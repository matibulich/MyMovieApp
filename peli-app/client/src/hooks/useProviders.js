import { useState, useEffect, useMemo } from "react";

export const useProviders = (movie) => {
  const [providers, setProviders] = useState([]);

  const options = useMemo(
    () => ({
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_API_AUTH_TOKEN,
      },
    }),
    []
  );

  useEffect(() => {
    const fetchMovieProviders = async () => {
      if (movie) {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}/watch/providers`,
            options
          );
          const data = await response.json();

          const countryProviders =
            data.results?.AR || data.results?.US || data.results?.ES;
          const providersList = [
            ...(countryProviders?.rent || []),
            ...(countryProviders?.buy || []),
            ...(countryProviders?.flatrate || []),
          ];

          // Filtrar duplicados basados en `provider_id`
          const uniqueProviders = Array.from(
            new Map(providersList.map((provider) => [provider.provider_id, provider])).values()
          );

          setProviders(uniqueProviders);
        } catch (error) {
          console.error("Error fetching providers:", error);
          setProviders([]);
        }
      }
    };

    fetchMovieProviders();
  }, [movie, options]);

  return providers;
};