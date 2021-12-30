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
        props.addFileTaskRequest({
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
          {!showFile ? "Dodaj plik" : "Zamknij formularz"}
        </button>
        {showFile && (
          <div className={classes["add-file"]}>
            <input type="file" onChange={onFileChange} />
            <br />
            <button onClick={onFileUpload} disabled={!file ? true : false}>
              Wyślij!
            </button>
          </div>
        )}
        {file && showFile ? (
          <div>
            <h2>Szczegóły pliku:</h2>
            <p>Nazwa pliku: {file.name}</p>
            <p>Typ pliku: {file.type}</p>
          </div>
        ) : ""}
      </div>
      )
}

export default File;