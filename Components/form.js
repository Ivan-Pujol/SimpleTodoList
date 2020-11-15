import React from 'react';

export default function FormComponent({ onKeyDown }) {
  const hanldleKeyDown = (event) => {
    if (window.event.keyCode === 13) {
      console.log(event.target.value);
    }
    //onKeyDown(event.target.value);
  }

  return <div className='container'>
    <div className='row' style={{ padding: '10px', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginLeft: '15%' }}>

      <div className='col s6'>
        <input type="text" name="todoAction" id=".todoAction" style={{ marginTop: '-15px' }} onKeyDown={hanldleKeyDown} />
      </div>
      <div className='col'>
        <label>
          <input type="checkbox" class="filled-in" />
          <span>Done</span>
        </label>
      </div>
      <div className='col'>
        <button className='waves-effect waves-light btn'>Delete</button>
      </div>

    </div>
  </div>;
}