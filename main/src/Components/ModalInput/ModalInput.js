import React, { useState, useRef, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import DropdownComp from "../DropdownComp/DropdownComp.js";
import { useBaseContexts } from "../../Context/BaseContexts";

function ModalInput() {
  const workspaceValue = useRef(null);
  const workspaceCategoryValue = useRef(null);
  const {
    modalType,
    workspaces,
    workspace,
    showOffcanvas,
    toggleModal,
    project,
  } = useBaseContexts();

  const [modalTypeVal, setModalTypeVal] = modalType;
  const [workspacesVal, setWorkspacesVal] = workspaces;
  const [workspaceVal, setWorkspaceVal] = workspace;
  const [showOffcanvasVal, setShowOffcanvasVal] = showOffcanvas;
  const [toggleModalVal, setToggleModalVal] = toggleModal;
  const [projectVal, setProjectVal] = project;

  const handleClose = () => setToggleModalVal(false);
  const handleSubmit = (e) => {
    let tempVal;
    e.preventDefault();

    console.log(modalTypeVal);
    if (modalTypeVal == "addWorkspace") {
      setWorkspacesVal([
        ...workspacesVal,
        { name: workspaceValue.current.value, id: Date.now(), projects: [] },
      ]);
    } else if (modalTypeVal == "addProject") {
      const newArr = workspacesVal.map((ws) => {
        if (ws.id == workspaceVal) {
          let tempObj = ws;
          tempObj.projects.push({
            name: workspaceValue.current.value,
            id: Date.now(),
          });
          return tempObj;
        } else {
          return ws;
        }
      });
      console.log(newArr);
      setWorkspacesVal(newArr);
      setWorkspaceVal("");
    }

    handleClose();
    setShowOffcanvasVal(true);
  };
  let modalInfo = {
    heading: "",
    inputTitle: "",
    secondInput: false,
    secondTitle: "",
    showDate: false,
  };

  if (modalTypeVal == "addWorkspace") {
    modalInfo.heading = "Add a new Workspace!";
    modalInfo.inputTitle = "Workspace Name:";
  } else if (modalTypeVal == "addProject") {
    modalInfo.heading = "Add a new Project!";
    modalInfo.inputTitle = "Project Name:";
    modalInfo.secondInput = true;
    modalInfo.secondTitle = "Please select a workspace:";
  } else if (modalTypeVal == "addTask") {
    modalInfo.heading = "Add a new Task!";
    modalInfo.inputTitle = "Task Name";
    modalInfo.secondInput = true;
    modalInfo.secondTitle = "Please select a project:";
    modalInfo.showDate = true;
  }
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={toggleModalVal}
      onHide={handleClose}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {modalInfo.heading}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
        <form onSubmit={handleSubmit}>
          <div>
            <h5>{modalInfo.inputTitle}</h5>
            <input type="text" ref={workspaceValue}></input>
          </div>
          <ModalSecondTitle
            modalType={modalTypeVal}
            workspace={workspaceVal}
            workspaces={workspacesVal}
            modalInfo={modalInfo}
            projectVal={projectVal}
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
        <Button
          onClick={() => {
            setWorkspacesVal([
              ...workspacesVal,
              {
                name: workspaceValue.current.value,
                id: Date.now(),
                projects: [],
              },
            ]);
            handleClose();
            setShowOffcanvasVal(true);
          }}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function ModalSecondTitle({
  modalType,
  workspace,
  workspaces,
  modalInfo,
  projectVal,
}) {
  if (modalType == "addProject") {
    if (workspace == "") {
      return (
        <div>
          <h5>{modalInfo.secondTitle}</h5>
          <DropdownComp
            Dtitle="Select Workspace "
            Ddata={workspaces}
            Did={0}
            Dmodifiers={{
              includePlus: false,
            }}
          />
        </div>
      );
    } else {
      return null;
    }
  } else if (modalType == "addTask") {
    if (projectVal == "") {
      let projects = [];
      workspaces.map((ws) => {
        ws.projects.map((wp) => {
          projects.push(wp);
        });
      });
      return (
        <div>
          <h5>{modalInfo.secondTitle}</h5>
          <DropdownComp
            Dtitle="Select Project "
            Ddata={projects}
            Did={0}
            Dmodifiers={{
              includePlus: false,
            }}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ModalInput;
