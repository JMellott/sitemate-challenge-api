import React, { useState } from 'react';
import './App.css';

function App() {
  const [operation, setOperation] = useState('');
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      id,
      title,
      description
    };

    let response;
    switch (operation) {
      case 'create':
        response = await fetch('/api/issue', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        break;

      case 'update':
        response = await fetch(`/api/issue`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        break;

      case 'delete':
        response = await fetch(`/api/issue/${id}`, {
          method: 'DELETE'
        });
        break;

      case 'get':
        response = await fetch(`/api/issue/${id}`);
        break;

      default:
        setResult('Invalid operation');
        return;
    }

    const jsonData = await response.json();
    setResult(jsonData);
  };

  return (
    <div className="App">
      <h1>Operations</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Operation:
          <select value={operation} onChange={(e) => setOperation(e.target.value)}>
            <option value="">Select Operation</option>
            <option value="create">Create</option>
            <option value="update">Update</option>
            <option value="delete">Delete</option>
            <option value="get">Get</option>
          </select>
        </label>
        <br />
        <label >
          ID:
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        </label>
        <br />
        {operation === 'create' || operation === 'update' ? (
          <>
            <label>
              Title:
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <br />
            <label>
              Description:
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <br />
          </>
        ) : null }
        <button type="submit">Submit</button>
      </form>
      <div className="result">
        <h2>Result:</h2>
        <pre>Issue {result.id}: {result.title}</pre>
        <pre>{result.description}</pre>
      </div>
    </div>
  );
}

export default App;
