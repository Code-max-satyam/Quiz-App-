import React, { useRef, useState } from 'react';
import './Quiz.css';
import { data } from '../../assets/data';

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const question = data[index];

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);
  const optionsRef = [option1, option2, option3, option4];

  const checkAns = (e, chosenIndex) => {
    if (locked) return;

    if (question.answer === chosenIndex) {
      e.target.classList.add('correct');
      setScore(prev => prev + 1); 
    } else {
      e.target.classList.add('wrong');
      const correctEl = optionsRef[question.answer - 1]?.current;
      if (correctEl) correctEl.classList.add('correct');
    }
    setLocked(true);
  };

  const nextQuestion = () => {
    if (index + 1 < data.length) {
      // previous highlights hatao
      optionsRef.forEach(ref => {
        ref.current?.classList.remove('correct', 'wrong');
      });
      setIndex(prev => prev + 1);
      setLocked(false);
    } else {
      // last question ke baad result show karo
      setResult(true);
    }
  };

  const reset = () => {
    setIndex(0);
    setScore(0);
    setResult(false);
    setLocked(false);
    optionsRef.forEach(ref => {
      ref.current?.classList.remove('correct', 'wrong');
    });
  };

  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr />
      {!result ? (
        <>
          <h2>{index + 1}. {question.question}</h2>
          <ul>
            <li ref={option1} onClick={(e) => checkAns(e, 1)}>{question.options1}</li>
            <li ref={option2} onClick={(e) => checkAns(e, 2)}>{question.options2}</li>
            <li ref={option3} onClick={(e) => checkAns(e, 3)}>{question.options3}</li>
            <li ref={option4} onClick={(e) => checkAns(e, 4)}>{question.options4}</li>
          </ul>
          <button onClick={nextQuestion} disabled={!locked}>
            {index + 1 === data.length ? "Finish" : "Next"}
          </button>
          <div className="index">{index + 1} of {data.length} questions</div>
        </>
      ) : (
        <>
          <h2>Your score is {score} out of {data.length}</h2>
          <button onClick={reset}>Reset</button>
        </>
      )}
    </div>
  );
};

export default Quiz;





