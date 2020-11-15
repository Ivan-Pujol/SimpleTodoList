import React, { useState, useEffect } from 'react';
import axios from 'axios'

let checkboxReal = null;

export default function EditFormComponent({ editClick, idEditing, updating }) {

  const [dateState, setDateState] = useState();
  const [actionState, setActionState] = useState();
  const [idState, setIdState] = useState();


  useEffect(() => {
    if (idEditing !== null && idEditing !== undefined) {
      axios.get(`http://localhost:3001/api/find/${idEditing}`).then(res => {
        if (res.statusText === "OK") {
          const { _id, action, done, created } = res.data;
          setIdState(_id);
          setActionState(action);
          checkboxReal = done;
          setDateState(created);
        }
      });
    }
  }, [])

  // const handleClickCheckbox = (event) => {
  //   console.log(event.target.checked);
  //   checkboxState === false ? setCheckboxState(true) : setCheckboxState(false);

  // }
  const handleOnClick = (event) => {
    checkboxReal = event.target.checked;
  }

  const handleChangeDate = (event) => {
    setDateState(event.target.value);
  }
  const handleCancelButton = () => {
    editClick();
  }
  const handleChangeInput = (event) => {
    setActionState(event.target.value);
  }

  const handleSaveButton = () => {
    editClick(null);
    updating({ _id: idState, action: actionState, done: checkboxReal, created: dateState });
  }
  return <div>
    <div className='row' style={{ padding: '10px', justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
      <h5 style={{ textAlign: 'center' }} ><strong>Editing todo action</strong></h5>
      <div className='col' style={{ width: '50%' }}>
        <input type="text" name="todoAction" id="todoInput" placeholder="Insert here your todo Action" defaultValue={actionState} onChange={handleChangeInput} />
      </div>
      <div className='col' style={{ width: '20%', marginTop: '15px' }}>
        <label>
          <input type="checkbox" class="filled-in" name='actionCheckbox' id='actionCheckbox' defaultChecked={checkboxReal} onClick={handleOnClick} />
          <span>Done</span>
        </label>
      </div>
      <div className='col' style={{ width: '30%' }}>
        <input type="date" name="pickDate" id="pickDate" defaultValue={dateState} onChange={handleChangeDate} />
      </div>
    </div>
    <div className='flex'>
      <button class="waves-effect waves-light btn" id='salvar' onClick={handleSaveButton} style={{ marginLeft: '25%' }}>Save</button>
      <button class="waves-effect waves-light btn" id='cancelar' onClick={handleCancelButton} style={{ marginLeft: '35%' }}>Cancel</button>
    </div>
  </div >
}
