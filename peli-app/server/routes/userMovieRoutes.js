import express from "express";
import { verifyToken } from "../middlewares/token.js";
import { Movie } from "../schemas/movie_shema.js";

export const userMovieRoutes = express.Router();

userMovieRoutes.post("/movies/add", verifyToken, async (req, res) => {
  const { title } = req.body;

  try {
    if (!title) {
      return res.status(400).json({ message: "El título es obligatorio" });
    }
    // Verificar si la película ya está en la lista del usuario
    const existingMovie = await Movie.findOne({ user: req.user.id, title });

    if (existingMovie) {
      return res
        .status(400)
        .json({ message: "La pelicula ya esta en tu lista." });
    }

    // Crear y guardar la película en la base de datos
    const newMovie = new Movie({ user: req.user.id, title });
    await newMovie.save();

    res
      .status(201)
      .json({ message: "Película agregada a tu lista", movie: newMovie });
  } catch (error) {
    res.status(500).json({ message: "Error al agregar la película" });
  }
});

// Ruta para obtener la lista de películas del usuario
userMovieRoutes.get("/movies/userpanel", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const movies = await Movie.find({ user: userId });

    res.json({ message: "Acceso permitido", user: req.user, movies });
  } catch (error) {
    console.error("❌ Error en userpanel:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//Actualizar peliculas en panel de usuario
userMovieRoutes.put("/movies/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const { vista, miPuntuacion, critica } = req.body;

    console.log("📩 Datos recibidos en el backend:", {
      id,
      vista,
      miPuntuacion,
      critica,
    });

    const updatedMovie = await Movie.findOneAndUpdate(
      { _id: id, user: req.user.id },
      {
        $set: {
          vista,
          miPuntuacion,
          critica,
        },
      },

      { new: true }
    );

    if (!updatedMovie) {
      console.error("⚠️ Película no encontrada o no pertenece al usuario.");
      return res.status(404).json({ message: "Película no encontrada" });
    }

    console.log("✅ Película actualizada en la BD:", updatedMovie);
    return res.json({ message: "Película actualizada", movie: updatedMovie });
  } catch (error) {
    console.error("❌ Error al actualizar la película:", error);
    res.status(500).json({ message: "Error al actualizar la película" });
  }
});

userMovieRoutes.delete("/movies/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMovie = await Movie.findOneAndDelete({ _id: id, user: req.user.id });

    if (!deletedMovie) {
      return res.status(404).json({ message: "Película no encontrada" });
    }

   res.json({ message: "Película eliminada exitosamente"  });
  } catch (error) {
    console.error("❌ Error al eliminar la película:", error);
    res.status(500).json({ message: "Error al eliminar la película" });
  }
});
