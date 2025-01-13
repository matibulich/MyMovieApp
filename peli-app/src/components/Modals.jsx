import { useModal } from "../context/ModalContext";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { useProviders } from "../hooks/useProviders";


export const Modals = () => {
  const { modalData, isOpen, closeModal, selectedMovie } = useModal();
  const providers = useProviders(selectedMovie);
  if (!modalData) return null;

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={isOpen}
      onClose={closeModal}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 500,
          maxHeight:"95vh",
          overflow:"auto",
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} onClick={closeModal} />
        <Typography component="h2" level="h4" sx={{ fontWeight: "lg", mb: 1 }}>
          {modalData.title}
        </Typography>
        <img
          src={`https://image.tmdb.org/t/p/w500${modalData.poster_path}`}
          alt={modalData.title}
          style={{ width: "70%", borderRadius: "8px" }}
        />
        <Typography textColor="text.tertiary" sx={{ mb: 2 }}>
          {modalData.overview}
        </Typography>
        <h3>Proveedores:</h3>
        {providers.length > 0 ? (
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "10px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {providers.map((provider) => (
              <div key={provider.provider_id}>
                <img
                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                  alt={provider.provider_name}
                  style={{ width: "50px", height: "auto", marginRight: "8px" }}
                />
              </div>
            ))}
          </div>
        ) : (
          <Typography>No hay proveedores disponibles</Typography>
        )}
      </Sheet>
    </Modal>
  );
};