import { createContext, useContext, useState } from "react";

// Crear el contexto
const ModalContext = createContext();

// Proveedor del contexto
export const ModalProvider = ({ children }) => {
  const [modalData, setModalData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null)

  const openModal = (data) => {
    console.log(data)
    setModalData(data);
    setSelectedMovie(data)
    setIsOpen(true);
  };

  const closeModal = () => {
    setModalData(null);
    setSelectedMovie(null)
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ modalData, isOpen, openModal, closeModal, selectedMovie }}>
      {children}
    </ModalContext.Provider>
  );
};


export const useModal = () => useContext(ModalContext);