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
  const baseVals = useBaseContexts();

  const [toggleCanvas, setToggleCanvas] = baseVals.toggleCanvas;
  const [modalArgs, setModalArgs] = baseVals.modalArgs;
  const [wptInfo, setWptInfo] = baseVals.wptInfo;

  const handleClose = () => setToggleCanvas(false);
  const handleOpen = () => setToggleCanvas(true);
  const handleAdd = () => {
    setToggleCanvas(false);
    setModalArgs({
      toggled: true,
      type: "workspace",
      modalInfo: {
        heading: "Add a new Workspace!",
        inputTitle: "Workspace Name:",
        secondInput: false,
        secondTitle: "",
        dateInput: false,
      },
    });
  };

  return (
    <>
      <Bars icon={faBars} onClick={handleOpen} $show={!toggleCanvas} />

      <Offcanvas show={toggleCanvas} onHide={handleClose}>
        <Offcanvas.Header closeButton={false}>
          <Offcanvas.Title> Workspaces </Offcanvas.Title>
          <FontAwesomeIcon
            icon={faPlus}
            className="plusIcon"
            onClick={handleAdd}
          ></FontAwesomeIcon>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <CanvasBody wptInfo={wptInfo} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function CanvasBody({ wptInfo }) {
  if (wptInfo !== null && wptInfo !== undefined) {
    let workspaces = wptInfo.workspaces;

    workspaces.map((workspace, index) => {
      if (workspace !== null && workspace !== undefined) {
        if (workspace.id !== null && workspace.id !== undefined) {
          const tempData = wptInfo.projects.map((project) => {
            if (project.category === workspace.id) {
              return project;
            } else {
              return null;
            }
          });

          return (
            <DropdownComp
              key={index}
              Dtitle={workspace.name}
              Did={workspace.id}
              Ddata={tempData}
              Dmodifiers={{
                includePlus: true,
                workspaceName: workspace.name,
              }}
            />
          );
        } else {
          return null;
        }
      } else {
        return null;
      }
    });
  } else {
    return null;
  }
}
export default NavbarComp;
