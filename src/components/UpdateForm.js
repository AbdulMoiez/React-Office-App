import React, { forwardRef, useImperativeHandle, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Firebase from '../Firebase'

const UpdateForm = forwardRef(({ handleUpdate, expense }, ref) => {
  const [updatedExpense, setUpdatedExpense] = useState({ ...expense });
  const [id,setID] = useState();
  const [show, setShow] = useState(false);

  useImperativeHandle(ref, () => ({
    openModalUpdate: (id) => {
      console.log(id);

      // Set the ID state with the Firebase ID
      setID(id);
    
      // Fetch document data from Firestore
      Firebase.firestore()
        .collection('Expenses-Details')
        .doc(id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            // Document found, access its data
            const selectedExpense = { id: doc.id, ...doc.data() };
            console.log(selectedExpense);
            setUpdatedExpense(selectedExpense);
            setShow(true);
          } else {
            // Document does not exist
            console.log('Document not found!');
          }
        })
        .catch((error) => {
          console.error('Error fetching document:', error);
        });
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
    handleUpdate(id , updatedExpense);
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
                <option value="Petty Cash">Petty Cash</option>
                <option value="Internet Bill">Internet Bill</option>
                <option value="Water Filling">Water Filling</option>
                <option value="Guest Refreshment">Guest Refreshment</option>
                <option value="Meals & Tips">Meals & Tips</option>
                <option value="Miscellaneous">Miscellaneous</option>
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
                <option value="Office Expense">Office Expense</option>
                <option value="Common Expense">Common Expense</option>
                <option value="Petty Cash">Petty Cash</option>
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
