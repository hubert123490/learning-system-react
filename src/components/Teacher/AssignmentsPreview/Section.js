import classes from "./Section.module.css";
import FileItem from "./FileItem";
import { useState } from "react";
import useForm from "../../../hooks/use-form";
import { rateAnswerForm } from "../../../lib/forms/answer-form";

const Section = (props) => {
  const [showForm, setShowForm] = useState(false);
  const {
    renderFormInputs: renderRateAnswerFormInputs,
    isFormValid: isRateAnswerFormValid,
  } = useForm(rateAnswerForm);

  const showFormHandler = () => {
    setShowForm((prevState) => !prevState);
  };

  console.log(props.item)

  return (
    <div className={classes["assignment"]}>
      <div className={classes["card"]}>
        <div>
          <h3>{props.item.title}</h3>
        </div>
        <div className={classes["text"]} style={{ whiteSpace: "pre-wrap" }}>
          {props.item.description}
        </div>
        <hr />
        <h3>Materiały pomocnicze</h3>
        {props.item.files && props.item.files.length === 0 && <div>Nie udostępniono żadnych materiałow</div>}
        {props.item.files.map((file) => (
          <div key={file.id} className={classes["lesson-content__files"]}>
            <FileItem file={file} />
          </div>
        ))}
        <hr />
        <h3>Załączone pliki</h3>
        {props.item.submissionFiles && props.item.submissionFiles.length === 0 && <div style={{color: "red"}}>Brak załączonych plików</div>}
        {props.item.submissionFiles.map((file) => (
          <div key={file.id} className={classes["lesson-content__files"]}>
            <FileItem
              file={file}
              deleteTaskAnswerFile={props.deleteTaskAnswerFile}
              taskId={props.item.id}
            />
          </div>
        ))}
        <hr />
        <div className={classes["info"]}>
        <h3>Informacje</h3>
        <div>Oceniono: {props.item.checkedOnce ? "Tak" : "Nie"}</div>
        <div>
          Liczba uzyskanych punktów: {props.item.points} /{" "}
          {props.item.maxPoints}
        </div>
        <button onClick={showFormHandler}>{showForm ? "Schowaj" : "Oceń"}</button>
        {showForm && (
          <form
            onSubmit={(e) =>
              props.rateAnswerFormHandler(
                e,
                props.item.id,
                renderRateAnswerFormInputs()[0].props.value
              )
            }
            className={classes["rate-answer__form"]}
          >
            {renderRateAnswerFormInputs()}
            <div>Maksymalna liczba punktów: {props.item.maxPoints}</div>
            <div className={classes["error"]}>{props.children}</div>
            <button type="submit" disabled={!isRateAnswerFormValid()}>
              Oceń
            </button>
          </form>
        )}
        </div>
      </div>
    </div>
  );
};

export default Section;
