import { useParams } from "react-router";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import useHttp from "../../../hooks/use-http";
import { useEffect } from "react";
import classes from "./CheckExams.module.css"
import { getUncheckedExams } from "../../../lib/api/exam-api";
import Card from "../../UI/Card";

const CheckExams = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    const {
        sendRequest: getDetailsRequest,
        data: getDetailsData,
        status: getDetailsStatus,
        error: getDetailsError,
      } = useHttp(getUncheckedExams, true);

      useEffect(() => {
        if (params.courseId) {
          getDetailsRequest({courseId: params.courseId});
        }
        return getDetailsRequest;
      }, [
        getDetailsRequest,
        params.courseId,
      ]);

      console.log(params.courseId)

      const checkDetailsHandler = (examId) => {
        if (location.pathname) navigate(`${location.pathname}/${examId}/submissions`);
      };

      return (
        <div className={classes.checkExam}>
          {(!getDetailsData || getDetailsData.length === 0) && <div>pusto</div>}
            {getDetailsData && 
              getDetailsData.sort((a, b) => a.id - b.id)
              .map((item) => (
                <div key={item.id} className={classes.exam}>
                  <div onClick={() => checkDetailsHandler(item.id)} >
                  <Card>
                    <h3>{item.description}</h3>
                  </Card>
                </div>
                </div>
              ))}
        </div>
      );
}

export default CheckExams;