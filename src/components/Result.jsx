import React, { useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";

function Result({ setAnswerValues, answers }) {
  const [questionAnswer, setQuestionAnswer] = useState([]);
  const [assessmentSummary, setAssessmentSummary] = useState();

  const getData = () => {
    fetch("QuestionAnswer.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setQuestionAnswer(data.questionAnswers);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setAssessmentSummary(getAssessmentSummary());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionAnswer]);

  const getAssessmentSummary = () => {
    let correct = 0;
    let inCorrect = 0;
    let skipped = 0;
    let singleAttended = 0;
    let multipleAttended = 0;
    let singleCorrect = 0;
    let multipleCorrect = 0;

    answers.map((item) => {
      const answerKey = questionAnswer.find((obj) => obj.id === item.id);
      if (item.isSkipped) skipped = skipped + 1;
      else if (answerKey && answerKey.category === "single") {
        singleAttended = singleAttended + 1;
        if (item.options[0].id === answerKey.answers[0].id) {
          correct = correct + 1;
          singleCorrect = singleCorrect + 1;
        } else inCorrect = inCorrect + 1;
      } else if (answerKey && answerKey.category === "multiple") {
        multipleAttended = multipleAttended + 1;
        if (item.options.length !== answerKey.answers.length) {
          inCorrect = inCorrect + 1;
        } else {
          let optionStatus = item.options.map((answeredOption) =>
            answerKey.answers.findIndex((key) => key.id === answeredOption.id)
          );
          if (optionStatus.findIndex((opt) => opt === -1) !== -1) {
            inCorrect = inCorrect + 1;
          } else {
            correct = correct + 1;
            multipleCorrect = multipleCorrect + 1;
          }
        }
      }
      return null;
    });
    return {
      correct: correct,
      inCorrect: inCorrect,
      skipped: skipped,
      singleAttended: singleAttended,
      multipleAttended: multipleAttended,
      singleCorrect: singleCorrect,
      multipleCorrect: multipleCorrect,
      singleInCorrect: singleAttended - singleCorrect,
      multipleIncorrect: multipleAttended - multipleCorrect,
    };
  };

  const defaultLabelStyle = {
    fontSize: "6px",
    fontFamily: "sans-serif",
  };

  const [pie, setPie] = useState();

  useEffect(() => {
    setPie("first");
  }, []);

  const renderPieHeading = (heading) => {
    return <h3 style={{ marginTop: "100px" }}>{heading}</h3>;
  };

  return (
    <>
      <h2>Assessment Summary</h2>
      <h3>Total Questions: {answers.length}</h3>
      <h3>Correct: {assessmentSummary?.correct}</h3>
      <h3>Incorrect: {assessmentSummary?.inCorrect}</h3>
      <h3>Skipped: {assessmentSummary?.skipped}</h3>
      {pie === "first" && (
        <>
          {renderPieHeading("Answered vs Skipped")}

          <PieChart
            data={[
              {
                title: "Skipped",
                value: assessmentSummary?.skipped || 0,
                color: "#E38627",
              },
              {
                title: "Answered",
                value: answers.length - assessmentSummary?.skipped || 0,
                color: "#37c14e",
              },
            ]}
            label={({ dataEntry }) =>
              dataEntry.value ? `${dataEntry.title} - ${dataEntry.value}` : ""
            }
            labelStyle={{
              ...defaultLabelStyle,
            }}
            style={{ height: "200px" }}
            onClick={(e, segmentIndex) => {
              if (segmentIndex === 1) setPie("second");
            }}
          />
        </>
      )}

      {pie === "second" && (
        <>
          {renderPieHeading("Single vs Multiple")}

          <PieChart
            data={[
              {
                title: "Multiple",
                value: assessmentSummary?.multipleAttended || 0,
                color: "#949af0",
              },
              {
                title: "Single",
                value: assessmentSummary?.singleAttended || 0,
                color: "#27e3e3",
              },
            ]}
            label={({ dataEntry }) =>
              dataEntry.value ? `${dataEntry.title} - ${dataEntry.value}` : ""
            }
            labelStyle={{
              ...defaultLabelStyle,
            }}
            style={{ height: "200px" }}
            onClick={(e, segmentIndex) => {
              if (segmentIndex === 0) setPie("third-multiple");
              if (segmentIndex === 1) setPie("third-single");
            }}
          />
          <button onClick={() => setPie("first")}>Back</button>
        </>
      )}

      {pie === "third-single" && (
        <>
          {renderPieHeading("Correct vs Incorrect - Single")}

          <PieChart
            data={[
              {
                title: "Incorrect",
                value: assessmentSummary?.singleInCorrect || 0,
                color: "#f06560",
              },
              {
                title: "Correct",
                value: assessmentSummary?.singleCorrect || 0,
                color: "#27e35f",
              },
            ]}
            label={({ dataEntry }) =>
              dataEntry.value ? `${dataEntry.title} - ${dataEntry.value}` : ""
            }
            labelStyle={{
              ...defaultLabelStyle,
            }}
            style={{ height: "200px" }}
          />
          <button onClick={() => setPie("second")}>Back</button>
        </>
      )}
      {pie === "third-multiple" && (
        <>
          {renderPieHeading("Correct vs Incorrect - Multiple")}

          <PieChart
            data={[
              {
                title: "Incorrect",
                value: assessmentSummary?.multipleIncorrect || 0,
                color: "#f06560",
              },
              {
                title: "Correct",
                value: assessmentSummary?.multipleCorrect || 0,
                color: "#27e35f",
              },
            ]}
            label={({ dataEntry }) =>
              dataEntry.value ? `${dataEntry.title} - ${dataEntry.value}` : ""
            }
            labelStyle={{
              ...defaultLabelStyle,
            }}
            style={{ height: "200px" }}
          />
          <button onClick={() => setPie("second")}>Back</button>
        </>
      )}

      {/* <button> Exit</button> */}
    </>
  );
}

export default Result;
