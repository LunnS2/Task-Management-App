import React, { useState } from "react";

function Task(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState({
    title: props.title,
    content: props.content,
    days: props.days
  });

  function handleDelete() {
    props.onDelete(props.id);
  }

  function handleEdit() {
    if (isEditing) {
      props.onUpdate(props.id, task);
    }
    setIsEditing(!isEditing);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setTask(prevTask => ({
      ...prevTask,
      [name]: value
    }));
  }

  return (
    <div className="task">
      {isEditing ? (
        <div>
          <input
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <textarea
            name="content"
            value={task.content}
            onChange={handleChange}
            placeholder="Describe your task..."
            rows="3"
          />
          <select
            name="days"
            value={task.days}
            onChange={handleChange}
          >
            <option value="">Select an option</option>
            <option value="Daily Task">Daily Task</option>
            <option value="Today Only">Today Only</option>
          </select>
        </div>
      ) : (
        <div>
          <h1>{task.title}</h1>
          <p>{task.content}</p>
          <p className="schedule">{task.days}</p>
        </div>
      )}
      <button className="delete" type="button" onClick={handleDelete}>Delete</button>
      <button className="edit" type="button" onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
    </div>
  );
}

export default Task;