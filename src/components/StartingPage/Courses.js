import classes from "./Courses.module.css";
import image from "../../assets/course_image.jpg";
import LoadingSpinner from "../UI/LoadingSpinner";

const Courses = ({ data, courseDetailsHandler, getTitle, status }) => {
  console.log(status);

  return (
    <>
      {data && data.length !== 0 && status === "completed" && (
        <div className={classes["courses"]}>
          {data &&
            status === "completed" &&
            data.map((item) => (
              <div
                key={item.id}
                onClick={() => courseDetailsHandler(item.id)}
                className={classes["course"]}
              >
                <div>
                  <div
                    className={classes["course-description__image-container"]}
                  >
                    <img src={image} alt="course" />
                  </div>
                  <h2 className={classes["course-description__title"]}>
                    {item.name}
                  </h2>
                  <div
                    className={
                      classes["course-description__category-container"]
                    }
                  >
                    <span className={classes["category-title"]}></span>
                    <span className={classes["category-value"]}>
                      {item.category}
                    </span>
                  </div>
                  {item.person.map((person) => (
                    <div
                      className={
                        classes["course-description__teacher-container"]
                      }
                      key={person.id}
                    >
                      {getTitle(person.title)} {person.lastName}{" "}
                      {person.firstName}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
      {data && data.length === 0 && (
        <div className={classes["nothing-found"]}>
          {status === "completed" && (
            <div>
              <h1>Nic nie znaleziono</h1>
            </div>
          )}
          <br/>
          <LoadingSpinner />
        </div>
      )}
    </>
  );
};

export default Courses;
