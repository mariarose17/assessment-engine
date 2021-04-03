import React from "react";

function Question({
  id,
  description,
  options,
  category,
  answers,
  handleChangeOption,
  currentSelectedOptions,
  questionNumber,
}) {
  console.log("🚀 ~ file: Question.jsx ~ line 13 ~ answers", answers);
  const isOptionChecked = (optionId) => {
    const index =
      answers && answers.length && answers.findIndex((item) => item.id === id);

    if (index !== -1) {
      let selectedOptionIndex = -1;
      if (currentSelectedOptions.length) {
        selectedOptionIndex = currentSelectedOptions.findIndex(
          (option) => option.id === optionId
        );
      } else {
        selectedOptionIndex = answers[index].options?.findIndex(
          (option) => option.id === optionId
        );
      }

      return selectedOptionIndex !== undefined && selectedOptionIndex !== -1;
    } else return false;
  };
  return (
    <>
      <h3>
        {questionNumber}. {description}
      </h3>
      {options &&
        options.length &&
        options.map((option) =>
          category === "single" ? (
            <>
              <input
                type="radio"
                key={option.id}
                id={option.id}
                name={"options"}
                value={option.id}
                checked={isOptionChecked(option.id)}
                onChange={() => handleChangeOption(option)}
              />
              {option.description}
              <br />
            </>
          ) : (
            <>
              <input
                type="checkbox"
                key={option.id}
                id={option.id}
                name={option.description}
                value={option.id}
                checked={isOptionChecked(option.id)}
                onChange={() => handleChangeOption(option)}
              />
              {option.description}
              <br />
            </>
          )
        )}
    </>
  );
}

export default Question;
