import logo from './logo.svg';
import './App.css';
import { useState, useRef } from 'react';
import Task from './Components/Task.js'

function App() {
  const [tasks, setTasks] = useState([]);
  const taskValue = useRef(null)
  return (
    <div className="App">
      <div className="TaskHolder">
        <h1 className="taskTitle"> Today's Tasks </h1>
        {tasks.map((data, index) => (
          <Task name={data.name} key={index} id={data.id} setTasks={setTasks} tasks={tasks} />
        ))}
      </div>
      <div className="textInput">
        <form onSubmit={(e) => {
          e.preventDefault();
          console.log(taskValue.current.value)
          setTasks([...tasks, { name: taskValue.current.value, id: Date.now()}])
          taskValue.current.value = "";
        }}>
          <input type="text" ref={taskValue}></input>
        </form>
      </div>
     
    </div>
  )
}

export default App;
