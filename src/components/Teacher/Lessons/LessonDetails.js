import classes from "./LessonDetails.module.css";
import { useParams } from "react-router";
import useHttp from "../../../hooks/use-http";
import { useEffect, useState } from "react";
import {
  getContents,
  addContent,
  deleteContent,
  addText,
  addFileToContent,
  deleteFileFromContent,
} from "../../../lib/api/content-api";
import Card from "../../UI/Card";
import Text from "./Text";
import File from "./File";
import { createAddContentForm } from "../../../lib/forms/content-form";
import useForm from "../../../hooks/use-form";

const LessonDetails = () => {
  const params = useParams();
  const [showAddContentForm, setShowAddContentForm] = useState(false);
  const {
    renderFormInputs: renderAddContentInputs,
    isFormValid: isAddContentFormValid,
  } = useForm(createAddContentForm);
  const { sendRequest: getContentRequest, data: getContentData } = useHttp(
    getContents,
    true
  );
  const {
    sendRequest: addContentRequest,
    data: addContentData,
    status: addContentStatus,
  } = useHttp(addContent);
  const {
    sendRequest: deleteContentRequest,
    data: deleteContentData,
    status: deleteContentStatus,
  } = useHttp(deleteContent);
  const {
    sendRequest: updateTextRequest,
    data: updateTextData,
    status: updateTextStatus,
  } = useHttp(addText);
  const {
    sendRequest: addFileRequest,
    data: addFileData,
    status: addFileStatus,
    error: addFileError,
  } = useHttp(addFileToContent);
  const {
    sendRequest: deleteFileRequest,
    data: deleteFileData,
    status: deleteFileStatus,
    error: deleteFileError,
  } = useHttp(deleteFileFromContent);

  useEffect(() => {
    getContentRequest({
      courseId: params.courseId,
      lessonId: params.lessonId,
    });
    return getContentRequest;
  }, [
    getContentRequest,
    params.courseId,
    params.lessonId,
    addContentStatus,
    deleteContentStatus,
    updateTextStatus,
    addFileStatus,
    deleteFileStatus,
  ]);

  const deleteFileFromContentHandler = (event, data) => {
    event.preventDefault();
    deleteFileRequest({
      courseId: params.courseId,
      lessonId: params.lessonId,
      contentId: data.contentId,
      fileId: data.fileId,
    });
  };

  const addContentHandler = (event) => {
    event.preventDefault();
    addContentRequest({
      courseId: params.courseId,
      lessonId: params.lessonId,
      title: renderAddContentInputs()[0].props.value,
    });
    setShowAddContentForm(!showAddContentForm);
  };

  const showAddFileFormHandler = () => {
    setShowAddContentForm(!showAddContentForm);
  };

  return (
    <div className={classes.lessonDetails}>
      <button onClick={showAddFileFormHandler}>
        {showAddContentForm ? "Zamknji formularz" : "Dodaj kontent"}{" "}
      </button>
      {showAddContentForm && (
        <form
          className={classes.createContentForm}
          onSubmit={addContentHandler}
        >
          {renderAddContentInputs()}
          <button type="submit" disabled={!isAddContentFormValid()}>
            Dodaj kontent
          </button>
        </form>
      )}
      {(!getContentData || getContentData.length === 0) && <div>pusto</div>}
      {getContentData &&
        getContentData
          .sort((a, b) => a.id - b.id)
          .map((item) => (
            <div key={item.id} className={classes.course}>
              <Card>
                <div>
                  <h3>{item.title}</h3>
                </div>
                <div
                  className={classes.text}
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {item.value}
                </div>
                <br />
                <Text
                  updateTextRequest={updateTextRequest}
                  value={item.value}
                  contentId={item.id}
                />
                <br />
                <hr />
                <h3>Pliki</h3>
                {item.files.map((file) => (
                  <Card key={file.id}>
                     {file.fileType.split("/")[0] === "video" && (
                      <video width="320" height="240" controls>
                        <source src={file.downloadUrl} type={file.type} />
                        Your browser does not support the video tag.{" "}
                      </video>
                    )} 
                    <div>
                      <a
                        href={file.downloadUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {file.fileName}
                      </a>
                      <form
                        onSubmit={(e) =>
                          deleteFileFromContentHandler(e, {
                            contentId: item.id,
                            fileId: file.id,
                          })
                        }
                      >
                        <button type="submit" style={{ margin: "1rem" }}>
                          Usuń plik
                        </button>
                      </form>
                    </div>
                  </Card>
                ))}
                <br />
                <div>
                  <h3>Zarządzaj załącznikami</h3>
                </div>
                <File contentId={item.id} addFileRequest={addFileRequest} />
                <hr />
                <button
                  onClick={() => {
                    if (window.confirm(`Czy napewno chcesz usunąć?`)) {
                      deleteContentRequest({
                        courseId: params.courseId,
                        lessonId: params.lessonId,
                        contentId: item.id,
                      });
                    }
                  }}
                >
                  Usuń kontent
                </button>
              </Card>
            </div>
          ))}
    </div>
  );
};

export default LessonDetails;
