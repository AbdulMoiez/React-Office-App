import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import DelModal from './DelModal';
import EntryForm from './EntryForm';
import ExpenseListView from './expense-list-view';
import UpdateForm from "./UpdateForm";
import '../App.css';

function ModalForm1() {
  const handleSave = (newExpense) => {
    console.log(newExpense);
  };
 return (
    <>
      <div className="container mx-auto">
        <div id="header1">
          <div>
            <h1 id="main-h1">Office Expense Form</h1>
          </div>

          <div id="main-btn">
            <DelModal/>
            <EntryForm handleSave={handleSave} />
          </div>
        </div>

        <ExpenseListView/>

        <UpdateForm/>

      </div>
    </>
  );
}

export default ModalForm1;
