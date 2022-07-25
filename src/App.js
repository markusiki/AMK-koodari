import React, { useState, useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton';
import AddBook from './AddBook';

import './App.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function App() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, [])
  
  const fetchBooks = () => {
    fetch('https://bookstore-296d5-default-rtdb.europe-west1.firebasedatabase.app/books.json')
    .then(response => response.json())
    .then(data => addKeys(data))
    .catch(err => console.error(err))
  }

  const addKeys = (data) => {
    const keys = Object.keys(data);
    const valueKeys = Object.values(data).map((item, index) => 
    Object.defineProperty(item, 'id', {value: keys[index]}))
    setBooks(valueKeys);
  }

  const addBook = (newBook) => {
    fetch('https://bookstore-296d5-default-rtdb.europe-west1.firebasedatabase.app/books.json',
    {
    method: 'POST',
    body: JSON.stringify(newBook)
    })
    .then(response => fetchBooks())
    .catch(err => console.error(err))
  }

  const deleteBook = (id) => {
    fetch(`https://bookstore-296d5-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`,
    {
    method: 'DELETE',
    })
    .then(response => fetchBooks())
    .catch(err => console.error(err))
  }

  return(
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" noWrap>
            Bookstore
          </Typography>
        </Toolbar>
      </AppBar> 
      <AddBook addBook={addBook} />
      <div className="ag-theme-material" style={ { height: 400, width: 1100, margin: 'auto' } }>
        <AgGridReact rowData={books}>
          <AgGridColumn sortable={true} filter={true} field='author' />
          <AgGridColumn sortable={true} filter={true} field='isbn' />
          <AgGridColumn sortable={true} filter={true} field='price' />
          <AgGridColumn sortable={true} filter={true} field='title' />
          <AgGridColumn sortable={true} filter={true} field='year' />
          <AgGridColumn
            headerName=''
            field='id'
            width={90}
            cellRendererFramework={ params => 
              <IconButton onClick={() => deleteBook(params.value)} size="small" color="secondary">
                <DeleteIcon />
              </IconButton>
            }
          />
        </AgGridReact>
      </div>
    </div>
  );
}

export default App;
