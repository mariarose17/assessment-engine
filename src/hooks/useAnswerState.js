import { useReducer } from "react";

const initialState = {
  answers: [],
};

function answerReducer(state, action) {
  switch (action.type) {
    case "update_answer_set":
      console.log(
        "🚀 ~ file: useAnswerState.js ~ line 20 ~ answerReducer ~ update_answer_set"
      );

      return {
        ...state,
        answers: action.value,
      };

    default:
      return {
        ...state,
      };
  }
}

export function useAnswerState() {
  const [answerState, setAnswerValues] = useReducer(
    answerReducer,
    initialState
  );

  return {
    ...answerState,
    setAnswerValues,
  };
}
