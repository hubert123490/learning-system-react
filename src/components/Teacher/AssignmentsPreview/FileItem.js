import { useTranslation } from "react-i18next";
import classes from "./FileItem.module.css";

const FileItem = (props) => {
  const { t } = useTranslation();

  return (
    <>
      {props.file.fileType.split("/")[0] === "video" && (
        <video className={classes["task-content__files-video"]} controls>
          <source src={props.file.downloadUrl} type={props.file.type} />
          {t("Teacher__AssignmentsPreview_FileNotSupported")}{" "}
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
