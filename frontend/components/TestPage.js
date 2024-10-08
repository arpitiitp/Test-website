import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const TestPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const response = await axios.get(`https://test-website-fov5.onrender.com/test/${testId}`);
        setTest(response.data);
        setTimeLeft(response.data.time_limit * 60);  // Time in seconds
      } catch (error) {
        console.error("Error fetching test data:", error);
        setError("Failed to load test data. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchTestData();
  }, [testId]);

  useEffect(() => {
    let timerId;
    if (timeLeft === 0 && test) {
      handleSubmit();
    } else if (timeLeft > 0) {
      timerId = setInterval(() => setTimeLeft(prevTime => prevTime - 1), 1000);
    }
    return () => clearInterval(timerId); // Clear timer on cleanup
  }, [timeLeft, test]);

  const handleAnswerChange = (questionId, option) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: option
    }));
  };

  const handleSubmit = async () => {
    const userAnswers = Object.keys(answers).map(questionId => ({
      question_id: questionId,
      selected_option: answers[questionId]
    }));

    try {
      const response = await axios.post('https://test-website-fov5.onrender.com/answer/submit', {
        user_id: 'currentUserId',  // Replace with the actual user ID
        test_id: testId,
        user_answers: userAnswers
      });
      navigate(`/results/${testId}`, { state: { score: response.data.score } });
    } catch (error) {
      console.error("Error submitting answers:", error);
      setError("Failed to submit answers. Please try again later.");
    }
  };

  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div style={{ color: 'red' }}>{error}</div>; // Display error message
  if (!test) return <div>No test found.</div>; // Handle case where no test is found

  return (
    <div>
      <h1>{test.test_name}</h1>
      <p>Time left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</p>

      {test.questions.map(question => (
        <div key={question._id}>
          <h3>{question.question_text}</h3>
          {question.options.map(option => (
            <div key={option}>
              <input
                type="radio"
                name={question._id}
                value={option}
                onChange={() => handleAnswerChange(question._id, option)}
                checked={answers[question._id] === option}
              />
              {option}
            </div>
          ))}
        </div>
      ))}

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default TestPage;
