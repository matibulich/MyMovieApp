import express from "express";
import bcrypt from "bcrypt";
import { User } from "../schemas/user_schema.js";
import { messages } from "../helpers/messages.js";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middlewares/token.js";
import dotenv from "dotenv";
dotenv.config();

export const authRoutes = express.Router();


//Ruta para registro

authRoutes.post("/register", async (req, res) => {
  const { email, password, nombre } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: messages.userAlreadyExists });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const newUser = new User({ email, password: hashedPassword, nombre });
    await newUser.save();

    console.log(newUser);

    res.status(201).json({ message: messages.succesRegister, nombre:newUser.nombre });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: messages.serverError });
  }
});


// Ruta para iniciar sesión
authRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: messages.userNotFound });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: messages.invalidCredentials });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION || "1h" }
    );



    res.status(200).json({ message: "Inicio de sesión exitoso", token, nombre: user.nombre, user:{id:user._id, email: user.email}  });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: messages.serverError });
  }
});


//Ruta para entrar al panel de usuario

import { Movie } from "../schemas/movie_shema.js"; // Importa el esquema de las películas

authRoutes.get("/userpanel", verifyToken, async (req, res) => {
 
  try {
    const user = await User.findById(req.user.id).select("nombre email");
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Obtén las películas asociadas al usuario
    const movies = await Movie.find({ user: req.user.id }).select("title favorite");

    res.status(200).json({ 
      message: "Acceso permitido", 
      user, 
      movies 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
});