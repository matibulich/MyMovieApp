import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import ModalClose from "@mui/joy/ModalClose";
import { Typography, Button } from "@mui/material";
import Sheet from "@mui/joy/Sheet";
import { registerUser } from "../api";

export const Register = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState(""); // Estado para manejar errores
  const [success, setSuccess] = useState("");

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

   
 
    try {
      const user = await registerUser(email, password, nombre);
      setSuccess(user.message);
      setTimeout(() => {
        onClose(); // Cierra el modal después de 3 segundos
      }, 3000);

      localStorage.setItem("nombre",user.nombre)
     
      console.log(user)
    } catch (err) {
      // Usar el mensaje de error enviado por el backend
      setError(err.message);
    }
  };


  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={isOpen}
      onClose={onClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 500,
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
          display: "flex",
          flexDirection: "column", // Asegura que los elementos se muestren en columna
          alignItems: "center",
          zIndex: 555,
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} onClick={onClose} />
        <Typography
          id="modal-title"
          variant="h6"
          sx={{ textAlign: "center", mb: 2 }}
        >
          Regístrate
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <div className="mb-3">
            <label htmlFor="inputName" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              value={nombre}
              name="nombre"
              onChange={(e) => setNombre(e.target.value)}
              required
              style={{ marginBottom: "10px" }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ marginBottom: "10px" }}
            />
          </div>
          <div
            className="mb-3"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label htmlFor="inputPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ marginBottom: "20px" }}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="small"
            sx={{
              mt: 1,
              width: "100%",
            }}
          >
            Registrarse
          </Button>

          {error && (
            <Typography
              color="error"
              variant="body2"
              sx={{ mt: 2, textAlign: "center" }}
            >
              {error}
            </Typography>
          )}

          {success && (
            <Typography
              color="error"
              variant="body2"
              sx={{ mt: 2, textAlign: "center" }}
            >
              {success}
            </Typography>
          )}
        </form>
      </Sheet>
    </Modal>
  );
};
