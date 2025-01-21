import React, { useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import DropdownComp from "../DropdownComp/DropdownComp.js";
import { useBaseContexts } from "../../Context/BaseContexts";

function ModalInput() {
  const workspaceValue = useRef(null);
  const dateValue = useRef(null);

  const baseVals = useBaseContexts();

  const [modalArgs, setModalArgs] = baseVals.modalArgs;
  const [wptInfo, setWptInfo] = baseVals.wptInfo;
  const [selected, setSelected] = baseVals.selected;
  const [toggleCanvas, setToggleCanvas] = baseVals.toggleCanvas;

  const handleClose = () =>
    setModalArgs({
      // if I write ...modalArgs at the beginning, and then toggled: false afterwards,
      // there will be two keys with the same name, "toggled"
      // js chooses the second key value to keep (as its basically the most recent addition)
      // therefore it will update only the toggled value
      ...modalArgs,
      toggled: false,
    });
  const handleAdd = () => {
    if (modalArgs.type === "workspace") {
      setWptInfo({
        ...wptInfo,
        workspaces: [
          ...wptInfo.workspaces,
          { name: workspaceValue.current.value, id: Date.now() },
        ],
      });
    } else if (modalArgs.type === "project") {
      if (selected.workspace.id !== 0) {
        setWptInfo({
          ...wptInfo,
          projects: [
            ...wptInfo.projects,
            {
              name: workspaceValue.current.value,
              id: Date.now(),
              category: selected.workspace.id,
            },
          ],
        });
      } else {
        console.log(
          "hey for some reason, you tried to add a project and its workspace id is 0"
        );
      }
      setSelected({
        ...selected,
        workspace: {
          name: "",
          id: 0,
        },
      });
    } else if (modalArgs.type === "addTask") {
      if (selected.project.id !== 0) {
        setWptInfo({
          ...wptInfo,
          tasks: [
            ...wptInfo.tasks,
            {
              name: workspaceValue.current.value,
              id: Date.now(),
              time: dateValue.current.value,
              category: selected.project.id,
            },
          ],
        });
      } else {
        console.log(
          "Hey, your project has the default value, it doesn't seem like you chose a project for this task!"
        );
      }
      setSelected({
        ...selected,
        project: {
          name: "",
          id: 0,
          category: 0,
        },
      });
    }
    handleClose();
    setToggleCanvas(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd();
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={modalArgs.toggled}
      onHide={handleClose}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {modalArgs.modalInfo.heading}
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
            <h5>{modalArgs.modalInfo.inputTitle}</h5>
            <input type="text" ref={workspaceValue}></input>
          </div>
          <ModalSecondTitle modalInfo={modalArgs.modalInfo} />
          <ModalThirdTitle
            showDate={modalArgs.modalInfo.showDate}
            dateValue={dateValue}
          ></ModalThirdTitle>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleAdd}>Add</Button>
      </Modal.Footer>
    </Modal>
  );
}

function ModalSecondTitle({ modalInfo }) {
  const baseVals = useBaseContexts();
  const [wptInfo, setWptInfo] = baseVals.wptInfo;

  // I am not going to add the functionality for adding a project without clicking on a workspace first just yet.

  if (modalInfo.secondInput === true) {
    // I won't have to worry about checking to make sure that the selected workspace/project isn't null
    // because whenever I do implement a button that can add a task/project to any workspace
    // I will send over a secondInput = false;
    if (modalInfo.type === "project") {
      return (
        <>
          <h5>{modalInfo.secondTitle}</h5>
          <DropdownComp
            Dtitle="Select Workspace: "
            Ddata={wptInfo.workspaces}
            Did={-1}
            Dmodifiers={{
              includePlus: false,
            }}
          />
        </>
      );
    } else if (modalInfo.type === "task") {
      return (
        <>
          <h5>{modalInfo.secondTitle}</h5>
          <DropdownComp
            Dtitle="Select Project: "
            Ddata={wptInfo.projects}
            Did={-2}
            Dmodifiers={{
              includePlus: false,
            }}
          />
        </>
      );
    }
  }
}

function ModalThirdTitle({ showDate, dateValue }) {
  if (showDate) {
    return (
      <>
        <h5>Please Select a Date</h5>
        <input ref={dateValue} type="datetime-local"></input>
      </>
    );
  } else {
    return null;
  }
}
export default ModalInput;
