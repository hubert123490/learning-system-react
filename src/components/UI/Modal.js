import classes from "./Modal.module.css";
import { useTranslation } from "react-i18next";

const Modal = (props) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={classes["backdrop"]} />
      <div className={classes["modal"]}>
        <h1 className={classes["modal__title"]}>
        {t("Modal__DeleteConfirmation")}
        </h1>
        <div className={classes["modal__actions"]}>
          <button
            onClick={() => {
              props.deleteItem(props.item.id);
            }}
            className={classes["modal-cations__buttons"]}
          >
            {t("Modal__Yes")}
          </button>
          <button
            onClick={props.closeModal}
            type="button"
            className={classes["modal-actions__buttons"]}
          >
           {t("Modal__No")}
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
