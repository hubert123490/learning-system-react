import { t } from "i18next";
import { useState } from "react";
import { useParams } from "react-router";
import classes from "./File.module.css";

const File = (props) => {
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
      lessonId: params.lessonId,
      contentId: props.contentId,
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
        {!showFile ? t("Teacher__Lessons_AddFile") : t("Teacher__Lessons_HideForm")}
      </button>
      {showFile && (
        <div className={classes["add-file"]}>
          <input type="file" onChange={onFileChange} />
          <br />
          <button onClick={onFileUpload} disabled={!file ? true : false}>
            { t("Teacher__Lessons_SendFile")}
          </button>
        </div>
      )}
      {file && showFile ? (
        <div>
          <h2> { t("Teacher__Lessons_FileDetails")}</h2>
          <p> { t("Teacher__Lessons_FileName")} {file.name}</p>
          <p> { t("Teacher__Lessons_FileType")} {file.type}</p>
        </div>
      ) : ""}
    </div>
  );
};

export default File;
