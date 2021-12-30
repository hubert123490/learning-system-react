import classes from "./FileItem.module.css"

const FileItem = (props) => {

  return (
    <>
      {props.file.fileType.split("/")[0] === "video" && (
        <video className={classes["task-content__files-video"]} controls>
          <source src={props.file.downloadUrl} type={props.file.type} />
          Twoja przeglądarka nie wspiera odtwarzacza video.{" "}
        </video>
      )}
      <div className={classes["task-content__file"]}>
        <a
          href={props.file.downloadUrl}
          target="_blank"
          rel="noreferrer"
          className={classes["task-content__file_a"]}
        >
          {props.file.fileName}
        </a>{" "}
      </div>
    </>
  );
};

export default FileItem;
