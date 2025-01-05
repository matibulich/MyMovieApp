import CardContent from "@mui/joy/CardContent";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import Typography from "@mui/joy/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/joy/Button";
import CardActions from "@mui/joy/CardActions";
import IconButton from "@mui/joy/IconButton";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Chip from '@mui/joy/Chip';
import StarIcon from '@mui/icons-material/Star';
import { useFetch } from "../hooks/useFetch";
import { useMemo } from "react";
import { useModal } from "../context/ModalContext";


export const CardsPopular = () => {
  
  const { openModal, openModalTrailer } = useModal();

  const options = useMemo(() => ({ //pasarle useMEMO PARA QUE NO RENDERIZE TODO EL TIEMPO options!!!!!!!!!!
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.VITE_API_AUTH_TOKEN,
    },
  }), []);

  const { data, loading, error } = useFetch(
    "https://api.themoviedb.org/3/movie/popular?language=es-ES&page=1",
    options
  );
  console.log(data)

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const popularMovies = data.results.slice(0, 10);

  
  const acortarTitulo = (title) => {
    return title.split(" ").slice(0, 4).join(" ") + (title.split(" ").length > 4 ? "..." : "");
  };

 
  return (
    <><div className="container-fluid">
      <h2 className="text-light">Populares del momento...</h2>

      <Box component="ul" className="popular-grid">
        {popularMovies.map((movie) => (
          <div key={movie.id} >
            <Card
              component="li"
              sx={{width:"100%",
                minWidth: 300,
                maxWidth: 400,
                maxHeight:300, //
                position: "relative", // Asegura que CardCover funcione correctamente
              }}
            >

<Box sx={{ display: 'flex', gap: 1, alignItems: 'center', zIndex:4 }}>
      <Chip variant="soft" startDecorator={<StarIcon />}>
       {parseFloat(movie.vote_average.toFixed(2)) }
      </Chip></Box>

              <CardCover
                sx={{
                  "& img": {
                    width: "100%", // Ajustar ancho al contenedor
                    height: "100%", // Ajustar alto al contenedor
                    objectFit: "cover",
                    maxWidth: "100%",
                  },
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  srcSet={`https://image.tmdb.org/t/p/w780${movie.poster_path} 2x`}
                  loading="lazy"
                  alt={movie.title}
                  
                  
                />
              </CardCover>

              <CardContent>
                <Typography
                  level="body-lg"
                  textColor="#fff"
                  title={movie.title}
                  sx={{ fontWeight: "lg", mt: { xs: 12, sm: 18 } }}
                >
                  {acortarTitulo(movie.title)}
                </Typography>

  

              </CardContent>
              

              <CardActions buttonFlex="0 1 120px">
                <IconButton
                  variant="outlined"
                  color="neutral"
                  sx={{ mr: "auto" }}
                >
                  <FavoriteBorder />
                </IconButton>
                <Button variant="solid" color="neutral" onClick={ ()=>{
                  
                  openModalTrailer(movie)
                }}>
                  Trailer
                </Button>
                <Button variant="solid" color="primary" onClick={()=>openModal(movie)}>
                  Ver mas...
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </Box></div>
    </>
  );
};