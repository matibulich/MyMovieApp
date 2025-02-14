import express from 'express';
import cors from "cors"
import mongoose from "mongoose"
import {authRoutes} from "./routes/authRoutes.js";
import { userMovieRoutes } from './routes/userMovieRoutes.js';
import morgan from "morgan";

const app = express();


// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: 'GET, POST, PUT, DELETE', 
  allowedHeaders: 'Content-Type, Authorization', 
};


const PORT = 5000


mongoose.connect("mongodb://127.0.0.1:27017/movieapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Verificar conexión a la base de datos
mongoose.connection.once("open", () => {
    console.log("Conectado a MongoDB");
  });


  //MIDDLEWARES
  app.use(morgan("dev"));
  app.use(express.json())

  app.use(cors(corsOptions));

  // Rutas
  app.use("/api", authRoutes);
  app.use("/api", userMovieRoutes);

 

    // Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });