import express from 'express';
import cors from "cors"
import mongoose from "mongoose"
import {authRoutes} from "./routes/authRoutes.js";
import { userMovieRoutes } from './routes/userMovieRoutes.js';
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));


// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: 'GET, POST, PUT, DELETE', 
  allowedHeaders: 'Content-Type, Authorization', 
};
app.use(cors(corsOptions));

app.use(express.json())

  // Rutas
app.use("/api", authRoutes);
 app.use("/api", userMovieRoutes);

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

// Servir archivos estáticos del frontend
  app.use(express.static(path.join(__dirname, "../client/dist"))); 

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist", "index.html")); // Para Vite
    
  });
  
     // Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });