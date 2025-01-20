import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBars } from "@fortawesome/free-solid-svg-icons";
import DropdownComp from "../DropdownComp/DropdownComp.js";
import { useBaseContexts } from "../../Context/BaseContexts.js";
import styled from "styled-components";

const Bars = styled(FontAwesomeIcon)`
  visibility: ${({ $show }) => {
    if ($show) {
      return `visible;`;
    } else {
      return `hidden;`;
    }
  }};

  padding: 3rem 3rem 3rem 3rem;
  font-size: 2rem;
  color: #f2befc;
`;

function NavbarComp() {
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

  const { toggleModal, modalType, showOffcanvas, workspaces } =
    useBaseContexts();
  const [toggleModalVal, setToggleModalVal] = toggleModal;
  const [modalTypeVal, setModalTypeVal] = modalType;
  const [showOffcanvasVal, setShowOffcanvasVal] = showOffcanvas;
  const [workspacesVal, setWorkspacesVal] = workspaces;

  const handleClose = () => setShowOffcanvasVal(false);
  const handleOpen = () => setShowOffcanvasVal(true);
  const handleAdd = () => {
    setShowOffcanvasVal(false);
    setToggleModalVal(true);
    setModalTypeVal("addWorkspace");
  };

  return (
    <>
      <Bars icon={faBars} onClick={handleOpen} $show={!showOffcanvasVal} />

      <Offcanvas show={showOffcanvasVal} onHide={handleClose}>
        <Offcanvas.Header closeButton={false}>
          <Offcanvas.Title> Workspaces </Offcanvas.Title>
          <FontAwesomeIcon
            icon={faPlus}
            className="plusIcon"
            onClick={handleAdd}
          ></FontAwesomeIcon>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {workspacesVal.map((wdata, windex) => (
            <DropdownComp
              key={windex}
              Dtitle={wdata.name || undefined}
              Did={wdata.id || undefined}
              Ddata={wdata.projects || -99}
              Dmodifiers={{
                includePlus: true,
                workspaceName: wdata.name || undefined,
              }}
            />
          ))}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NavbarComp;
