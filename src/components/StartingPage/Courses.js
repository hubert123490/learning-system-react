import classes from "./Courses.module.css";
import image from "../../assets/course_image.jpg";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";

const Courses = ({ data, courseDetailsHandler, getTitle }) => {
  return (
    <div className={classes["courses"]}>
      {data ? (
        data.map((item) => (
          <div
            key={item.id}
            onClick={() => courseDetailsHandler(item.id)}
            className={classes["course"]}
          >
            <div>
              <div className={classes["course-description__image-container"]}>
                <img src={image} alt="course" />
              </div>
              <h2 className={classes["course-description__title"]}>
                {item.name}
              </h2>
              <div
                className={classes["course-description__category-container"]}
              >
                <span className={classes["category-title"]}></span>
                <span className={classes["category-value"]}>
                  {item.category}
                </span>
              </div>
              {item.person.map((person) => (
                <div
                  className={classes["course-description__teacher-container"]}
                  key={person.id}
                >
                  {getTitle(person.title)} {person.lastName} {person.firstName}
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <Card>
          <div>
            <LoadingSpinner />
          </div>
        </Card>
      )}
    </div>
  );
};

export default Courses;
