import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAnswerState } from "../../hooks/useAnswerState";

function Result({ setAnswerValues, answers }) {
  const history = useHistory();
  const answersState = useAnswerState();
  console.log(
    "🚀 ~ file: index.js ~ line 8 ~ Result ~ answersState",
    answersState
  );
  // const { answers } = answersState;
  const [questionAnswer, setQuestionAnswer] = useState([]);

  const getData = () => {
    fetch("QuestionAnswer.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        // console.log(response);
        return response.json();
      })
      .then(function (data) {
        // console.log(data);
        setQuestionAnswer(data.questionAnswers);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const getCount = (category) => {
    // switch (category) {
    //   case "correct":
    let correct = 0;
    let inCorrect = 0;
    let skipped = 0;

    console.log(
      "🚀 ~ file: index.js ~ line 39 ~ answers.map ~ answers",
      answers
    );

    answers.map((item) => {
      const answerKey = questionAnswer.find((obj) => obj.id === item.id);
      console.log(
        "🚀 ~ file: index.js ~ line 50 ~ answers.map ~ answerKey",
        answerKey
      );
      if (item.isSkipped) skipped = skipped + 1;
      else if (answerKey && answerKey.category === "single") {
        if (item.options[0].id === answerKey.answers[0].id)
          correct = correct + 1;
        else inCorrect = inCorrect + 1;
      } else if (answerKey && answerKey.category === "multiple") {
        if (item.options.length !== answerKey.answers.length) {
          inCorrect = inCorrect + 1;
        } else {
          let optionStatus = item.options.map((answeredOption) =>
            answerKey.answers.findIndex((key) => key.id === answeredOption.id)
          );
          if (optionStatus.findIndex((opt) => opt === -1) !== -1) {
            inCorrect = inCorrect + 1;
          } else correct = correct + 1;
        }
      }
    });
    return {
      correct: correct,
      inCorrect: inCorrect,
      skipped: skipped,
    };

    // default:
    //   return;
  };

  return (
    <>
      <h4>Assessment Summary</h4>
      <h5>Total Questions: {questionAnswer.length}</h5>
      <h5>Correct: {getCount().correct}</h5>
      <h5>Incorrect: {getCount().inCorrect}</h5>
      <h5>Skipped: {getCount().skipped}</h5>
    </>
  );
}

export default Result;
