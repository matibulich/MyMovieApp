import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMemo } from "react";
import { useFetch } from "../hooks/useFetch";
import "../styles/imageSlider.css";

export const ImageSlider = () => {
  // USAR MEMOO PARA QUE OPPTIONS NO SE RENDERIZE TODO EL TIEMPO!!!!!
  const options = useMemo(() => ({
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.VITE_API_AUTH_TOKEN,
    },
  }), []);

  // Fetch de películas que están en cartelera
  const { data, loading, error } = useFetch(
    'https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=1',
    options
  );

  const acortarDescripcion = (overview) => {
    return overview.split(" ").slice(0, 30).join(" ") + (overview.split(" ").length > 30 ? "..." : "");
  };


  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Seleccionar las primeras
  const enCartelera = data.results.slice(0, 7);

  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    arrows: false,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}  >
        
        {enCartelera.map((movie) => (
          
          <div key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              srcSet={`https://image.tmdb.org/t/p/w780${movie.poster_path} 2x`}
              alt={movie.title}
              className="slider-image" 
            />

<div className="slider-text">

              <h2>{movie.title}</h2>
              <p>{acortarDescripcion(movie.overview)}</p>
            </div>
          </div>

          
          
        ))}
      </Slider>
    </div>
  );
};
