import { useContext } from "react";

// Hook personalizado para acceder al contexto
export const useMovie = () => {
    const context = useContext(MovieContext);
    if (!context) {
      throw new Error("useMovie debe usarse dentro de un MovieProvider");
    }
    return context;
  };
  