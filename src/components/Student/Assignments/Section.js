import classes from "./Section.module.css";
import FileItem from "./FileItem";
import File from "./File"
import FileItemDisplay from "./FileItemDisplay";
import { useTranslation } from "react-i18next";

const Section = (props) => {
  const { t } = useTranslation();
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
        <h3>{t("Student__Assignment_SupportMaterials")}</h3>
        {props.item.files.map((file) => (
          <div key={file.id} className={classes["lesson-content__files"]}>
            <FileItemDisplay file={file} />
          </div>
        ))}
        <hr />
        <h3>{t("Student__Assignment_Files")}</h3>
        {props.item.submissionFiles.map((file) => (
          <div key={file.id} className={classes["lesson-content__files"]}>
            <FileItem file={file} deleteTaskAnswerFile={props.deleteTaskAnswerFile} taskId={props.item.id}/>
          </div>
        ))}
        <div>
          {props.deleteFileFromTaskAnswerError && <div style={{color: "red"}}>{props.deleteFileFromTaskAnswerError}</div>}
           <File
              taskId={props.item.id}
              addFileRequest={props.addFileToTaskAnswer}
            />   
        </div>
      </div>
    </div>
  );
};

export default Section;
