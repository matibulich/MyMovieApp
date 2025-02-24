import { CustomNav } from "./components/CustomNav";
import { ImageSlider } from "./components/ImageSlider";
import { SearchMovie } from "./components/SearchMovie";
import { CardsPopular } from "./components/CardsPopular";
import { Modals } from "./components/Modals";
import { ModalProvider } from "./context/ModalContext";
import { TrailerModal } from "./components/TrailerModal";
import { Footer } from "./components/Footer";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { MovieScreen } from "./pages/MovieScreen";
import { MovieProvider } from "./context/MovieContext";
import { UserPanel } from "./pages/UserPanel";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const MovieApp = () => {
  const location = useLocation();
  const isPeliculaPage = location.pathname === "/pelicula";
  const isUserPanelPage = location.pathname === "/userpanel";
  const isSearchPage = location.pathname === "/search";

  return (
    <>
      <MovieProvider>
        <ModalProvider>
          <CustomNav />

          {/* Renderizar contenido principal si NO estamos en /pelicula ni /userpanel ni /search */}
          {!isPeliculaPage && !isUserPanelPage && !isSearchPage && (
            <>
              <ImageSlider />
              <SearchMovie /> {/* Solo se muestra en la página principal */}
              <TrailerModal />
              <Modals />
              <CardsPopular />
            </>
          )}

          {/* Configuración de rutas */}
          <Routes>
            <Route path="/" element={<Navigate to="/" />} />
            <Route path="/pelicula" element={<MovieScreen />} />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <SearchMovie /> {/* Solo se muestra en la ruta /search */}
                </ProtectedRoute>
              }
            />
            <Route
              path="/userpanel"
              element={
                <ProtectedRoute>
                  <UserPanel />
                </ProtectedRoute>
              }
            />
          </Routes>

          <Footer />
        </ModalProvider>
      </MovieProvider>
    </>
  );
};
