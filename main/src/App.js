import "./App.css";
import { useState } from "react";
import Task from "./Components/Task/Task.js";
import NavbarComp from "./Components/NavbarComp/NavbarComp.js";
import ModalInput from "./Components/ModalInput/ModalInput.js";
import { BaseContexts, useBaseContexts } from "./Context/BaseContexts.js";
import styled from "styled-components";
import Button from "react-bootstrap/Button";

const AppDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ModifiedTaskHolder = styled.div`
  background-color: #f2befc;
  padding: 0.5rem;
  border: 0.1rem solid #f2befc;
  border-radius: 10px;
  width: 35%;
  margin: 2rem;
`;

const TextCompHolder = styled.div`
  padding: 1rem;
  margin: 2rem 0 0 0;
`;

const ModifiedButton = styled(Button)`
  background-color: #f2befc;
  border-color: #f2befc;
  color: black;

  transition: 0.3s font-size;

  &:hover {
    font-size: 1.1rem;
    background-color: #f2befc;
    border-color: #f2befc;
  }
`;
const MenuDiv = styled.div`
  width: 10%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const MainDiv = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0 10% 0 0;
`;
function App() {
  const [wptInfo, setWptInfo] = useState({
    workspaces: [
      {
        name: "balls",
        id: -1202,
      },
    ],
    projects: [
      { name: "balls 1", id: 12901902, category: -1202 },
      { name: "ball 2", id: 109209, category: -1202 },
    ],
    tasks: [],
  });
  const [selected, setSelected] = useState({
    project: { name: "", id: 0, category: 0 },
    workspace: { name: "", id: 0 },
  });

  const [toggleCanvas, setToggleCanvas] = useState(false);
  const [modalArgs, setModalArgs] = useState({
    toggled: false,
    type: "workspace",
    modalInfo: {
      heading: "",
      inputTitle: "",
      secondInput: false,
      secondTitle: "",
      dateInput: false,
    },
  });

  const clickHandler = () => {
    if (selected.project.id !== 0) {
      setModalArgs({
        toggled: true,
        type: "task",
        modalInfo: {
          heading: "Add a new Task!",
          inputTitle: "Task Name:",
          secondInput: false,
          secondTitle: "",
          dateInput: true,
        },
      });
    } else {
      setModalArgs({
        toggled: true,
        type: "task",
        modalInfo: {
          heading: "Add a new Task!",
          inputTitle: "Task Name:",
          secondInput: true,
          secondTitle: "Please select a project:",
          dateInput: true,
        },
      });
    }
  };
  return (
    <AppDiv>
      <BaseContexts.Provider
        value={{
          wptInfo: [wptInfo, setWptInfo],
          selected: [selected, setSelected],
          toggleCanvas: [toggleCanvas, setToggleCanvas],
          modalArgs: [modalArgs, setModalArgs],
        }}
      >
        <MenuDiv>
          <NavbarComp />
        </MenuDiv>
        <MainDiv>
          <ModalInput />
          <TextCompHolder>
            <TextHolder />
          </TextCompHolder>
          <ModifiedButton onClick={clickHandler}>Add Task</ModifiedButton>
          <ModifiedTaskHolder>
            <TaskHolder />
          </ModifiedTaskHolder>
        </MainDiv>
      </BaseContexts.Provider>
    </AppDiv>
  );
}

function TaskHolder() {
  // Selected in this case refers to the current project. It has all the information necessary
  // to construct anything about the project, but if the project id is 0, we know that
  // there is no project selected.

  /* This snippet of code just handles all edge cases (I think, cuz I always forget these. But for my future reference, I tried to cover all edge cases here) */

  const baseVals = useBaseContexts();

  const project = baseVals.selected[0].project;
  const tasks = baseVals.wptInfo[0].tasks;

  if (project === null || project === undefined) {
    throw new Error(
      "Hey, project is: ",
      project,
      '. Go check up on your code, because the default value is an object in this format: {name: "", id: 0, category: 0}'
    );
  } else if (project.id === undefined || project.id === null) {
    throw new Error(
      "Hey, the id of the current project is: ",
      project.id,
      ". Go check up on your code because the id should be 0 (as a default value) or some other number"
    );
  }

  // To practice DRY, I'll create a lil function since my if statement logic is basically the same

  const conditionalReturner = (condition, task, index) => {
    if (condition) {
      return (
        <Task
          name={task.name}
          timeInfo={task.time}
          key={index}
          category={task.category}
          id={task.id}
        />
      );
    } else {
      return null;
    }
  };

  // Now a useEffect to track whenever the state of project changes!

  try {
    let renderedComponent;
    if (project.id === 0) {
      console.log("project id = 0");
      // So if there is no current project selected, then we display all tasks
      renderedComponent = tasks.map((task, index) => {
        if (task !== null) {
          return conditionalReturner(true, task, index);
        } else {
          return conditionalReturner(false, task, index);
        }
      });
      // First check to make sure task isn't null (if there aren't any tasks and the tasks arr is empty)
    } else {
      console.log("Project id is not 0");
      renderedComponent = tasks.map((task, index) => {
        if (task !== null) {
          if (task.category === project.id) {
            return conditionalReturner(true, task, index);
          } else {
            return conditionalReturner(false, task, index);
          }
        } else {
          return null;
        }
        // Wish I could have looped the conditoinalreturner function but alas I couldn't!
      });
    }
    return renderedComponent;
  } catch (err) {
    console.error(err);
  }
}

function TextHolder() {
  const baseVals = useBaseContexts();

  const selected = baseVals.selected[0];
  const wptInfo = baseVals.wptInfo[0];

  if (selected.project.id !== 0) {
    let pname = "";
    wptInfo.projects.map((p) => {
      if (p.id === selected.project.id) {
        pname = p.name;
      }
      return null;
    });
    return <h1>{pname}'s Tasks!</h1>;
  } else {
    return <h1>Today's Tasks!</h1>;
  }
}
export default App;
