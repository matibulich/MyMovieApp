import { useState } from "react";
import Modal from "@mui/material/Modal";
import ModalClose from "@mui/joy/ModalClose";
import { Typography, Button } from "@mui/material";
import { loginUser } from "../api";
import Sheet from "@mui/joy/Sheet";
import { useNavigate } from "react-router-dom"; 

export const Login = ({isOpen, onClose}) => {
  const navigate = useNavigate(); // Inicializar useNavigate
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]= useState("")
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
  
    try {
      const user = await loginUser(email, password);
      setSuccess(user.message);
      onClose();
      navigate("/userpanel") 
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
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} onClick={onClose} />
        <Typography
          id="modal-title"
          variant="h6"
          sx={{ textAlign: "center", mb: 2 }}
        >
          Log In
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%", display:"flex", flexDirection:"column" }}>
          <div className="mb-3" >
            <label htmlFor="inputEmail3" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              name="email_login"
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ marginBottom: "10px" }}
            />
            
          </div>
          <div className="mb-3" style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="inputPassword3" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password_login"
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
            Ingresar
          </Button>
{/* Mensajes de éxito y error */}
{success && (
            <Typography
              color="success"
              variant="body2"
              sx={{ mt: 2, textAlign: "center" }}
            >
              {success}
            </Typography>
          )}

          {error && (
            <Typography
              color="error"
              variant="body2"
              sx={{ mt: 2, textAlign: "center" }}
            >
              {error}
            </Typography>
          )}
   
          <p className="form-text mt-2">Olvide mi contraseña.</p>
        </form>
      </Sheet>
    </Modal>
  );
};
