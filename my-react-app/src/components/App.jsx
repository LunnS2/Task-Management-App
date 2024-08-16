import { useState, useEffect, useContext } from 'react';
import "../../src/App.css";
import Header from "./Header";
import Footer from "./Footer";
import CreateTaskArea from "./Create-Task-Area";
import Task from "./Task";
import axios from "axios";
import { ThemeContext } from './ThemeContext';

function App() {
  const {theme} = useContext(ThemeContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MY_API}/tasks`);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }
    fetchTasks();
  }, []);

  async function addTask(newTask) {
    try {
      const response = await axios.post(`${import.meta.env.VITE_MY_API}/tasks`, newTask);
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }  
  }

  async function deleteTask(id) {
    try {
      await axios.delete(`${import.meta.env.VITE_MY_API}/tasks/${id}`)
      setTasks((prevTasks) => prevTasks.filter((taskItem) => taskItem.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

  async function updateTask(id, updatedTask) {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_MY_API}/tasks/${id}`, updatedTask)
      setTasks((prevTasks) => prevTasks.map((taskItem) => taskItem.id === id ? response.data : taskItem));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }

  return (
    <div className={theme}>
      <Header />
      <CreateTaskArea onAdd={addTask} />
      {tasks.map((taskItem, index) => {
        return (
          <Task
            key={taskItem.id}
            id={taskItem.id}
            title={taskItem.title}
            content={taskItem.content}
            days={taskItem.days}
            onDelete={deleteTask}
            onUpdate={updateTask}
          />
        );
      })}
      <Footer />
    </div>
  )
}

export default App