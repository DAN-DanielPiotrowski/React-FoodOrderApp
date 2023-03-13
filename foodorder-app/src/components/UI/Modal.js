import React from "react";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

const Backdrop = ({ setVisible }) => {
  return <div className={classes.backdrop} onClick={setVisible}></div>;
};

const ModalOverlay = ({ children }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default function Modal({ children, setVisible }) {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop setVisible={setVisible} />,
        document.getElementById("overlay")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        document.getElementById("overlay")
      )}
    </React.Fragment>
  );
}
