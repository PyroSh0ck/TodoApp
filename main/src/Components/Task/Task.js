import React from 'react'

function Task({ name, id, setTasks, tasks }) {
  return (
    <div className="task">
        <input type='checkbox' className="checkBox" onChange={(e)=>{
            if (e.target.checked) {
                e.target.checked = false;
                console.log(tasks)
                console.log(tasks.filter((task)=>task.id != id))
                setTasks(tasks.filter((task) => task.id != id))
                //setTasks((prevTasks) => {prevTasks.filter((task) => task.name != name)})
            }
        }}></input>
        <p className="taskText">{name}</p>
    </div>
  )
}

export default Task