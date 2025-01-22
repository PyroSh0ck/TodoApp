import React from "react";
import styled from "styled-components";
import { useBaseContexts } from "../../Context/BaseContexts";
import formatDate from "../../Hooks/formatDate";
import formatTime from "../../Hooks/formatTime";

const TaskText = styled.div`
  padding: none;
  background-color: transparent;
`;

const CustomInput = styled.input`
  margin: 0 1rem 0 0;
  background-color: transparent;
`;

const TaskDataHolder = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: flex-begin;
  align-items: center;
  padding: 1rem 0 0 0;
  border-bottom: 0.2rem solid #f3e0ec;
`;

const Div1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-begin;
  align-items: center;
  width: 100%;
  background-color: transparent;
`;

const Div2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-begin;
  align-items: center;
  width: 100%;
  background-color: transparent;
  margin: 1.5rem 0 1.5rem 0;
`;

const Div3 = styled(Div2)`
  justify-content: space-between;
`;
const TaskTextDate = styled(TaskText)`
  background-color: #f3e0ec;
  padding: 0.3rem;
  border: 0.3rem solid #f3e0ec;
  border-radius: 20px;
  margin: 0 1rem 0 0;
`;
const TaskTextNewDate = styled(TaskTextDate)`
  width: 45%;
  text-align: center;
`;
const TaskTextSpecial = styled(TaskTextDate)`
  width: 100%;
`;
const TaskTextProject = styled(TaskTextDate)`
  visibility = ${({ $isToggled }) => {
    if ($isToggled) {
      console.log("toggled");
      return `visible;`;
    } else {
      console.log("not toggled!");
      return `hidden;`;
    }
  }}
`;

function Task({ name, timeInfo, category, id }) {
  const baseVals = useBaseContexts();

  const [wptInfo, setWptInfo] = baseVals.wptInfo;
  const selected = baseVals.selected[0];

  let timeArr = timeInfo.split("T");

  let newDate = formatDate(timeArr[0]);
  let newTime = formatTime(timeArr[1]);

  let project = "";
  let toggled = true;

  wptInfo.projects.map((p) => {
    if (p.id === category) {
      project = p.name;
    }
    return null;
  });

  if (selected.project.id !== 0) {
    project = "";
    toggled = false;
  } else {
    project = "Project: " + project;
    toggled = true;
  }
  return (
    <TaskDataHolder>
      <Div1>
        <CustomInput
          type="checkbox"
          className="checkBox"
          onChange={(e) => {
            if (e.target.checked) {
              e.target.checked = false;
              const tempArr = wptInfo.tasks.filter((task) => task.id !== id);
              setWptInfo({
                ...wptInfo,
                tasks: tempArr,
              });
            }
          }}
        />
        <TaskTextSpecial>{name}</TaskTextSpecial>
      </Div1>
      <Div3>
        <Div2>
          <TaskTextDate>{newTime}</TaskTextDate>
          <TaskTextProject $isToggled={toggled}>{project}</TaskTextProject>
        </Div2>
        <TaskTextNewDate>{newDate}</TaskTextNewDate>
      </Div3>
    </TaskDataHolder>
  );
}

export default Task;
