import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const baseURL = 'http://192.168.0.30:8080/test'; // Adjust this if your XAMPP setup uses a different hostname or port

  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${baseURL}/api.php`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const addItem = async () => {
    try {
      await axios.post(`${baseURL}/api.php`, { name: itemName });
      setItemName('');
      fetchItems();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const updateItem = async (id, newName) => {
    try {
      await axios.put(`${baseURL}/api.php`, { id, name: newName });
      fetchItems();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${baseURL}/api.php?id=${id}`);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="App">
      <div className='d-flex vh-100 vw-100 justify-content-center align-items-center'>
        <div className='shadow rounded p-3'>

          <h1>React PHP MySQL CRUD Example</h1>
        
            <div className='d-flex gap-2 w-100'>
              <input
                className='input-group-sm w-75'
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <button className="btn btn-primary" onClick={addItem}>Add Item</button>
            </div>

          <div className='mt-3'>
            <div className='shadow rounded bg-dark-subtle p-3 mb-3'>
              <p className='mb-0'>Remove Item from Database</p>
                {Array(items.length).fill().map((item, index)=>{
                  return <div className='d-flex gap-2 w-100 mt-2' key={items[index].id}>
                    <input
                      className='input-group-sm w-75'
                      type="text"
                      value={items[index].name}
                      onChange={(e) => updateItem(items[index].id, e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={() => deleteItem(items[index].id)}>Delete</button>
                  </div>
                  
                })}
                

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
