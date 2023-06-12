import React, { forwardRef, useImperativeHandle, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const UpdateForm = forwardRef(({ handleUpdate, expense }, ref) => {
  const [updatedExpense, setUpdatedExpense] = useState({ ...expense });
  const [show, setShow] = useState(false);

  useImperativeHandle(ref, () => ({
    openModalUpdate: (id) => {
      console.log(id);
      const expenseData = localStorage.getItem('expenseList');
      const parsedData = JSON.parse(expenseData);
      const selectedExpense = parsedData.find((item) => item.id === id);
      setUpdatedExpense(selectedExpense);
      setShow(true);
    },
  }));

  const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedExpense((prevExpense) => ({
      ...prevExpense,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(updatedExpense);
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Expense Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={updatedExpense.date}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Account</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="account"
                value={updatedExpense.account}
                onChange={handleChange}
              >
                <option value="Electricity Bill">Electricity Bill</option>
                <option value="Internet Bill">Internet Bill</option>
                <option value="Water Filling">Water Filling</option>
                <option value="Guest Refreshment">Guest Refreshment</option>
                <option value="Meals & Tips">Meals & Tips</option>
                <option value="Miscellaneous">Miscellaneous</option>
                <option value="PettyCash">Petty Cash</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Comments</Form.Label>
              <Form.Control
                as="textarea"
                name="comments"
                value={updatedExpense.comments}
                onChange={handleChange}
                style={{ height: '100px' }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={updatedExpense.amount}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Expense Type</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="type"
                value={updatedExpense.type}
                onChange={handleChange}
              >
                <option value="Expense">Expense</option>
                <option value="Income">[Petty Cash]</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});

export default UpdateForm;
