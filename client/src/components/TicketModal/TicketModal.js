import React, { useContext } from "react";
import "./TicketModal.css";
import Modal from "react-modal";

import { Context } from "../../context/UserContext";

const customStyles = {
  content: {
    top: "10%",
    margin: "0 auto",
    width: "90%",
  },
  overlay: { zIndex: 1000, backgroundColor: "rgba(0, 0, 0, 0.7)" },
};

const TicketModal = () => {
  const { modalIsOpen, closeModal, ticketInfo } = useContext(Context);

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
        <button onClick={closeModal}>close</button>
        {/* <div ref={(_subtitle) => (subtitle = _subtitle)}>
          Buy ticket for movie: {ticketInfo}
        </div> */}
        <div>Buy ticket for movie: {ticketInfo}</div>
      </Modal>
    </div>
  );
};

export default TicketModal;
