import React from 'react';



let counter = 0;

export default function ActionsTable({ allActions, deleteId, editClick }) {
  if (allActions == '' || allActions == null || allActions == undefined) {
    return <div style={{ border: "2px solid grey", borderRadius: "5px", width: '100%' }}>
      <h5 style={{ textAlign: "center" }}>
        <strong>
          Is there no action to show <br />
          Check your connection
      </strong>
      </h5>
    </div>
  }

  const handleOnRemoveClick = (event) => {
    deleteId(event.target.id);
  }
  const handleOnEditClick = (event) => {
    editClick(event.target.id);
  }
  function getActionsTable() {

    return <div className='col s12'>
      <table className="striped" style={{ border: "2px solid", borderRadius: "5px", width: '100%' }}>
        <thead style={{ border: "2px solid", borderRadius: "5px" }} >
          <tr>
            <th>Number</th>
            <th>Action</th>
            <th>Edit</th>
            <th>Done</th>
            <th>Date</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {counter = 1, allActions.map((action) => {
            return (<tr style={{ border: "2px solid", borderRadius: "5px" }} key={action._id} >
              <td>{counter++}</td>
              <td>{action.action}</td>
              <td><span className="material-icons" id={action._id} style={{ cursor: 'pointer' }} onClick={handleOnEditClick}>{"edit"}</span></td>
              <td>{action.done.toString()}</td>
              <td>{action.created}</td>
              <td><span className="material-icons" id={action._id} style={{ cursor: 'pointer' }} onClick={handleOnRemoveClick}>{"delete"}</span></td>
            </tr>);
          })}
        </tbody>
        <tfoot>
        </tfoot>
      </table>
    </div>

  }
  return <div>{allActions && getActionsTable()}</div>
};