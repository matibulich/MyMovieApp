import React, { useEffect, useState } from "react"; // Importa useCallback
import { Button, Table, Form } from "react-bootstrap";
import { useMovie } from "../context/MovieContext";
import { updateMovie, deleteMovie, registerUser } from "../api";
import { RatingStars } from "../components/RatingStars";
import { useModal } from "../context/ModalContext"
import { ModalCritica } from "../components/ModalCritica";
import { useAutoLogout } from "../hooks/useAutoLogout";


export const UserPanel = () => {
  useAutoLogout()
  const {  setUserMovies } = useMovie();
  const { isOpen, openModal, closeModal, selectedMovie } = useModal();
  const [updatedMovies, setUpdatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [critica, setCritica] = useState(""); 
  const [successMessage, setSuccessMessage] = useState("");
  const [nombre, setNombre] = useState(storedName);
   const storedName = localStorage.getItem("nombre") || "";

  useEffect(() => {
  const fetchUserMovies = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://mymovieapp-2.onrender.com/api/movies/userpanel`,
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
  };fetchUserMovies();
}, []);



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
     
          const response = await updateMovie(movie._id, updatedData, token);
          return { ...movie, ...response.movie };
        })
      );

      setUpdatedMovies(updatedMoviesWithResponse);
      setUserMovies(updatedMoviesWithResponse);
      setSuccessMessage("Cambios guardados correctamente");
     
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
      setSuccessMessage("Ocurrió un error al intentar guardar los cambios.");
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
     
      <h2 style={{color:"white"}} >Lista de Películas - {nombre.toLocaleUpperCase()} </h2>
      <Button variant="success" onClick={handleSaveAllChanges} className="mb-3">
        Guardar todos los cambios
      </Button>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
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
