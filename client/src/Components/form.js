import React, { useState } from 'react';
//import M from 'materialize-css';

function getDateNow() {
  let data = new Date();
  let today = (data.getFullYear() + '-' + (data.getMonth() + 1) + '-' + data.getDate());
  return today;
}

export default function FormComponent({ setFilter, onKeyDown, }) {
  const [checkboxState, setCheckboxState] = useState(false);
  const [dateState, setDateState] = useState(getDateNow());


  const handleClickRadio = (event) => {
    //console.log(event.target.id);
    setFilter(event.target.id);
  }
  const handleKeyDown = (event) => {
    if (window.event.keyCode === 13) {
      onKeyDown({ action: event.target.value, done: checkboxState, created: dateState });
      return event.target.value = '';
    }
  }
  const handleClickCheckbox = (event) => {
    checkboxState === false ? setCheckboxState(true) : setCheckboxState(false);
  }
  const handleChangeDate = (event) => {
    setDateState(event.target.value);
  }

  return <div className='container'>
    <div className='row' style={{ alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
      <h5 style={{ textAlign: "center" }}><strong>Filter todos panel</strong></h5>
      <div className="row" style={{ marginLeft: "10%" }}>
        <div className='col s4' >
          <label >
            <input className="with-gap" name="group1" type="radio" id='false' onClick={handleClickRadio} />
            <span>Undone Actions</span>
          </label>
        </div>
        <div className='col s4'>
          <label >
            <input className="with-gap" name="group1" type="radio" id='true' onClick={handleClickRadio} />
            <span>Done Actions</span>
          </label>
        </div>
        <div className='col s4'>
          <label >
            <input className="with-gap" name="group1" type="radio" id='' onClick={handleClickRadio} defaultChecked />
            <span>All Actions</span>
          </label>
        </div >
      </div>
    </div>
    <div className="divider"></div>
    <div className='row' style={{ padding: '10px', justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
      <h5 style={{ textAlign: 'center' }} ><strong>Insert todo action</strong></h5>
      <div className='col' style={{ width: '50%' }}>
        <input type="text" name="todoAction" id="todoInput" onKeyDown={handleKeyDown} placeholder="Insert here your todo Action" />
      </div>
      <div className='col' style={{ width: '20%', marginTop: '15px' }}>
        <label>
          <input type="checkbox" class="filled-in" name='actionCheckbox' id='.actionCheckbox' onChange={handleClickCheckbox} />
          <span>Done</span>
        </label>
      </div>
      <div className='col' style={{ width: '30%' }}>
        <input type="date" name="pickDate" id="pickDate" defaultValue={dateState} onChange={handleChangeDate} />
      </div>
    </div>
  </div >
}
