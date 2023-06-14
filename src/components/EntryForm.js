import React, { useState, forwardRef, useImperativeHandle } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EntryForm = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    openModalEntry() {
      setShow(true);
    },
  }));

  const [show, setShow] = useState(false);
  const [expenseData, setExpenseData] = useState({
    date: new Date().toISOString().slice(0, 10),
    account: 'Electricity Bill',
    comments: '',
    amount: '',
    type: 'Office Expense',
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const successMessage = () => {
    toast.success('Save SuccessFully!', {
      position: "bottom-center",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

const errorMessage = () => {
  toast.error('Error saving expense !', {
    position: "bottom-center",
    autoClose: 1200,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
});
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { handleSave} = props;

    const newExpense = { ...expenseData };

    // Store the data in Firestore
    const db = firebase.firestore();
    db.collection('Expenses-Details')
    .add(newExpense)
    .then((docRef) => {
        successMessage()
        const generatedId = docRef.id;
        console.log('Auto-generated ID:', generatedId);
        handleSave({ id: generatedId, ...newExpense });
      })
      .catch((error) => {
        errorMessage()
        console.error('Error adding expense to Firestore:', error);
      });

    setExpenseData({
      date: new Date().toISOString().slice(0, 10),
      account: 'Electricity Bill',
      comments: '',
      amount: '',
      type: 'Office Expense',
    });

   
  };

  return (
    <>
    <ToastContainer />
      <Button variant="danger" onClick={handleShow}>
        Add New Expenses
        
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Expense Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={expenseData.date}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Account</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="account"
                value={expenseData.account}
                onChange={handleInputChange}
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
              <FloatingLabel controlId="floatingTextarea2" label="Comments">
                <Form.Control
                  as="textarea"
                  name="comments"
                  value={expenseData.comments}
                  onChange={handleInputChange}
                  style={{ height: '100px' }}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={expenseData.amount}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Expense Type</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="type"
                value={expenseData.type}
                onChange={handleInputChange}
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
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});

export default EntryForm;
