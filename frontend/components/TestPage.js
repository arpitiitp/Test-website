import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const TestPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:5000/test/${testId}`)
      .then(response => {
        setTest(response.data);
        setTimeLeft(response.data.time_limit * 60);  // Time in seconds
      })
      .catch(error => {
        console.error("Error fetching test data:", error);
      });
  }, [testId]);

  useEffect(() => {
    if (timeLeft === 0 && test) {
      handleSubmit();
    } else if (timeLeft > 0) {
      const timerId = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft, test]);

  const handleAnswerChange = (questionId, option) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: option
    }));
  };

  const handleSubmit = () => {
    const userAnswers = Object.keys(answers).map(questionId => ({
      question_id: questionId,
      selected_option: answers[questionId]
    }));

    axios.post('http://localhost:5000/answer/submit', {
      user_id: 'currentUserId',  // You need to pass current user id
      test_id: testId,
      user_answers: userAnswers
    })
    .then(response => {
      navigate(`/results/${testId}`, { state: { score: response.data.score } });
    })
    .catch(error => {
      console.error("Error submitting answers:", error);
    });
  };

  if (!test) return <div>Loading...</div>;

  return (
    <div>
      <h1>{test.test_name}</h1>
      <p>Time left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</p>

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
