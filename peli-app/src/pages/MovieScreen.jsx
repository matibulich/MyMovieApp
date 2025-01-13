import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/joy/Chip";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useMovie } from "../context/MovieContext";
import { MovieContext } from "../context/MovieContext";
import { genres } from "../helpers/genres";
import { useModal } from "../context/ModalContext";
import { ImageModal } from "../components/ImageModal";
import { TrailerModal } from "../components/TrailerModal";
import { useProviders } from "../hooks/useProviders";
import { useEffect } from "react";

export const MovieScreen = () => {
  const { selectedMovie } = useMovie(MovieContext);
 const providers = useProviders(selectedMovie) 
  
  const navigate = useNavigate();
/*   console.log(selectedMovie); */

useEffect(() => {
  if (!selectedMovie) {
    navigate("/"); // Redirige al inicio si no hay película seleccionada
  }
}, [selectedMovie, navigate]); // Ejecuta el efecto cuando cambien selectedMovie o navigate

if (!selectedMovie) {
  return null; // Mientras se redirige, no renderiza nada
}

  // Map los IDs de género a nombres
  const movieGenres = selectedMovie.genre_ids?.map((id) => {
    const genre = genres.find((g) => g.id === id);
    return genre ? genre.name : "Desconocido";
  });

  const { openModal, closeModal, isOpen, openModalTrailer } = useModal();


  const handleOpenModal = () => {
    openModal(`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`); // Abre el modal con la película seleccionada
  };

  const handleCloseModal = () => {
    closeModal(); // Cierra el modal
  };

  const handleGoHome = () => {
    navigate("/"); // Redirige al home
  };

  const handleOpenModalTrailer = () => {
    openModalTrailer(selectedMovie);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: 2,
        flexDirection: "row",
      }}
    >
      <Card sx={{ maxWidth: 800 }}>
        <Box
          sx={{ position: "relative", display: "inline-block", width: "100%" }}
        >
          <CardMedia
            sx={{
              objectFit: "cover", // Ajusta cómo se escala la imagen
              borderRadius: 1, // Bordes redondeados para un efecto más estético
              boxShadow: 3,
              cursor: "pointer", // Sombra para darle profundidad
            }}
            component="img"
            onClick={handleOpenModal}
            alt="green iguana"
            height="350px"
            src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
          />
          <Box
            sx={{
              position: "absolute",
              top: "10px",
              left: "10px",
              cursor: "pointer",
              filter: "drop-shadow(3px 3px 2px black)",
              padding: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white", // Color del ícono
              zIndex: 2,
              transition: "transform 0.2s ease-in-out",
              ":hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            <img src="./img/back.png" alt="" onClick={handleGoHome} />
          </Box>{" "}
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            zIndex: 4,
            marginTop: 1,
          }}
        >
          <Chip variant="soft" startDecorator={<StarIcon />}>
            {parseFloat(selectedMovie.vote_average.toFixed(2))}
          </Chip>
          <Chip variant="soft">{selectedMovie.release_date}</Chip>
        </Box>

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {selectedMovie.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {selectedMovie.overview}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Genero: <h6> {movieGenres?.join(", ")}</h6>
          </Typography>
        
          {providers.length > 0 ? (
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                marginTop: "10px",
                flexWrap: "wrap",
                justifyContent:"flex-start"
              }}
            >
              {providers.map((provider) => (
                <Box key={provider.provider_id}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                    alt={provider.provider_name}
                    style={{ width: "50px", height: "auto" }}
                  />
                </Box>
              ))}
            </Box>
          ) : (
            <Typography>No hay proveedores disponibles</Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            size="small"
            sx={{ backgroundColor: "#1976d2", color: "white" }}
            onClick={handleOpenModalTrailer}
          >
            Trailer
          </Button>
          <Button
            size="small"
            sx={{ backgroundColor: "#1976d2", color: "white" }}
          >
            Agregar a mi lista
          </Button>

         
        </CardActions>
      </Card>

      <ImageModal
        open={isOpen}
        imageUrl={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
        onClose={handleCloseModal}
      />
      <TrailerModal />
    </Box>
  );
};
