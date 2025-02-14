import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Relacionado con el usuario
  title: { type: String, required: true },

  vista: { type: Boolean, default: false }, // Nueva propiedad
  miPuntuacion: { type: Number, default: 0 }, // Nueva propiedad
  critica: { type: String, default:"" }, // Nueva propiedad
});

export const Movie = mongoose.model("Movie", MovieSchema);