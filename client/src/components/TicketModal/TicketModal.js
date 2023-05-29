import React, { useContext } from "react";
import "./TicketModal.css";
import Modal from "react-modal";

import { Context } from "../../context/UserContext";
import ModalContent from "../ModalContent/ModalContent";

const customStyles = {
  content: {
    top: "10%",
    margin: "0 auto",
    width: "90%",
    backgroundColor: "#fdfcf0",
    padding: "5px",
  },
  overlay: { 
    zIndex: 1000, 
    backgroundColor: "rgba(0, 0, 0, 0.7)" 
  },
};

const TicketModal = () => {
  const { modalIsOpen, closeModal } = useContext(Context);

  // let subtitle;

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#000";
  };

  return (
    <div className="ticket-modal-container">
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <ModalContent></ModalContent>
        <button className = "close-btn" onClick={closeModal}>X</button>
      </Modal>
    </div>
  );
};

export default TicketModal;
