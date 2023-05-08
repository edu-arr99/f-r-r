import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import bcrypt from 'bcryptjs'

function App() {

  const [data, setData] = useState({ data: [] });
  const [err, setErr] = useState('');
  const API_KEY = "12345";
  // Hashing
  const password = "abcd"
  const salt = bcrypt.genSaltSync(10) // BCRYPT is the algorithm <====


  const handleClick = async () => {
    try {
      const encrypted_api_key = bcrypt.hashSync(API_KEY, salt);
      console.log(encrypted_api_key)
      const response = await fetch('http://localhost:5002/external-api', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "Content-Type": 'application/json',
        },
        body: JSON.stringify({ "api_key": encrypted_api_key })
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log('result is: ', JSON.stringify(result, null, 4));

      setData(result);
    } catch (err) {
      setErr(err.message);
    }
  };

  return (
    <div className="App">
      <div>
        Call API
        <button class="Button" type="button" onClick={handleClick}>
          Click Me
        </button>
        <div>
          {data.result}
        </div>
      </div>
    </div>
  );
}

export default App;