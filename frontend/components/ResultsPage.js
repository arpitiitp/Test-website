import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const ResultsPage = () => {
  const { testId } = useParams();
  const location = useLocation();
  const [test, setTest] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    // Fetch the test and user's answers to show wrong answers
    axios.get(`https://test-website-fov5.onrender.com/test/${testId}`)
      .then(response => {
        setTest(response.data);
      })
      .catch(error => {
        console.error("Error fetching test data:", error);
      });

    axios.get(`https://test-website-fov5.onrender.com/answer/${testId}`)  // Adjust this to fetch user's answers
      .then(response => {
        setUserAnswers(response.data.user_answers);
      })
      .catch(error => {
        console.error("Error fetching answers:", error);
      });
  }, [testId]);

  if (!test) return <div>Loading...</div>;

  return (
    <div>
      <h1>Test Results</h1>
      <p>Your score: {location.state?.score}</p>

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
        return null;
      })}
    </div>
  );
};

export default ResultsPage;
