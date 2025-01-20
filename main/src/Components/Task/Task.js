import React from "react";
import styled from "styled-components";

const TaskText = styled.div`
  padding: none;
  background-color: transparent;
`;

function Task({ name, id, setTasks, tasks }) {
  return (
    <div className="task">
      <input
        type="checkbox"
        className="checkBox"
        onChange={(e) => {
          if (e.target.checked) {
            e.target.checked = false;
            console.log(tasks);
            console.log(tasks.filter((task) => task.id != id));
            setTasks(tasks.filter((task) => task.id != id));
            //setTasks((prevTasks) => {prevTasks.filter((task) => task.name != name)})
          }
        }}
      ></input>
      <TaskText>{name}</TaskText>
    </div>
  );
}

export default Task;
