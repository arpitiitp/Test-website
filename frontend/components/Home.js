import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [tests, setTests] = useState([]);
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    // Update the endpoint to the correct path
    axios.get('https://test-website-fov5.onrender.com/tests')
      .then(response => {
        setTests(response.data); // Assuming the response.data contains the array of tests
      })
      .catch(error => {
        console.error("There was an error fetching the tests!", error);
        setError("Failed to fetch tests. Please try again later."); // Set error message
      });
  }, []);

  return (
    <div>
      <h1>Available Tests</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      <ul>
        {tests.length > 0 ? (
          tests.map(test => (
            <li key={test._id}>
              <Link to={`/test/${test._id}`}>{test.test_name}</Link>
            </li>
          ))
        ) : (
          <li>No tests available at this time.</li> // Message when no tests are found
        )}
      </ul>
    </div>
  );
};

export default Home;
