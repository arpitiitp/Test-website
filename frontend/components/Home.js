import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/test')
      .then(response => {
        setTests(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the tests!", error);
      });
  }, []);

  return (
    <div>
      <h1>Available Tests</h1>
      <ul>
        {tests.map(test => (
          <li key={test._id}>
            <Link to={`/test/${test._id}`}>{test.test_name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
