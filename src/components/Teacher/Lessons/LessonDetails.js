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
import Text from "./Text";
import File from "./File";
import { createAddContentForm } from "../../../lib/forms/content-form";
import useForm from "../../../hooks/use-form";
import { FaTimes } from "react-icons/fa";

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
  const { sendRequest: addContentRequest, status: addContentStatus } =
    useHttp(addContent);
  const { sendRequest: deleteContentRequest, status: deleteContentStatus } =
    useHttp(deleteContent);
  const { sendRequest: updateTextRequest, status: updateTextStatus } =
    useHttp(addText);
  const { sendRequest: addFileRequest, status: addFileStatus } =
    useHttp(addFileToContent);
  const { sendRequest: deleteFileRequest, status: deleteFileStatus } = useHttp(
    deleteFileFromContent
  );

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
    setShowAddContentForm((prevState) => {
      return !prevState;
    });
  };

  const showAddContentFormHandler = () => {
    setShowAddContentForm((prevState) => {
      return !prevState;
    });
  };

  return (
    <div className={classes["lesson-details"]}>
      <button onClick={showAddContentFormHandler}>
        {showAddContentForm ? "Zamknji formularz" : "Dodaj kontent"}{" "}
      </button>
      {showAddContentForm && (
        <form
          className={classes["create-content__form"]}
          onSubmit={addContentHandler}
        >
          {renderAddContentInputs()}
          <button type="submit" disabled={!isAddContentFormValid()}>
            Dodaj kontent
          </button>
        </form>
      )}

      {/* main content preview starts from here */}
      {(!getContentData || getContentData.length === 0) && <div className={classes["card"]}>pusto</div>}
      {getContentData &&
        getContentData
          .sort((a, b) => a.id - b.id)
          .map((item) => (
            <div key={item.id} className={classes["lesson"]}>
              <div className={classes["card"]}>
                <div>
                  <h3>{item.title}</h3>
                </div>
                <div
                  className={classes["text"]}
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {item.value}
                </div>
                {item.files.map((file) => (
                  <div
                    key={file.id}
                    className={classes["lesson-content__files"]}
                  >
                    {file.fileType.split("/")[0] === "video" && (
                      <video width="320" height="240" controls>
                        <source src={file.downloadUrl} type={file.type} />
                        Twoja przeglądarka nie wspiera odtwarzacza video.{" "}
                      </video>
                    )}
                    <div className={classes["lesson-content__file"]}>
                      <a
                        href={file.downloadUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={classes["lesson-content__file_a"]}
                      >
                        {file.fileName}
                      </a>{" "}
                      <span
                        onClick={(e) => {
                          if (
                            window.confirm(
                              `Czy napewno chcesz usunąć ${file.fileName}?`
                            )
                          )
                            deleteFileFromContentHandler(e, {
                              contentId: item.id,
                              fileId: file.id,
                            });
                        }}
                        className={classes["lesson-content__file-delete"]}
                      >
                        {" "}
                        usuń
                      </span>
                    </div>
                  </div>
                ))}
                <hr />
                <div>
                  <h3>Operacje</h3>
                  <Text
                    updateTextRequest={updateTextRequest}
                    value={item.value}
                    contentId={item.id}
                  />
                  <File contentId={item.id} addFileRequest={addFileRequest} />
                  {/* <button
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
                  </button> */}
                  <FaTimes size={20} onClick={() => {
                      if (window.confirm(`Czy napewno chcesz usunąć?`)) {
                        deleteContentRequest({
                          courseId: params.courseId,
                          lessonId: params.lessonId,
                          contentId: item.id,
                        });
                      }
                    }} className={classes["delete-icon"]} />
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default LessonDetails;
