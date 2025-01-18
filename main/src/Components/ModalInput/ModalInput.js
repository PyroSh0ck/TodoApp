import React, { useState, useRef } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ModalInput({ setToggleModal, toggleModal, projects, setProjects, setShowOffcanvas}) {
    const projectValue = useRef(null);
    const handleClose = () => setToggleModal(false);

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={toggleModal}
      onHide={handleClose}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
        <form onSubmit={(e)=> {
            e.preventDefault();
            setProjects([...projects, { name: projectValue.current.value, id: Date.now()}]);
            handleClose();
            setShowOffcanvas(true);
        }}>
            <h5>Project Name:</h5>
            <input type="text" ref={projectValue} ></input>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={() => {
            setProjects([...projects, { name: projectValue.current.value, id: Date.now()}]);
            handleClose();
            setShowOffcanvas(true);
        }}>Add</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalInput