import React from "react";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();

  return (
    <>
      <button onClick={() => history.push("/assessment")}>Login</button>
    </>
  );
}

export default Login;
