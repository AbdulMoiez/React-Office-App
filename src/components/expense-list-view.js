import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import DelModal from './DelModal';
import UpdateForm from './UpdateForm';
import Lottie from 'lottie-react';
import Circle from './Circle.json';
import Firebase from '../Firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ExpenseListView() {
const childRefDel = useRef();
  const childRefUpdate = useRef();
  const [list, setList] = useState([]);
  const [documentId, setDocumentId] = useState(null);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [pettyCashTotal, setPettyCashTotal] = useState(0);
  const [commonExpenseTotal, setCommonExpenseTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [open, setOpen] = useState(false);

  const successMessage = () => {
    toast.success('Updated SuccessFully!', {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };
  const deleteMessage = () => {
    toast.error('Successfully Deleted!', {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  const handleUpdate = (documentId, updatedExpense) => {
    successMessage();
    console.log(documentId);
    console.log(updatedExpense);
    Firebase.firestore()
      .collection('Expenses-Details')
      .doc(documentId)
      .update(updatedExpense)
      .then(() => {
        console.log('Document updated successfully');
      })
      .catch((error) => {
        console.error('Error updating document:', error);
      });
  };

  const handleDelete = (id) => {
    console.log('Deleting document with ID:', id); // Log the ID before deleting
    deleteMessage()
    Firebase.firestore()
      .collection('Expenses-Details')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  };

  useEffect(() => {
    const unsubscribe = Firebase.firestore().collection('Expenses-Details').onSnapshot((snapshot) => {
      const expenses = snapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data };
      });
      setList(expenses);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    let expenseSum = 0;
    let pettyCashSum = 0;
    let commonExpenseSum = 0;

    list.forEach((element) => {
      if (element.type === 'Office Expense') {
        expenseSum += parseFloat(element.amount);
      } else if (element.type === 'Petty Cash') {
        pettyCashSum += parseFloat(element.amount);
      }
      else if (element.type === 'Common Expense') {
        commonExpenseSum += parseFloat(element.amount);
      }
    });

    setExpenseTotal(expenseSum);
    setPettyCashTotal(pettyCashSum);
    setCommonExpenseTotal(commonExpenseSum)
  }, [list]);

  useEffect(() => {
    // Filter list based on the search term and filter type
    const filteredList = list.filter((element) =>
      Object.values(element).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    if (filterType) {
      const filteredListByType = filteredList.filter((element) => element.type === filterType);
      setFilteredList(filteredListByType);
    } else {
      setFilteredList(filteredList);
    }
  }, [searchTerm, list, filterType]);

  const handleFilter = (type) => {
    setFilterType(type);
  };
  const handleShowAll = () => {
    setFilterType('');
  };

  const subtractResult = pettyCashTotal - expenseTotal;

  const listData = filteredList.map((element) => (
    <tr key={element.id}>
      <td>{element.date}</td>
      <td>{element.account}</td>
      <td>{element.comments}</td>
      <td>{element.amount}</td>
      <td>{element.type}</td>
      <td>
        <button className="icon-btn1" onClick={() => childRefUpdate.current.openModalUpdate(element.id)}>
          <i className="fa fa-pencil" />
        </button>
        <button className="icon-btn" onClick={() => childRefDel.current.openModalDel(element.id)}>
          <i className="fa fa-trash" />
        </button>
      </td>
    </tr>
  ));

  return (
    <div>
      <Container  fluid='xxl'>
      <Row>
        <Col id='ELV-col-1'> 
        
        <Button
        className='my-2'
        variant="dark"
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        View Summary Details
      </Button>
      <div style={{ minHeight: '150px' }}>
        <Collapse in={open} dimension="width">
          <div id="example-collapse-text">
            <Card body style={{ width: '300px' }}>
            {filteredList.length > 0 && (
        <div>
          
          <h6><FontAwesomeIcon icon="fa-brands fa-stack-exchange"  style={{color:'#c71a10'}} /> Office Expenses: Rs {expenseTotal}</h6>
          <h6><FontAwesomeIcon icon="fa-solid fa-wallet" style={{color:'#0eb30d'}} /> Petty Cash: Rs {pettyCashTotal}</h6>
          <h6><FontAwesomeIcon icon="fa-solid fa-square-poll-vertical"  style={{color:'rgb(14 53 207)'}} /> Total Amount: Rs {subtractResult}</h6>

          <h6><FontAwesomeIcon icon="fa-brands fa-nfc-symbol" style={{color:'rgb(10 164 181)'}}  /> Total Common Expense: Rs {commonExpenseTotal}</h6>
          
        </div>
      )}
            </Card>
          </div>
        </Collapse>
      </div>
       </Col>
        <Col xs={9}>
        <div>
      <ToastContainer />
      <div id='searchDiv'>
        <div>

        
      <InputGroup size="md" style={{width:'181%'}}>
        <InputGroup.Text id="inputGroup-sizing-md"><i class="fa-solid fa-magnifying-glass fa-bounce"></i></InputGroup.Text>
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-md"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>
      </div>
     
        <div id='searchBtn'>
        <Button variant="dark" className='mx-2' onClick={() => handleFilter('Office Expense')}>Expense</Button>
        <Button variant="dark" className='mx-2' onClick={() => handleFilter('Petty Cash')}>Petty Cash</Button>
        <Button variant="dark" className='mx-2' onClick={() => handleFilter('Common Expense')}>Common Expense</Button>
        <Button variant="dark" className='mx-2' onClick={handleShowAll}>All</Button>
        </div>
      </div>
      
      <table className="table">
        <thead className="thead-dark">
          <tr>  
            <th scope="col">Date</th>
            <th scope="col">Account</th>
            <th scope="col">Comments</th>
            <th scope="col">Amount</th>
            <th scope="col">Type</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody id="Table">{listData}</tbody>
      </table>
      
     
      
     
      <DelModal ref={childRefDel} handleDelete={handleDelete} setDocumentId={setDocumentId} />
      <UpdateForm ref={childRefUpdate} handleUpdate={handleUpdate} documentId={documentId} />

    
      </div>
        </Col>
        
      </Row>
      {filteredList.length === 0 && (
        <div id="emptyMessage">
          <h1 id="alert">
            There's Nothing to Show <i className="fa-solid fa-exclamation fa-bounce"></i>
          </h1>
          <Lottie id="alertPic" animationData={Circle} style={{ height: 300, width: 300 }} />
        </div>
      )}
    </Container>
      <div>
     
      </div>
      
  
    </div>
  );
}

export default ExpenseListView;
