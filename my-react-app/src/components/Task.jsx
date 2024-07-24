import React from "react";

function Task(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="task">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <p id="schedule">{props.days}</p>
      <button onClick={handleClick}>delete</button>
    </div>
  );
}

export default Task;