import React, { useEffect, useState, useCallback } from "react"; // Importa useCallback
import { Button, Table, Form } from "react-bootstrap";
import { useMovie } from "../context/MovieContext";
import { updateMovie, deleteMovie } from "../api";
import { RatingStars } from "../components/RatingStars";
import { useModal } from "../context/ModalContext"
import { ModalCritica } from "../components/ModalCritica";


export const UserPanel = () => {
  const { userMovies, setUserMovies } = useMovie();
  const { isOpen, openModal, closeModal, selectedMovie } = useModal();
  const [updatedMovies, setUpdatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasLoadedMovies, setHasLoadedMovies] = useState(false)
  const [critica, setCritica] = useState(""); 

  const fetchUserMovies = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/movies/userpanel`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      const movies = data.movies;

      if (Array.isArray(movies)) {
        setUpdatedMovies(movies);
        setUserMovies(movies);
        setHasLoadedMovies(true);
      } else {
        console.error("La respuesta del backend no es un array:", data);
        setUpdatedMovies([]);
        setUserMovies([]);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error al cargar las películas:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Solo llamamos a fetchUserMovies si updatedMovies está vacío
    if (!hasLoadedMovies) {
      fetchUserMovies();
    }
  }, [hasLoadedMovies]); 


  const handleOpenModal = (movie) => {
    openModal(movie);
    setCritica(movie.critica || ""); // Cargar la crítica actual en el modal
  };

  const handleSaveCritica = () => {
    if (selectedMovie) {
      handleChange(selectedMovie._id, "critica", critica);
    }
    closeModal();
  };

  const handleSaveAllChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No se encontró el token.");
      }

      const updatedMoviesWithResponse = await Promise.all(
        updatedMovies.map(async (movie) => {
          const updatedData = {
            vista: movie.vista,
            miPuntuacion: movie.miPuntuacion,
            critica: movie.critica || "",
          };
          console.log(
            `Enviando actualización para ${movie.title}:`,
            updatedData
          );

          const response = await updateMovie(movie._id, updatedData, token);
          return { ...movie, ...response.movie }; // Fusionamos los datos actualizados
        })
      );

      // En lugar de llamar a fetchUserMovies, actualizamos el estado con los datos recién obtenidos
      setUpdatedMovies(updatedMoviesWithResponse);
      setUserMovies(updatedMoviesWithResponse);

      alert("Todos los cambios se guardaron correctamente.");
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
      alert("Ocurrió un error al intentar guardar los cambios.");
    }
  };

  const handleChange = (movieId, field, value) => {
    setUpdatedMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie._id === movieId ? { ...movie, [field]: value } : movie
      )
    );
  };
  const handleDelete = async (movieId) => {
    try {
      const token = localStorage.getItem("token");
  
      await deleteMovie(movieId, token);
  
      // Actualizar el estado eliminando la película
      setUpdatedMovies((prevMovies) =>
        prevMovies.filter((movie) => movie._id !== movieId)
      );
  
      console.log("Película eliminada correctamente");
    } catch (error) {
      console.error("Error al eliminar la película:", error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 style={{color:"#1976d2"}} >Mi Lista de Películas</h2>
      <Button variant="success" onClick={handleSaveAllChanges} className="mb-3">
        Guardar todos los cambios
      </Button>
      {loading ? (
        <p>Cargando tus películas...</p>
      ) : Array.isArray(updatedMovies) && updatedMovies.length > 0 ? (
        <div className="table-responsive">
        <Table striped bordered hover className="table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Mi Puntuación</th>
              <th>Vista</th>
              <th>Mi Crítica</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {updatedMovies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>
                  <RatingStars
                    value={Number(movie.miPuntuacion) || 0} // Valor actual
                    onChange={(newValue) =>
                      handleChange(movie._id, "miPuntuacion", newValue)
                    }
                  />
                </td>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={movie.vista ?? false}
                    onChange={(e) =>
                      handleChange(movie._id, "vista", e.target.checked)
                    }
                  />
                </td>
                <td>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={movie.critica ?? ""}
                    readOnly
                    onClick={() => handleOpenModal(movie)}
                    style={{ cursor: "pointer" }}
                  />
                </td>
                <td>
                <img src="./img/cross.svg" alt="eliminar"
                 className="icono_eliminar"
                 onClick={()=>handleDelete(movie._id)}/>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </div>
      ) : (
        <p style={{color:"red"}}>No hay películas disponibles.</p>
      )}

    <ModalCritica 
    show={isOpen} 
    onHide={closeModal} 
    critica={critica} 
    setCritica={setCritica} 
    handleSaveCritica={handleSaveCritica}
    />

    </div>
  );
};
