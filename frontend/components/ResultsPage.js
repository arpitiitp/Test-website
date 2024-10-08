import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const ResultsPage = () => {
  const { testId } = useParams();
  const location = useLocation();
  const [test, setTest] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the test data
        const testResponse = await axios.get(`https://test-website-fov5.onrender.com/test/${testId}`);
        setTest(testResponse.data);

        // Fetch the user's answers
        const answersResponse = await axios.get(`https://test-website-fov5.onrender.com/answer/${testId}`);
        setUserAnswers(answersResponse.data.user_answers);
      } catch (error) {
        console.error("Error fetching test or answer data:", error);
        setError("Failed to fetch data. Please try again later."); // Set error message
      } finally {
        setLoading(false); // Set loading to false after data fetch is complete
      }
    };

    fetchData();
  }, [testId]);

  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div style={{ color: 'red' }}>{error}</div>; // Display error message if there's an error
  if (!test) return <div>No test found.</div>; // Handle case where test data is not found

  return (
    <div>
      <h1>Test Results</h1>
      <p>Your score: {location.state?.score || 'N/A'}</p> {/* Display 'N/A' if score is not available */}

      <h2>Incorrect Answers:</h2>
      {test.questions.map(question => {
        const userAnswer = userAnswers.find(answer => answer.question_id === question._id);
        if (userAnswer && userAnswer.selected_option !== question.correct_answer) {
          return (
            <div key={question._id}>
              <h3>{question.question_text}</h3>
              <p>Your Answer: {userAnswer.selected_option}</p>
              <p>Correct Answer: {question.correct_answer}</p>
            </div>
          );
        }
        return null; // Skip if answer is correct or not found
      })}
    </div>
  );
};

export default ResultsPage;
