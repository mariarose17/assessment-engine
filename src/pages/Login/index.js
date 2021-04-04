import React from "react";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();

  return (
    <>
      <button
        onClick={() => history.push("/assessment")}
        style={{
          marginBlock: "335px",
          height: "50px",
          fontSize: "20px",
          backgroundColor: "lightblue",
        }}
      >
        Start Exam
      </button>
    </>
  );
}

export default Login;
