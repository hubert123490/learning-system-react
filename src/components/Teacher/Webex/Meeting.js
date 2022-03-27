import { useParams, useLocation } from "react-router";
import useForm from "../../../hooks/use-form";
import useHttp from "../../../hooks/use-http";
import {
  cancelMeeting,
  createMeeting,
  getMeetings,
} from "../../../lib/api/webex-api";
import {
  createWebexMeetingForm,
  createWebexMeetingFormEn,
} from "../../../lib/forms/webex-form";
import classes from "./Meeting.module.css";
import webexHeader from "../../../lib/webex-header";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { useEffect, useState } from "react";
import MeetingItem from "./MeetingItem";
import Card from "../../UI/Card";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const Meeting = () => {
  const { t } = useTranslation();
  const params = useParams();
  const { state } = useLocation();
  const [showCreateMeeting, setShowCreateMeeting] = useState(false);
  const {
    renderFormInputs: renderCreateMeetingFormInputs,
    isFormValid: isCreateMeetingFormValid,
  } = useForm(createWebexMeetingForm);
  const {
    renderFormInputs: renderCreateMeetingFormInputsEn,
    isFormValid: isCreateMeetingFormValidEn,
  } = useForm(createWebexMeetingFormEn);
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
  const { sendRequest: cancelMeetingRequest, status: cancelMeetingStatus } =
    useHttp(cancelMeeting);

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
    if (i18next.language === "pl") {
      createMeetingRequest({
        courseId: params.courseId,
        request: {
          start: renderCreateMeetingFormInputs()[0].props.value,
          end: renderCreateMeetingFormInputs()[1].props.value,
          token: webexHeader(),
        },
      });
    } else if (i18next.language === "en") {
      createMeetingRequest({
        courseId: params.courseId,
        request: {
          start: renderCreateMeetingFormInputsEn()[0].props.value,
          end: renderCreateMeetingFormInputsEn()[1].props.value,
          token: webexHeader(),
        },
      });
    }
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
          {showCreateMeeting
            ? t("Teacher__Webex_Hide")
            : t("Teacher__Webex_CreateMeeting")}
        </button>
      </div>
      {showCreateMeeting && (
        <div className={classes["meeting"]}>
          <h1>{t("Teacher__Webex_CreateMeeting")}</h1>
          {createMeetingStatus === "pending" && <LoadingSpinner />}
          {!createMeetingData && createMeetingStatus !== "pending" && (
            <form
              className={classes.createMeetingForm}
              onSubmit={createMeetingHandler}
            >
              {i18next.language === "pl" && renderCreateMeetingFormInputs()}
              {i18next.language === "en" && renderCreateMeetingFormInputsEn()}
              {!createMeetingData && i18next.language === "pl" && (
                <button type="submit" disabled={!isCreateMeetingFormValid()}>
                  Utwórz spotkanie
                </button>
              )}
              {!createMeetingData && i18next.language === "en" && (
                <button type="submit" disabled={!isCreateMeetingFormValidEn()}>
                  Create meeting
                </button>
              )}
            </form>
          )}
          {createMeetingData && (
            <div className={classes["success"]}>
              {t("Teacher__Webex_MeetingCreated")}
            </div>
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
            <h1>{t("Teacher__Webex_NoMeetings")}</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Meeting;
