import React, { useState } from "react";

function CreateTaskArea(props) {
    const [task, setTask] = useState({
        title: "",
        content: "",
        days: "",
    });

    function handleChange(event) {
        const {name, value} = event.target;

        setTask(prevTask => {
            return {
                ...prevTask,
                [name]: value
            };
        });
    }

    function submitTask(event) {
        props.onAdd(task);
        setTask({
          title: "",
          content: "",
          days: "",
        });
        event.preventDefault();
      }
    

    return(
        <div>
            <form>
                <input
                    name="title"
                    onChange={handleChange}
                    value={task.title}
                    placeholder="Title"
                />
                <textarea
                    name="content"
                    onChange={handleChange}
                    value={task.content}
                    placeholder="Describe your task..."
                    rows="3"
                />
                <select
                    name="days"
                    onChange={handleChange}
                    value={task.days}
                >
                    <option value="">Select an option</option>
                    <option value="Daily Task">Daily Task</option>
                    <option value="Today Only">Today Only</option>
                </select>
                <button onClick={submitTask}>Add</button>
            </form>
            
        </div>
    );
}

export default CreateTaskArea;