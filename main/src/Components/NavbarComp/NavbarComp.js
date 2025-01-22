import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faBars,
  faHouse,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { useBaseContexts } from "../../Context/BaseContexts.js";
import styled from "styled-components";
import DropdownComp from "../DropdownComp/DropdownComp.js";

const Icon = styled(FontAwesomeIcon)`
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

  transition: 0.3s font-size;

  &:hover {
    font-size: 3rem;
  }
`;

function NavbarComp() {
  const baseVals = useBaseContexts();

  const [toggleCanvas, setToggleCanvas] = baseVals.toggleCanvas;
  const setModalArgs = baseVals.modalArgs[1];
  const wptInfo = baseVals.wptInfo[0];
  const [selected, setSelected] = baseVals.selected;

  const handleClose = () => setToggleCanvas(false);
  const handleOpen = () => setToggleCanvas(true);
  const handleAdd = () => {
    setToggleCanvas(false);
    setModalArgs({
      toggled: true,
      type: "workspace",
      modalInfo: {
        heading: "Add a new Workspace!",
        inputTitle: "Workspace Name: ",
        secondInput: false,
        secondTitle: "",
        dateInput: false,
      },
    });
  };

  return (
    <>
      <Icon icon={faBars} onClick={handleOpen} $show={!toggleCanvas} />
      <Icon
        icon={faHouse}
        onClick={() => {
          setSelected({
            ...selected,
            project: { name: "", id: 0, category: 0 },
          });
        }}
        $show={!toggleCanvas}
      />
      <Icon icon={faCalendarDays} $show={!toggleCanvas} />

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
    const returnedInfo = workspaces.map((workspace, index) => {
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
                replaceTitle: false,
              }}
            />
          );
        } else {
          console.log("returned null");
          return null;
        }
      } else {
        console.log("returned null");
        return null;
      }
    });
    return returnedInfo;
  } else {
    console.log("retunred null");
    return null;
  }
}
export default NavbarComp;
