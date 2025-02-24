const API_URL = import.meta.env.PROD
  ? "https://mymovieapp-2.onrender.com/api"
  : "http://localhost:3000/api";



//FUNCIONES DESDE EL FRONT CONSULTAN AL BACK

export const registerUser = async (email, password, nombre) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, nombre }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al registrarse");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al registrar el usuario:", error.message);
    throw error;
  }
};

export const loginUser = async (email, password, setToken) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json(); // Extrae el mensaje de error
      throw new Error(error.message || "Error al loguearse"); // Lanza un error con el mensaje del servidor
    }

    const data = await response.json(); // Procesa la respuesta exitosa
    console.log(data);

    // Guarda el token en localStorage
    localStorage.setItem("token", data.token);

    // Actualiza el estado del token en la aplicación (si se proporciona setToken)
  

    return data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    throw error; // Relanza el error para que el componente que llame esta función pueda manejarlo
  }
};

export const addMovieList = async (data, token) => {
  try {
    const response = await fetch(`${API_URL}/movies/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify( data ),

    });


    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.message || "Error al agregar la película a la lista"
      );
    }
    

 return data

  } catch (error) {
    console.error("Error al agregar la película a la lista:", error.message);
    throw error;
  }
};

export const updateMovie = async (movieId, updatedData, token) => {
  try {
    console.log("ID de la película DESDE EL FRONT:", movieId);
    
    const response = await fetch(`${API_URL}/movies/${movieId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al actualizar la película");
    }

    const data = await response.json();
    console.log("Datos recibidos del backend:", data);
    return data;
  } catch (error) {
    console.error("Error al actualizar la película:", error.message);
    throw error;
  }
};

export const deleteMovie = async (movieId, token) => {
  try {
    const response = await fetch(`${API_URL}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al eliminar la película");
    }

    

    return { success: true, message: "Película eliminada correctamente" };
  } catch (error) {
    console.error("Error al eliminar la película:", error.message);
    throw error;
  }
};

export default API_URL;

