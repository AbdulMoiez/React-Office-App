import React, { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import Circle from "./Circle.json";
import DelModal from './DelModal';
import EntryForm from './EntryForm';
import ExpenseListView from './expense-list-view';
import UpdateForm from "./UpdateForm";
import '../App.css';

function ModalForm1() {
  const childRefDel = useRef();
//   const childDelete = useRef();
  const childRefEntry = useRef();
  const childRefUpdate = useRef();
  const [transactions, setTransactions] = useState([]);
  const [isLocalStorageEmpty, setIsLocalStorageEmpty] = useState(true);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    const localStorageData = localStorage.getItem('expenseList');
    const parsedData = localStorageData ? JSON.parse(localStorageData) : [];
    setTransactions(parsedData);

    const isLocalStorageEmpty = parsedData.length === 0;
    setIsLocalStorageEmpty(isLocalStorageEmpty);

    calculateTotal(parsedData);
  }, []);

  const calculateTotal = (data) => {
    let expense = 0;
    let income = 0;

    data.forEach((transaction) => {
      if (transaction.type === 'Expense') {
        expense += parseFloat(transaction.amount);
      } else {
        income += parseFloat(transaction.amount);
      }
    });

    setTotalExpense(expense);
    setTotalIncome(income);
  };

  const deleteEntry = (id) => {
    childRefDel.current.openModalDel(id);
    // childDelete.current.Delete()
  };;

  const handleSave = (newExpense) => {
    const updatedData = [...transactions, newExpense];
    setTransactions(updatedData);
    localStorage.setItem('expenseList', JSON.stringify(updatedData));
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 2000);
    calculateTotal(updatedData);
  };

  const handleDelete = (id) => {
    const updatedData = transactions.filter((transaction) => transaction.id !== id);
    setTransactions(updatedData);
    localStorage.setItem('expenseList', JSON.stringify(updatedData));
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 2000);
    calculateTotal(updatedData);
  };

  const handleUpdate = (updatedExpense) => {
    const updatedData = transactions.map((transaction) => {
      if (transaction.id === updatedExpense.id) {
        return {
          ...transaction,
          date: updatedExpense.date,
          account: updatedExpense.account,
          comments: updatedExpense.comments,
          amount: updatedExpense.amount,
          type: updatedExpense.type,
        };
      }
      return transaction;
    });
    setTransactions(updatedData);
    localStorage.setItem('expenseList', JSON.stringify(updatedData));
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 2000);
    calculateTotal(updatedData);
  };

  useEffect(() => {
    setIsLocalStorageEmpty(transactions.length === 0);
  }, [transactions]);

  return (
    <>
      <div className="container mx-auto">
        <div id="header1">
          <div>
            <h1 id="main-h1">Office Expense Form</h1>
          </div>

          <div id="main-btn">
            <DelModal ref={childRefDel} handleDelete={handleDelete} />
            <EntryForm ref={childRefEntry} handleSave={handleSave} nextId={transactions.length + 1} />
          </div>
        </div>

        <ExpenseListView
          list={transactions}
          deleteEntry={deleteEntry}
          updateEntry={handleUpdate}
        />

        <UpdateForm ref={childRefUpdate} />

        {!isLocalStorageEmpty && (
  <div>
    <h6>Total Expense: {totalExpense}</h6>
    <h6>Total Petty Cash: {totalIncome}</h6>
  </div>
)}

        <div>
          {isLocalStorageEmpty && (
            <div id="emptyMessage">
              <h1 id="alert">
                There's Nothing to Show{' '}
                <i className="fa-solid fa-exclamation fa-bounce"></i>
              </h1>
              <Lottie
                id="alertPic"
                animationData={Circle}
                style={{ height: 300, width: 300 }}
              />
            </div>
          )}
        </div>

        {isToastVisible && (
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
}

export default ModalForm1;
