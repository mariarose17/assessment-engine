import React, { Fragment } from "react";

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
      <div
        style={{
          marginBlock: "50px",
          textAlign: "left",
          display: "inline-block",
        }}
      >
        {options &&
          options.length &&
          options.map((option) =>
            category === "single" ? (
              <Fragment key={option.id}>
                <span className="options"  key={option.id}>
                  <input
                    type="radio"
                    key={option.id}
                    id={option.id}
                    name={"options"}
                    value={option.id}
                    checked={isOptionChecked(option.id)}
                    onChange={() => handleChangeOption(option)}
                  />
                  <span
                    key={option.id + 100}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleChangeOption(option)}
                  >
                    {option.description}
                  </span>
                </span>
                <br />
              </Fragment>
            ) : (
              <Fragment key={option.id}>
                <span  className="options"  key={option.id}>
                  <input
                    type="checkbox"
                    key={option.id}
                    id={option.id}
                    name={option.description}
                    value={option.id}
                    checked={isOptionChecked(option.id)}
                    onChange={() => handleChangeOption(option)}
                  />
                  <span
                    key={option.id + 1000}
                    onClick={() => handleChangeOption(option)}
                    style={{ cursor: "pointer" }}
                  >
                    {option.description}
                  </span>
                </span>
                <br />
              </Fragment>
            )
          )}
      </div>
    </>
  );
}

export default Question;
