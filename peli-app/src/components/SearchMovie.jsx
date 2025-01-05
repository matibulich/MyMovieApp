import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "../hooks/useForm";
import { useState, useMemo, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { useMovie } from "../context/MovieContext";
import { useNavigate } from "react-router-dom";

export const SearchMovie = () => {
  const [query, setQuery] = useState(""); // Estado para el query
  const { selectedMovie, setSelectedMovie } = useMovie() // Película seleccionada

  // Opciones de la API
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
  const navigate = useNavigate();
  // Llamada a la API solo cuando `query` cambia
  const { data, loading, error } = useFetch(
    query
      ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          query
        )}&include_adult=false&language=es-ES&page=1`
      : null, // Si no hay query, no se pasa URL
    options
  );

  // Estado del formulario
  const { formstate, handleOnchange } = useForm({ movie: "" });

  // Manejar el submit del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = formstate.movie.trim();

    if (!trimmedQuery) return; // No buscar si el campo está vacío

    // Validar si el `query` existe en las opciones de películas
    const movieExists = movies.includes(trimmedQuery);

    if (!movieExists) {
      alert(
        "La película ingresada no existe. Por favor, selecciona una válida."
      );
      return;
    }

    const selected = data.results.find((movie) => movie.title === trimmedQuery);
    setQuery(trimmedQuery);
    setSelectedMovie(selected); // Actualiza con toda la información de la película
  };

  // Películas obtenidas de la API
  const movies =
    data && data.results ? data.results.map((movie) => movie.title) : [];

  // Mantener sincronizado el campo del formulario con el estado de la búsqueda
  useEffect(() => {
    if (selectedMovie) {
      setQuery(selectedMovie.title); // Si se selecciona una película, actualiza el query
    }
  }, [selectedMovie]);


  const handleVerMas = () => {
    // Redirige a la página de detalles de la película
    navigate("/pelicula");
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "primary",
        width: "100%",
        padding: 4,
      }}
    >
      {/* Formulario de búsqueda */}
      <form onSubmit={handleSubmit}>
        <Autocomplete
          freeSolo
          options={movies} // Lista de películas
          onInputChange={(e, value) => {
            setQuery(value); // Actualiza el query al escribir
            handleOnchange({ target: { name: "movie", value } });
          }}
          onChange={(e, value) => {
            const selected = data.results.find(
              (movie) => movie.title === value
            );
            setSelectedMovie(selected);
          }} //
          sx={{ width: "100%", maxWidth: "900px" }}
          renderInput={(params) => (
            <TextField
              {...params}
              name="movie"
              value={formstate.movie}
              onChange={handleOnchange}
              label="Buscar película"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{
                        height: "40px",
                        borderRadius: 7,
                      }}
                    >
                      <SearchIcon />
                    </Button>
                  </InputAdornment>
                ),
              }}
              sx={{
                width: "100%",
                marginBottom: 4,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                    borderWidth: 2,
                    borderRadius: 7,
                  },
                  "&:hover fieldset": {
                    borderColor: "#1873ce",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1873ce",
                  },
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
              }}
            />
          )}
        />
      </form>

      {/* Estado de carga */}
      {loading && <p>Cargando...</p>}

      {/* Error */}
      {error && query && <p style={{ color: "red" }}>Error: {error.message}</p>}

      {/* Resultados */}
      <Box sx={{ width: "100%", maxWidth: "900px", marginTop: 2 }}>
        {selectedMovie && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              flexDirection: "row",
              backgroundColor: "#f0f0f0",
              padding: 1,
              marginBottom: 2,
              borderRadius: 4,
            }}
          >
            <h3>{selectedMovie.title} </h3>
            <p style={{ fontWeight: "bold", marginLeft: "5px" }}>
              ({selectedMovie.release_date}){" "}
              <Button
                onClick={handleVerMas}
                sx={{
                  backgroundColor: "#0b6bcb",
                  color: "white",
                  marginLeft: 2,
                }}
              >
                Ver más
              </Button>
            </p>
          </Box>
        )}
      </Box>
    </Box>
  );
};
