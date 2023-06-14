import React, { useState, forwardRef, useImperativeHandle } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../App.css';

const DelModal = forwardRef(({ handleDelete }, ref) => {
  const [deleteExpense, setDeleteExpense] = useState(null);
  const [show, setShow] = useState(false);

  const openModalDel = (expenseId) => {
    console.log('open modal Del', expenseId);
    setDeleteExpense(expenseId);
    setShow(true); // Show the modal
  };

  const handleSubmit = () => {
    handleDelete(deleteExpense);
    handleClose();
  };

  const handleClose = () => setShow(false);

  useImperativeHandle(ref, () => ({
    openModalDel,
  }));

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
          <Button variant="danger" onClick={handleSubmit}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
   
    </>
  );
});

export default DelModal;
