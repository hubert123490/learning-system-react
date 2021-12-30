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
import Section from "./Section";
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
      {(!getContentData || getContentData.length === 0) && (
        <div className={classes["card"]}>pusto</div>
      )}
      {getContentData &&
        getContentData
          .sort((a, b) => a.id - b.id)
          .map((item) => (
            <Section
              key={item.id}
              item={item}
              deleteContentRequest={deleteContentRequest}
              updateTextRequest={updateTextRequest}
              addFileRequest={addFileRequest}
              deleteFileRequest={deleteFileRequest}
            />
          ))}
    </div>
  );
};

export default LessonDetails;
