import { useState, useEffect } from "react";
import StatusLine from "./components/StatusLine";
import "./styles/App.scss";

function App() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    console.log("using effect");
    LoadTasksFromLS();
  }, []);

  const addEmptyTask = (status) => {
    const lastTask = tasks[tasks.length - 1];
    let newTaskId = 1;
    if (lastTask !== undefined) {
      newTaskId = lastTask.id + 1;
    }
    setTasks((tasks) => [
      ...tasks,
      {
        id: newTaskId,
        title: "",
        description: "",
        urgency: "",
        status: status,
      },
    ]);
  };
  const addTask = (taskToAdd) => {
    if (taskToAdd.title === "") {
      console.log("empty title");
      //delete task
      deleteTask(taskToAdd.id);
      return;
    }
    let filteredTasks = tasks.filter((task) => task.id !== taskToAdd.id);
    let newTaskList = [...filteredTasks, taskToAdd];
    setTasks(newTaskList);
    saveTaskToLS(newTaskList);
  };
  const deleteTask = (taskId) => {
    let filteredTasks = tasks.filter((task) => {
      return task.id !== taskId;
    });
    setTasks(filteredTasks);
    saveTaskToLS(filteredTasks);
  };
  const moveTask = (id, newStatus) => {
    let task = tasks.find((task) => task.id === id);
    task.status = newStatus;
    let filteredTasks = tasks.filter((task) => task.id !== id);
    let newTaskList = [...filteredTasks, task];
    setTasks(newTaskList);
    saveTaskToLS(newTaskList);
  };
  const saveTaskToLS = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  const LoadTasksFromLS = () => {
    let loadedTasks = localStorage.getItem("tasks");
    let tasks = JSON.parse(loadedTasks);
    if (tasks) {
      setTasks(tasks);
    }
  };

  return (
    <div className="App">
      <h1>Task Management</h1>
      <main>
        <section>
          <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="Backlog"
          />
          <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="Progress"
          />
          <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="Done"
          />
        </section>
      </main>
    </div>
  );
}

export default App;
