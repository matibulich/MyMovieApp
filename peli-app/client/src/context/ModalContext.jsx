import { createContext, useContext, useState } from "react";

// Crear el contexto
const ModalContext = createContext();

// Proveedor del contexto
export const ModalProvider = ({ children }) => {
  const [modalData, setModalData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [isOpenTrailer, setIsOpenTrailer] = useState(false)
  const [trailerMovie, setTrailerMovie] = useState(null)

const openModalTrailer = (movie)=>{
  setTrailerMovie(movie)
  setIsOpenTrailer(true);

}
const closeModalTrailer = ()=>{
  setTrailerMovie(false);
  setIsOpenTrailer(false)

}

  const openModal = (movie) => {
    console.log(movie); // Asegúrate de que la película sea correcta aquí
    setModalData(movie);//providers
    setSelectedMovie(movie);
    setIsOpen(true);
    
 
  };

  const closeModal = () => {
    setModalData(null);
    setSelectedMovie(null)
    setIsOpen(false);
   
    
  };
 

  return (    <ModalContext.Provider value={{ modalData, isOpen, openModal, closeModal, selectedMovie, isOpenTrailer, trailerMovie, openModalTrailer, closeModalTrailer}}>
      {children}
    </ModalContext.Provider>
  );
};


export const useModal = () => useContext(ModalContext);