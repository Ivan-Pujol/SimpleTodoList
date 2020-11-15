import React, { useState, useEffect } from 'react';
import ActionsTable from './Components/actionsTable';
import FormComponent from './Components/form';
import EditFormComponent from './Components/EditForm';
import axios from 'axios';



let promiseData = [];
let lastFilter = null;
let resetFilter = '';

function sortActions(currentActions) {
  return currentActions.sort((a, b) =>
    b.created.localeCompare(a.created)
  );
}

export default function App() {
  const [currentActions, setCurrentActions] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editionId, setEditionId] = useState(null);

  useEffect(() => {
    if (editionId !== null && editionId !== undefined) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
    const URL = `https://gdm-todolist.herokuapp.com/api/all`;
    //const URL = `http://localhost:3001/api/all`;
    const fetchData = async () => {
      const data = await fetch(URL);
      promiseData = await data.json();

      if (currentFilter === '' || currentFilter === null || currentFilter === undefined) {
        sortActions(promiseData);
        setCurrentActions(promiseData);
        resetFilter = "true";
      } else {
        sortActions(promiseData);
        setCurrentActions(promiseData.filter((filter) => filter.done.toString() === currentFilter));
        resetFilter = null;
      }
    };
    fetchData();
  }, [currentFilter, editionId]);


  const handleClickRadio = (event) => {
    setCurrentFilter(event)
  }

  const handleKeyDown = async (event) => {
    //console.log(event);
    if (event !== null || event !== '' || event !== undefined) {
      // const response = await fetch(`http://localhost:3001/api/include`, {
      //   method: 'POST', event)
      // });
      axios.post(`https://gdm-todolist.herokuapp.com/api/include`, event).then(res => {
        if (res.statusText === "Created") {
          lastFilter = currentFilter;
          setCurrentFilter(resetFilter);
          setCurrentFilter(lastFilter);
        }
      });
    }
  }
  const handleDeleteAction = async (event) => {
    axios.delete(`https://gdm-todolist.herokuapp.com/api/delete/${event}`).then(res => {
      if (res.statusText === "OK") {
        lastFilter = currentFilter;
        setCurrentFilter(resetFilter);
        setCurrentFilter(lastFilter);
      }
    });
    // const deleteData = await fetch(`http://localhost:3001/api/delete/${event}`, { method: 'DELETE' });
    // console.log(deleteData);

  }
  const handleEditingClick = (id) => {
    setEditionId(id);
  }
  const handleUpdate = (body) => {
    if (body !== null || body !== undefined) {
      editAction(body);
    }
  }
  function editAction(body) {
    if (body !== null || body !== undefined) {
      axios.put(`https://gdm-todolist.herokuapp.com/api/update`, body).then(res => {
        if (res.statusText == "OK") {
          lastFilter = currentFilter;
          setCurrentFilter(resetFilter);
          setCurrentFilter(lastFilter);
        }
      });
    }
  }

  return (
    <div className='container' style={{ backgroundColor: '##d2d4cd', border: '2px solid grey', borderRadius: '5px', padding: '10px', marginTop: '15px' }}>
      <div style={{ border: '2px solid grey', borderRadius: '5px', padding: '10px' }}>
        <h1 style={{ textAlign: 'center' }}>GDM-Devs chalenge</h1>
      </div>
      {!isEditing && <div style={{ border: '2px solid grey', borderRadius: '5px', padding: '10px', marginTop: '10px' }}>
        <FormComponent onKeyDown={handleKeyDown} setFilter={handleClickRadio} radioCheck={lastFilter} />
      </div>}
      {!isEditing && <div style={{ border: '10px', marginTop: '10px' }}>
        <ActionsTable allActions={currentActions} deleteId={handleDeleteAction} editClick={handleEditingClick} />
      </div>}
      {isEditing && <div style={{ border: '2px solid grey', borderRadius: '5px', padding: '10px', marginTop: '10px' }}>
        <EditFormComponent onKeyDown={handleKeyDown} setFilter={handleClickRadio} updating={handleUpdate} editClick={handleEditingClick} idEditing={editionId} />
      </div>}
    </div>
  );

};
