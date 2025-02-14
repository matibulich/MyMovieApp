import { useState } from "react";
import { useMovie } from "../context/MovieContext";
import { useFetch } from "../hooks/useFetch";
import { useModal } from "../context/ModalContext";
import { addMovieList } from "../api";
import { useMemo } from "react";
import { MovieContext } from "../context/MovieContext";

import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ClearIcon from "@mui/icons-material/Clear";

export const CardsPopular = () => {
  const { openModal, openModalTrailer } = useModal();
  const { addUserMovie } = useMovie();
  const [addedMovies, setAddedMovies] = useState({});
  const [errorMessages, setErrorMessages] = useState({});

  const options = useMemo(
    () => ({
      //pasarle useMEMO PARA QUE NO RENDERIZE TODO EL TIEMPO options!!!!!!!!!!
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_API_AUTH_TOKEN,
      },
    }),
    []
  );

  const { data, loading, error } = useFetch(
    "https://api.themoviedb.org/3/movie/popular?language=es-ES&page=1",
    options
  );
  console.log(data);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const popularMovies = data.results.slice(0, 10);

  const handleAddMovie = async (movie) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No estás autenticado");
      }

      const data = {
        title: movie.title,
      };

      const response = await addMovieList(data, token);
      console.log("Película agregada:", response);

      if (response && response.title) {
        setAddedMovies((prev) => ({ ...prev, [movie.id]: true }));
        addUserMovie(response); // Agrega la película al estado global
        setErrorMessages((prev) => ({ ...prev, [movie.id]: "" }));
      }
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessages((prev) => ({ ...prev, [movie.id]: error.message }));
    }
  };

  return (
    <div className="container-fluid">
      <h2 className="text-light">Populares del momento...</h2>

      <div className="popular-grid">
        {popularMovies.map((movie) => (
          <Card
            key={movie.id}
            sx={{
              minWidth: 300,
              maxWidth: 400,
              maxHeight: 300,
              position: "relative",
            }}
          >
            <CardCover>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                loading="lazy"
                alt={movie.title}
              />
            </CardCover>

            <CardContent>
              <Typography level="body-lg" textColor="#fff" title={movie.title}>
                {movie.title.length > 20
                  ? movie.title.slice(0, 20) + "..."
                  : movie.title}
              </Typography>
              <Chip variant="soft" startDecorator={<StarIcon />}>
                {movie.vote_average.toFixed(2)}
              </Chip>
            </CardContent>

            <CardActions>
              <IconButton
                variant="solid"
                color="danger"
                onClick={() => handleAddMovie(movie)}
                disabled={addedMovies[movie.id]}
              >
                {addedMovies[movie.id] ? <ClearIcon /> : <FavoriteBorder />}
              </IconButton>
              <Button variant="solid" onClick={() => openModalTrailer(movie)}>
                Trailer
              </Button>
              <Button
                variant="solid"
                color="primary"
                onClick={() => openModal(movie)}
              >
                Ver más...
              </Button>
            </CardActions>

            {errorMessages[movie.id] && (
              <Typography  style={{ 
                backgroundColor: "#c41c1c", 
                color: "white", 
                padding: "2px", 
                borderRadius: "4px",
                display: "inline-block",
             
              }} 
              zIndex={1}>
                {errorMessages[movie.id]}
              </Typography>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};
