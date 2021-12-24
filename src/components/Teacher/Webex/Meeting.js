import { useParams } from "react-router";
import useForm from "../../../hooks/use-form";
import useHttp from "../../../hooks/use-http";
import { createMeeting } from "../../../lib/api/webex-api";
import { createWebexMeetingForm } from "../../../lib/forms/webex-form";
import classes from "./Meeting.module.css";
import webexHeader from "../../../lib/webex-header";
import LoadingSpinner from "../../UI/LoadingSpinner";

const Meeting = () => {
  const params = useParams();
  const {
    renderFormInputs: renderCreateMeetingFormInputs,
    isFormValid: isCreateMeetingFormValid,
  } = useForm(createWebexMeetingForm);
  const {
    sendRequest: createMeetingRequest,
    data: createMeetingData,
    error: createMeetingError,
    status: createMeetingStatus,
  } = useHttp(createMeeting);

  const createMeetingHandler = (event) => {
    event.preventDefault();
    createMeetingRequest({
      courseId: params.courseId,
      request: {
        title: renderCreateMeetingFormInputs()[0].props.value,
        start: renderCreateMeetingFormInputs()[1].props.value,
        end: renderCreateMeetingFormInputs()[2].props.value,
        token: webexHeader(),
      },
    });
  };

  return (
    <div className={classes["meeting"]}>
      <h1>Utwórz spotkanie</h1>
      {createMeetingStatus === "pending" && <LoadingSpinner />}
      {!createMeetingData && createMeetingStatus !== "pending" && (
        <form
          className={classes.createMeetingForm}
          onSubmit={createMeetingHandler}
        >
          {renderCreateMeetingFormInputs()}
          {!createMeetingData && (
            <button type="submit" disabled={!isCreateMeetingFormValid()}>
              Utwórz spotkanie
            </button>
          )}
        </form>
      )}
      {createMeetingData && (
        <div className={classes["success"]}>Utworzono spotkanie</div>
      )}
      {createMeetingError && (
        <div className={classes["error"]}>{createMeetingError}</div>
      )}
    </div>
  );
};

export default Meeting;
