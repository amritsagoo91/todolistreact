import React from 'react';
import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddTodo from './AddTodo';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


import './App.css'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

ModuleRegistry.registerModules([AllCommunityModule]);

const columnDefs = [
  { field: 'description', sortable: true, filter: true },
  { field: 'date', sortable: true, filter: true },
  { field: 'priority', sortable: true, filter: true },
  {
    headerName: '',
    field: 'id',
    width: 90,
    cellRenderer: (params) =>
      <IconButton
        onClick={() => deleteTodo(params.value)}
        size='small'
        color='error'
      >
        <DeleteIcon />
      </IconButton>
  }
];

const deleteTodo = (id) => {
  fetch(`https://todolist-5b7ba-default-rtdb.firebaseio.com/items/${id}.json`
    , {
      method: 'DELETE'
    })
    .then(response => fetchItems())
    .catch(err => console.log(err))

}

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    fetch('https://todolist-5b7ba-default-rtdb.firebaseio.com/items/.json')
      .then(response => response.json())
      .then(data => addKeys(data))
      .catch(err => console.error(err));
  };

  const addKeys = (data) => {
    const keys = Object.keys(data);

    const valueKeys = Object.values(data).map((item, index) =>
      Object.defineProperty(item, 'id', { value: keys[index] })

    );
    console.log(valueKeys)
    setTodos(valueKeys)
  }




  const addTodo = (newTodo) => {
    fetch('https://todolist-5b7ba-default-rtdb.firebaseio.com/items/.json',
      {
        method: 'POST',
        body: JSON.stringify(newTodo)
      })
      .then(response => fetchItems())
      .catch(err => console.log(err))


  }


  return (
    <>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">
            TodoList
          </Typography>
        </Toolbar>
      </AppBar>
      <AddTodo addTodo={addTodo} />
      <div className="ag-theme-material" style={{ height: 400, width: 700 }}>
        <AgGridReact
          rowData={todos}
          columnDefs={columnDefs}
        />
      </div>
    </>
  );
}

export default App;