import React, { createContext, useContext, useState } from "react";

// Crear el contexto
export const MovieContext = createContext();

// Hook personalizado para acceder al contexto
export const useMovie = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovie debe usarse dentro de un MovieProvider");
  }
  return context;
};

// Componente proveedor que envuelve tu aplicación
export const MovieProvider = ({ children }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <MovieContext.Provider value={{ selectedMovie, setSelectedMovie }}>
      {children}
    </MovieContext.Provider>
  );
};