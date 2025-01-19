import './App.css';
import { useState, useRef } from 'react';
import Task from './Components/Task/Task.js';
import NavbarComp from "./Components/NavbarComp/NavbarComp.js";
import ModalInput from './Components/ModalInput/ModalInput.js';

function App() {
  const [tasks, setTasks] = useState([]);
  const [curProj, setCurProj] = useState(0)
  const taskValue = useRef(null)
  const [toggleModal, setToggleModal] = useState(false);
  const [workspaces, setWorkspaces] = useState([]);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [projects, setProjects] = useState([]);
  
  return (
    <div className="App">
      <ModalInput setToggleModal={setToggleModal} toggleModal={toggleModal} workspaces={workspaces} setWorkspaces={setWorkspaces} setShowOffcanvas={setShowOffcanvas} />
      <NavbarComp setCurProj={setCurProj} setToggleModal={setToggleModal} workspaces={workspaces} show={showOffcanvas} setShow={setShowOffcanvas} projects={projects} />
      <TaskHolder setTasks={setTasks} tasks={tasks}  />
      <div className="textInput">
        <form onSubmit={(e) => {
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
          setTasks([...tasks, { name: taskValue.current.value, id: Date.now()}])
          taskValue.current.value = "";
        }}>
          <input type="text" ref={taskValue}></input>
        </form>
      </div>
      {curProj}
     
    </div>
  )
}

function TaskHolder({setTasks, tasks}) {
  return (<div className="TaskHolder">
    <h1 className="taskTitle"> Today's Tasks </h1>
    {tasks.map((data, index) => <Task name={data.name} key={index} id={data.id} setTasks={setTasks} tasks={tasks} />)}
  </div>);
}

export default App;
