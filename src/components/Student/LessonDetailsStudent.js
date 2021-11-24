import classes from "./LessonDetailsStudent.module.css";
import { useParams } from "react-router";
import useHttp from "../../hooks/use-http";
import { useEffect } from "react";
import {
  getContents,
} from "../../lib/api/content-api";
import Card from "../UI/Card";

const LessonDetails = () => {
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
    return getContentRequest;
  }, [
    getContentRequest,
    params.courseId,
    params.lessonId,
  ]);


  return (
    <div className={classes.lessonDetails}>
      {(!getContentData || getContentData.length === 0) && <div>pusto</div>}
      {getContentData &&
        getContentData
          .sort((a, b) => a.id - b.id)
          .map((item) => (
            <div key={item.id} className={classes.course}>
              <Card>
                <div>
                  <h3 style={{textAlign: "center"}}>{item.title}</h3>
                </div>
                <div
                  className={classes.text}
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {item.value}
                </div>
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
                    </div>
                  </Card>
                ))}
              </Card>
            </div>
          ))}
    </div>
  );
};

export default LessonDetails;
