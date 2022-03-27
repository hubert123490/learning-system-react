import classes from "./LessonDetailsStudent.module.css";
import { useParams } from "react-router";
import useHttp from "../../hooks/use-http";
import { useEffect } from "react";
import {
  getContents,
} from "../../lib/api/content-api";
import { useTranslation } from "react-i18next";

const LessonDetails = () => {
  const { t } = useTranslation();
  const params = useParams();
  const { sendRequest: getContentRequest, data: getContentData } = useHttp(
    getContents,
    true
  );

  useEffect(() => {
    getContentRequest({
      courseId: params.courseId,
      lessonId: params.lessonId,
    });
  }, [
    getContentRequest,
    params.courseId,
    params.lessonId,
  ]);


  return (
    <div className={classes["lesson-details"]}>
      {(!getContentData || getContentData.length === 0) && <div><h3>pusto</h3></div>}
      {getContentData &&
        getContentData
          .sort((a, b) => a.id - b.id)
          .map((item) => (
            <div key={item.id} className={classes["course"]}>
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
                <hr />
                <h3>{t("Student__Lesson_Files")}</h3>
                {item.files.map((file) => (
                  <div key={file.id} className={classes["lesson-details__files-container"]}>
                     {file.fileType.split("/")[0] === "video" && (
                      <video controls className={classes["lesson-details__video"]}>
                        <source src={file.downloadUrl} type={file.type} />
                        Your browser does not support the video tag.{" "}
                      </video>
                    )} 
                    <div>
                      {file.fileType.split("/")[0] !== "video" && <a
                        href={file.downloadUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {file.fileName}
                      </a>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
    </div>
  );
};

export default LessonDetails;
