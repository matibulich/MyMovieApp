import { useModal } from "../context/ModalContext";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { useState, useEffect } from "react";

export const TrailerModal = () => {
  const { isOpenTrailer, closeModalTrailer, trailerMovie } = useModal();
  const [trailerUrl, setTrailerUrl] = useState()
  
 

  
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.VITE_API_AUTH_TOKEN,
    },
  };

  useEffect(() => {
    
    const fetchMovieTrailer = async () => {
      console.log("Película seleccionada:");
      if (trailerMovie) {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${trailerMovie.id}/videos`,
            options
          );
          const data = await response.json();
          
          
            const youtubeVideo = data.results.find(
              (video) => video.site === "YouTube" && video.type === "Teaser"
            );
            
            if (youtubeVideo) {
              setTrailerUrl(`https://www.youtube.com/watch?v=${youtubeVideo.key}`);
            } else {
              setTrailerUrl(null);
            }
            
          }
          catch (error) {
          console.error("Error al traer trailer:", error);
          setTrailerUrl(null);
        }
      } 
    };
   
   if (isOpenTrailer) fetchMovieTrailer();
  }, [trailerMovie, isOpenTrailer]);
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={isOpenTrailer}
      onClose={closeModalTrailer}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 700,
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} onClick={closeModalTrailer} />
        {trailerUrl ? (
          <iframe
            width="100%"
            height="400"
           
            src={trailerUrl.replace("watch?v=", "embed/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <Typography><p style={{marginTop:"20px"}}>No hay tráiler disponible</p></Typography>
        )}
      </Sheet>
    </Modal>
  );
};