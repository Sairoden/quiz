import React from "react";
import { useGlobalContext } from "./context";

const Modal = () => {
  const { openModal, closeModal, modalOpen, correct, questions } =
    useGlobalContext();

  return (
    <div className={`modal-container ${modalOpen && "isOpen"}`}>
      <div className="modal-content">
        <h2>Congrats!</h2>
        <p>
          You answered {correct} of {questions.length} questions correctly
        </p>
        <button className="close-btn" onClick={() => closeModal()}>
          play again
        </button>
      </div>
    </div>
  );
};

export default Modal;

// 62 KA NA
