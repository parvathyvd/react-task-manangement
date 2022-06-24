import React from "react";
import Task from "./Task";
import "../styles/statusLine.scss";

const StatusLine = ({
  status,
  addEmptyTask,
  tasks,
  addTask,
  deleteTask,
  moveTask,
}) => {
  let taskList, tasksForStatus;

  const handleEmptyTask = () => {
    addEmptyTask(status);
  };

  if (tasks) {
    tasksForStatus = tasks.filter((task) => task.status === status);
  }

  if (tasksForStatus) {
    taskList = tasksForStatus.map((task) => {
      return (
        <Task
          addTask={(task) => addTask(task)}
          deleteTask={(taskId) => deleteTask(taskId)}
          moveTask={(id, status) => moveTask(id, status)}
          key={task.id}
          task={task}
        />
      );
    });
  }

  return (
    <div className="statusLine">
      <h3>{status}</h3>
      {taskList}
      <button className="button addTask" onClick={handleEmptyTask}>
        +
      </button>
    </div>
  );
};

export default StatusLine;
