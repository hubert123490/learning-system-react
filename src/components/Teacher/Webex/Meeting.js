import { useParams, useLocation } from "react-router";
import useForm from "../../../hooks/use-form";
import useHttp from "../../../hooks/use-http";
import {
  cancelMeeting,
  createMeeting,
  getMeetings,
} from "../../../lib/api/webex-api";
import { createWebexMeetingForm } from "../../../lib/forms/webex-form";
import classes from "./Meeting.module.css";
import webexHeader from "../../../lib/webex-header";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { useEffect, useState } from "react";
import MeetingItem from "./MeetingItem";
import Card from "../../UI/Card";

const Meeting = () => {
  const params = useParams();
  const { state } = useLocation();
  const [showCreateMeeting, setShowCreateMeeting] = useState(false);
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
  const {
    sendRequest: getMeetingsRequest,
    data: getMeetingsData,
    error: getMeetingsError,
    status: getMeetingsStatus,
  } = useHttp(getMeetings);
  const {
    sendRequest: cancelMeetingRequest,
    status: cancelMeetingStatus,
  } = useHttp(cancelMeeting);

  useEffect(() => {
    getMeetingsRequest({
      courseId: params.courseId,
      request: {
        token: webexHeader(),
      },
    });
  }, [getMeetingsRequest, params, createMeetingStatus, cancelMeetingStatus]);

  const createMeetingHandler = (event) => {
    event.preventDefault();
    createMeetingRequest({
      courseId: params.courseId,
      request: {
        start: renderCreateMeetingFormInputs()[0].props.value,
        end: renderCreateMeetingFormInputs()[1].props.value,
        token: webexHeader(),
      },
    });
  };

  const showCreateMeetingHandler = () => {
    setShowCreateMeeting((prevState) => {
      return !prevState;
    });
  };

  const items = getMeetingsData
    ? getMeetingsData.items.filter((item) => item.title === state.courseName)
    : [];

  return (
    <>
      <div className={classes["meeting"]}>
        <button onClick={showCreateMeetingHandler}>
          {showCreateMeeting ? "Zmknij formularz" : "Utwórz spotkanie"}
        </button>
      </div>
      {showCreateMeeting && (
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
      )}

      <div className={classes["content-container"]}>
        {items &&
          items.map((item) => (
            <MeetingItem
              key={item.id}
              item={item}
              cancelMeetingRequest={cancelMeetingRequest}
            />
          ))}
        {getMeetingsError && (
          <div className={classes["error"]}>
            <h1>{getMeetingsError}</h1>
          </div>
        )}
        {getMeetingsStatus === "pending" && (
          <Card>
            <div className={classes["spinner"]}>
              <LoadingSpinner />
            </div>
          </Card>
        )}
        {getMeetingsStatus === "completed" && items && items.length === 0 && (
            <div>
              <h1>Brak spotkań</h1>
            </div>
        )}
      </div>
    </>
  );
};

export default Meeting;
