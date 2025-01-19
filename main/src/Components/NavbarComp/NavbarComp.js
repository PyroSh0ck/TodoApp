import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import DropdownComp from '../DropdownComp/DropdownComp.js';



function NavbarComp({ setCurProj, setToggleModal, workspaces, show, setShow, projects }) { 

    /* 
        I want projects to have a specific ID, so that whenever you click on them,
        the application filters all of the tasks by project. And whenever you have 
        a certain project selected, any task added gets added to that project. 

        In the actual sidebar, each project will just be a regular link that, once
        clicked on, will change the state of the parent. 

        Each project will look like this:

        { name : "[INSERT PROJECT NAME HERE]", id: Date.now(), workspace : some number (thats the workspace id)}

        Correction, I'll have the entire list of projects in the data for the workspace. That's easier than looping through all of them
        and then performing an operationt to check and see 
    */

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true); 
    const handleAdd = () => {
        setShow(false);
        setToggleModal(true);
    }

    return (
        <>
            <Button variant="primary" onClick={handleOpen}>
                Launch
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton={false}>
                    <Offcanvas.Title> Workspaces </Offcanvas.Title>
                    <FontAwesomeIcon icon={faPlus} className="plusIcon" onClick={handleAdd}></FontAwesomeIcon>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {console.log(workspaces)}
                    {workspaces.map((wdata, windex) => (
                       <DropdownComp wdata={wdata} windex={windex} />
                    ))}
                </Offcanvas.Body>
            </Offcanvas>
        </>
  )
}

export default NavbarComp