import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'



function NavbarComp({ setCurProj, setToggleModal, projects, show, setShow }) { 

    /* 
        I want projects to have a specific ID, so that whenever you click on them,
        the application filters all of the tasks by project. And whenever you have 
        a certain project selected, any task added gets added to that project. 

        In the actual sidebar, each project will just be a regular link that, once
        clicked on, will change the state of the parent. 

        Each project will look like this:

        { name : "[INSERT PROJECT NAME HERE]", id: Date.now()}
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
                    <Offcanvas.Title> Projects </Offcanvas.Title>
                    <FontAwesomeIcon icon={faPlus} className="plusIcon" onClick={handleAdd}></FontAwesomeIcon>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {projects.map((data, index) => <h1 key={index} className="project" onClick={() => {
                        setCurProj(data.id)
                    }}>{data.name}</h1>)}
                </Offcanvas.Body>
            </Offcanvas>
        </>
  )
}

export default NavbarComp