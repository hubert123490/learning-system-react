import React from "react";

import classes from "./Input.module.css";

function InputField(props) {
  const {
    label,
    type,
    name,
    handleChange,
    errorMessage,
    isValid,
    value
  } = props;

  return (
    <div className={classes.inputContainer}>
      <label>{label}</label>
      <input type={type} name={name} value={value} onChange={handleChange} style={{borderColor: errorMessage && !isValid ? "red" : ""}}/>
      {errorMessage && !isValid && (
        <span className={classes.error}>{errorMessage}</span>
      )}
    </div>
  );
}

export default React.memo(InputField);
