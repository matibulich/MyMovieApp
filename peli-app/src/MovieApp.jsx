import { CustomNav } from "./components/CustomNav";
import { ImageSlider } from "./components/ImageSlider";
import { SearchMovie } from "./components/SearchMovie";
import { CardsPopular } from "./components/CardsPopular";
import { Modals } from "./components/Modals";
import { ModalProvider } from "./context/ModalContext";
import { TrailerModal } from "./components/TrailerModal";
import { Footer } from "./components/footer";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { MovieScreen } from "./pages/MovieScreen";
import { MovieProvider } from "./context/MovieContext";


export const MovieApp = () => {
  const location = useLocation();
  const isPeliculaPage = location.pathname === "/pelicula";

  return (
    <>    <MovieProvider>
       <ModalProvider>
      <CustomNav />
      
  
        {!isPeliculaPage && (
          <>
            <ImageSlider />
            <SearchMovie />
           
              <TrailerModal />
              <Modals />
              <CardsPopular />
            
          </>
        )}

        <Routes>
          <Route path="/" element={<Navigate to="/" />} />
          <Route path="/pelicula" element={<MovieScreen />} />
        </Routes>

        <Footer />
        </ModalProvider>
      </MovieProvider>
    </>
  );
};