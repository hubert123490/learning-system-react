import classes from "./Section.module.css";
import FileItem from "./FileItem";

const Section = (props) => {
  return (
    <div className={classes["assignment"]}>
      <div className={classes["card"]}>
        <div>
          <h3>{props.item.title}</h3>
        </div>
        <div className={classes["text"]} style={{ whiteSpace: "pre-wrap" }}>
          {props.item.description}
        </div>
        <hr />
        <h3>Materiały pomocnicze</h3>
        {props.item.files.map((file) => (
          <div key={file.id} className={classes["lesson-content__files"]}>
            <FileItem file={file} />
          </div>
        ))}
        <hr />
        <div>
          {/* <File
              taskId={props.item.id}
              addFileTaskRequest={props.addFileTaskRequest}
            />   */}
        </div>
      </div>
    </div>
  );
};

export default Section;
