import { Modal, Button, Form } from "react-bootstrap";

export const ModalCritica = ({ show, onHide, critica, setCritica, handleSaveCritica }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar crítica</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          as="textarea"
          rows={6}
          value={critica}
          onChange={(e) => setCritica(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cerrar</Button>
        <Button variant="primary" onClick={handleSaveCritica}>Guardar</Button>
        
      </Modal.Footer>
      <p style={{fontSize:"15px", padding:"5px"}}>Presiona en Guardar y luego en Guardar todos los cambios...</p>
    </Modal>
  );
};