import classes from "./MeetingItem.module.css";
import { FaTimes } from "react-icons/fa";
import Modal from "../../UI/Modal";
import { useState } from "react";
import { useParams } from "react-router-dom";
import meetingImage from "../../../assets/meeting.jpg"
import webexHeader from "../../../lib/webex-header";
import { useTranslation } from "react-i18next";

const MeetingItem = (props) => {
  const [showModal, setShowModal] = useState(false);
  const params = useParams();
  const { t } = useTranslation();

  const showModalHandler = () => {
    setShowModal((prevState) => {
      return !prevState;
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const deleteItem = (meetingId) => {
    props.cancelMeetingRequest({
      courseId: params.courseId,
      request: {
        meetingId: meetingId,
        token: webexHeader()
      }
    });
    setShowModal(false);
  };

  const getDate = (date) => {
    const day = date.split("T")[0].split("-")[2];
    const month = date.split("T")[0].split("-")[1];
    const year = date.split("T")[0].split("-")[0];

    const hour = date.split("T")[1].split(":")[0];
    const mins = date.split("T")[1].split(":")[1];
    const seconds = date.split("T")[1].split(":")[2].split("Z")[0];

    const timeOfYear = day + "-" + month + "-" + year;
    const timeOfDay = hour + ":" + mins + ":" + seconds;

    return {timeOfYear, timeOfDay}
  }

  const meetingRedirectHandler = () => {
    window.location.replace(props.item.webLink)
  }

  const timeStart = getDate(props.item.start)
  const timeEnd = getDate(props.item.end)

  return (
    <>
      {showModal && (
        <Modal
          item={props.item}
          closeModal={closeModal}
          deleteItem={deleteItem}
        />
      )}
      <div className={classes["content-container__item"]} >
        <FaTimes
          size={25}
          onClick={showModalHandler}
          className={classes["delete-icon"]}
        />

        <div onClick={meetingRedirectHandler}>
          <h2 className={classes["content-container__title"]}>
            {props.item.title}
          </h2>
          <div className={classes["content-container__image-container"]}>
            <img src={meetingImage} alt="meeting" />
          </div>
          <div className={classes["content-container__start-date"]}>
            <span>{t("Teacher__Webex_StartDate")} </span><span>{`${timeStart.timeOfDay} ${timeStart.timeOfYear}`}</span>
          </div>
          <div className={classes["content-container__end-date"]}>
          <span>{t("Teacher__Webex_EndDate")} </span><span>{`${timeEnd.timeOfDay} ${timeEnd.timeOfYear}`}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MeetingItem;
