import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAnswerState } from "../../hooks/useAnswerState";
import Questions from "../Questions";
import Result from "../Result";

function Assessment() {
  const history = useHistory();
  const answersState = useAnswerState();
  const { setAnswerValues, answers } = answersState;
  const [completed, setCompleted] = useState(false);

  return (
    <>
      {!completed && (
        <Questions
          {...answersState}
          handleSubmitAll={() => setCompleted(true)}
        />
      )}
      {completed && <Result {...answersState} />}
    </>
  );
}

export default Assessment;
