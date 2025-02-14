import React, { createContext, useContext, useState } from "react";

// Crear el contexto
export const MovieContext = createContext();

// Proveedor del contexto
export const MovieProvider = ({ children }) => {
  const [selectedMovie, setSelectedMovie] = useState();
  const [userMovies, setUserMovies] = useState([]); // Lista de películas del usuario


  const value = {  
    selectedMovie,
    setSelectedMovie,
    userMovies,
    setUserMovies,
    addUserMovie: (movie) => setUserMovies((prevMovies) => [...prevMovies, movie]),};




  return (
    <MovieContext.Provider value= {value}    
    >
      {children}
    </MovieContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useMovie = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovie debe ser usado dentro de un MovieProvider");
  }
  return context;
};