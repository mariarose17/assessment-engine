import React, { useEffect, useState } from "react";
import { Question } from "../../components";
import { useAnswerState } from "../../hooks/useAnswerState";
import { useHistory } from "react-router-dom";

function Questions({ setAnswerValues, answers, handleSubmitAll }) {
  const history = useHistory();
  const [questions, setQuestions] = useState([]);
  const [currentSelectedQuestion, setCurrentSelectedQuestion] = useState(
    undefined
  );
  const [currentSelectedIndex, setCurrentSelectedIndex] = useState(0);
  const [currentSelectedOptions, setCurrentSelectedOptions] = useState([]);

  // const answersState = useAnswerState();
  // const { setAnswerValues, answers } = answersState;

  const getData = () => {
    fetch("DummyQuestions.json", {
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
        setQuestions(data.questions);
        const answerSet = data.questions?.map((item) => ({
          id: item.id,
          options: [],
          isSkipped: false,
          isCompleted: false,
        }));
        setAnswerValues({
          type: "update_answer_set",
          value: answerSet,
        });
      });
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setCurrentSelectedQuestion(questions[currentSelectedIndex]);
    const answeredItem = answers?.find(
      (item) => item.id === questions[currentSelectedIndex].id
    );
    setCurrentSelectedOptions(answeredItem ? [...answeredItem.options] : []);
  }, [currentSelectedIndex, questions, answers]);

  const handleSubmit = () => {
    const answersList = [...answers];
    const index = answersList.findIndex(
      (item) => item.id === currentSelectedQuestion.id
    );
    answersList[index].options = currentSelectedOptions;
    answersList[index].isCompleted = true;
    answersList[index].isSkipped = false;

    setAnswerValues({
      type: "update_answer_set",
      value: [...answersList],
    });
  };

  const handleSkip = () => {
    const answersList = [...answers];
    const index = answersList.findIndex(
      (item) => item.id === currentSelectedQuestion.id
    );
    answersList[index].options = [];
    answersList[index].isSkipped = true;
    answersList[index].isCompleted = false;

    setAnswerValues({
      type: "update_answer_set",
      value: [...answersList],
    });
    currentSelectedIndex !== questions.length - 1 &&
      setCurrentSelectedIndex(currentSelectedIndex + 1);
  };

  const isSubmitDisabled = () => {
    return currentSelectedOptions.length === 0;
  };

  const isNextDisabled = () => {
    const currentItem =
      answers && answers.find((item) => item.id === currentSelectedQuestion.id);

    if (currentSelectedIndex === questions?.length - 1) {
      return !currentItem?.isCompleted && !currentItem?.isSkipped;
    } else return !currentItem?.isCompleted;
  };

  const handleChangeOption = (option) => {
    if (currentSelectedQuestion.category === "single") {
      setCurrentSelectedOptions([option]);
    } else {
      const list = [...currentSelectedOptions];
      const index = list.findIndex((item) => item.id === option.id);
      if (index !== -1) {
        list.splice(index, 1);
        setCurrentSelectedOptions([...list]);
      } else {
        setCurrentSelectedOptions([...currentSelectedOptions, option]);
      }
    }
  };

  const getQuestionButtonColor = (id) => {
    const answerItem = answers && answers.find((item) => item.id === id);

    if (answerItem?.isSkipped) {
      return "red";
    } else if (answerItem?.isCompleted) {
      return "green";
    } else if (currentSelectedQuestion && currentSelectedQuestion.id === id) {
      return "yellow";
    } else return "white";
  };

  const checkSkippedAndSubmit = () => {
    const skipped = [];
    answers.map((item, index) => {
      if (item.isSkipped) skipped.push(index + 1);
    });
    let msg = "";
    if (skipped.length) {
      msg = `You have skipped ${skipped.length} questions - ${skipped.join(
        ", "
      )}. Are you sure you want to submit ?`;
    } else msg = " Are you sure you want to submit ?";
    const confirm = window.confirm(msg);
    if (confirm) {
      console.log("submit all======================");
      // history.push("/result");
      handleSubmitAll();
    }
  };

  return (
    <div className="App">
      <>
        {questions &&
          questions.length &&
          questions.map((item, index) => (
            <button
              id={item.id}
              key={item.id}
              onClick={() => {
                if (
                  getQuestionButtonColor(item.id) !== "white" &&
                  getQuestionButtonColor(item.id) !== "yellow"
                ) {
                  setCurrentSelectedQuestion(item);
                  setCurrentSelectedIndex(index);
                }
              }}
              style={{
                backgroundColor: `${getQuestionButtonColor(item.id)}`,
                cursor:
                  getQuestionButtonColor(item.id) === "white" ||
                  getQuestionButtonColor(item.id) === "yellow"
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              {index + 1}
            </button>
          ))}
        {currentSelectedQuestion ? (
          <Question
            id={currentSelectedQuestion.id}
            description={currentSelectedQuestion.description}
            options={currentSelectedQuestion.options}
            category={currentSelectedQuestion.category}
            answers={answers}
            handleChangeOption={handleChangeOption}
            currentSelectedOptions={currentSelectedOptions}
            questionNumber={currentSelectedIndex + 1}
          />
        ) : (
          <p>Loading...</p>
        )}

        <button
          disabled={currentSelectedIndex === 0}
          onClick={() => setCurrentSelectedIndex(currentSelectedIndex - 1)}
        >
          Previous
        </button>
        <button onClick={() => handleSkip()}>Skip</button>
        <button onClick={() => handleSubmit()} disabled={isSubmitDisabled()}>
          Submit
        </button>
        <button
          onClick={() =>
            questions &&
            questions.length &&
            currentSelectedIndex === questions.length - 1
              ? checkSkippedAndSubmit()
              : setCurrentSelectedIndex(currentSelectedIndex + 1)
          }
          disabled={isNextDisabled()}
        >
          {currentSelectedIndex === questions.length - 1
            ? "Submit Assessment"
            : "Next"}
        </button>
      </>
    </div>
  );
}

export default Questions;
