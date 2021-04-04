import React, { useState } from "react";
import { useAnswerState } from "../../hooks/useAnswerState";
import { Questions, Result } from "../../components";

function Assessment() {
  const answersState = useAnswerState();
  const [completed, setCompleted] = useState(false);

  return (
    <>
      {!completed && (
        <div style={{ marginBlock: "150px" }}>
          <Questions
            {...answersState}
            handleSubmitAll={() => setCompleted(true)}
          />
        </div>
      )}
      {completed && <Result {...answersState} />}
    </>
  );
}

export default Assessment;
