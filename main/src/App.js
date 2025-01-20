import "./App.css";
import { useState, useRef } from "react";
import Task from "./Components/Task/Task.js";
import NavbarComp from "./Components/NavbarComp/NavbarComp.js";
import ModalInput from "./Components/ModalInput/ModalInput.js";
import { BaseContexts } from "./Context/BaseContexts.js";
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
  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState(0);
  const taskValue = useRef(null);
  const [toggleModal, setToggleModal] = useState(false);
  const [workspaces, setWorkspaces] = useState([]);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [modalType, setModalType] = useState("addWorkspace");
  const [workspace, setWorkspace] = useState(0);

  const clickHandler = () => {
    setModalType("addTask");
    setToggleModal(true);
  };
  return (
    <AppDiv>
      <BaseContexts.Provider
        value={{
          toggleModal: [toggleModal, setToggleModal],
          workspaces: [workspaces, setWorkspaces],
          showOffcanvas: [showOffcanvas, setShowOffcanvas],
          modalType: [modalType, setModalType],
          workspace: [workspace, setWorkspace],
          project: [project, setProject],
        }}
      >
        <MenuDiv>
          <NavbarComp />
        </MenuDiv>
        <MainDiv>
          <ModalInput />
          <TaskHolder setTasks={setTasks} tasks={tasks} />
          <Button onClick={clickHandler}>Add Task</Button>
          <div className="textInput">
            <form
              onSubmit={(e) => {
                // Prevents the page from refreshing upon the submission of the form (pressing enter)
                e.preventDefault();
                // Adds the properties of a task into the setTasks function
                // The ...tasks basically grabs all the values in the tasks currently
                // Use ...tasks because it doesn't mutate the original array
                // so [...tasks, other thing] returns a new array with the elements of task
                // plus "other thing"
                // I used a useref to grab a reference to the input HTML element
                // taskValue.current actually returns the input element
                // so if I do taskValue.current.value, I get the text value in the input field
                setTasks([
                  ...tasks,
                  { name: taskValue.current.value, id: Date.now() },
                ]);
                taskValue.current.value = "";
              }}
            >
              <input type="text" ref={taskValue}></input>
            </form>
          </div>
          {project}
        </MainDiv>
      </BaseContexts.Provider>
    </AppDiv>
  );
}

function TaskHolder({ setTasks, tasks }) {
  return (
    <div className="TaskHolder">
      <h1 className="taskTitle"> Today's Tasks </h1>
      {tasks.map((data, index) => (
        <Task
          name={data.name}
          key={index}
          id={data.id}
          setTasks={setTasks}
          tasks={tasks}
        />
      ))}
    </div>
  );
}

export default App;
