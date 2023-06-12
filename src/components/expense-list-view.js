import React, { useRef } from 'react';
import DelModal from './DelModal';
import UpdateForm from './UpdateForm';

function ExpenseListView({ list, deleteEntry, updateEntry }) {
  const childRefDel = useRef();
  const childRefUpdate = useRef();

  const handleUpdate = (updatedExpense) => {
    updateEntry(updatedExpense);
  };

  const handleDelete = (id) => {
    deleteEntry(id);
  };

  const listData = list.map((element) => (
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
        <tbody id="Table">
          {listData}
        </tbody>
      </table>
      <DelModal ref={childRefDel} handleDelete={handleDelete} />
      <UpdateForm ref={childRefUpdate} handleUpdate={handleUpdate} />
    </div>
  );
}

export default ExpenseListView;
