import classes from "./Modal.module.css";

const Modal = (props) => {
  return (
    <>
      <div className={classes["backdrop"]} />
      <div className={classes["modal"]}>
        <h1 className={classes["modal__title"]}>
          Czy napewno chcesz usunąć {props.item.name}?
        </h1>
        <div className={classes["modal__actions"]}>
          <button
            onClick={() => {
              props.deleteItem(props.item.id);
            }}
            className={classes["modal-cations__buttons"]}
          >
            Tak!
          </button>
          <button
            onClick={props.closeModal}
            type="button"
            className={classes["modal-actions__buttons"]}
          >
            Nie!
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
