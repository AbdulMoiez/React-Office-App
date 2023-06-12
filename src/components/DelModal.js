import React, { useState, forwardRef, useImperativeHandle } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../App.css';

const DelModal = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useImperativeHandle(ref, () => ({
    openModalDel(id) {
      console.log('open modal Del', id);
      localStorage.setItem('id', JSON.stringify(id));
      setShow(true); // Show the modal
    },
    Delete() {
      const ID = JSON.parse(localStorage.getItem('id'));
      console.log('Deleting is working ');

      props.handleDelete(ID); // Call the handleDelete prop with the ID

      setShow(false); // Hide the modal
      setShowToast(true); // Show the toast message
      setTimeout(() => setShowToast(false), 2000); // Hide the toast message after 2 seconds
    },
  }));

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete this item?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Once you delete the entry, you will not be able to update or recover it.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={ref.current?.Delete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
      
        {showToast && (
          <div id="toast">
            <div id="img">
              <i className="fa-solid fa-thumbs-up fa-bounce"></i>
            </div>
            <div id="desc">
              <i className="fa-solid fa-face-smile-beam fa-bounce"></i>
            </div>
          </div>
        )}
      </div>
    </>
  );
});

export default DelModal;
