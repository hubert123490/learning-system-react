import classes from "./File.module.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const File = (props) => {
  const { t } = useTranslation();
  const params = useParams();
  const [file, setFile] = useState(null);
  const [showFile, setShowFile] = useState(false);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onFileUpload = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    props.addFileRequest({
      courseId: params.courseId,
      assignmentId: params.assignmentId,
      taskId: props.taskId,
      file: formData,
    });
  };

  const showFileHandler = () => {
    setShowFile((prevState) => {
      return !prevState;
    });
  };

  return (
    <div className={classes["file-content"]}>
      <button onClick={showFileHandler}>
        {!showFile ? t("Student__Assignment_AddFile") : t("Student__Assignment_Hide")}
      </button>
      {showFile && (
        <div className={classes["add-file"]}>
          <input type="file" onChange={onFileChange} />
          <br />
          <button onClick={onFileUpload} disabled={!file ? true : false}>
            {t("Student__Assignment_SendFile")}
          </button>
        </div>
      )}
      {file && showFile ? (
        <div>
          <h2>{t("Student__Assignment_FileDetails")}</h2>
          <p>{t("Student__Assignment_FileName")} {file.name}</p>
          <p>{t("Student__Assignment_FileType")} {file.type}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default File;
