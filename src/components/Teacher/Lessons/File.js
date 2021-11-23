import { useState } from "react";
import { useParams } from "react-router";

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
      file : formData,
    });
  };

  const showFileHandler = () => {
    setShowFile(!showFile)
  }

  return (
    <div>
          <button onClick={showFileHandler}>
        {!showFile ? "Dodaj plik" : "Zamknij formularz"}
      </button>
      {showFile && <div>
        <input type="file" onChange={onFileChange} /><br/>
        <button onClick={onFileUpload} disabled={!file ? true : false}>Wyślij!</button>
      </div>}
      {file && showFile ? (
        <div>
          <h2>Szczegóły pliku:</h2>

          <p>Nazwa pliku: {file.name}</p>

          <p>Typ pliku: {file.type}</p>

          <p>Ostatnio modyfikowany: {file.lastModifiedDate.toDateString()}</p>
        </div>
      ) : (
        <div>
          <br />
          <h4>Nie wybrano jeszcze pliku</h4>
        </div>
      )}
    </div>
  );
};

export default File;
