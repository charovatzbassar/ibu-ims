import React from "react";
import GoogleButton from "react-google-button";
import { login } from "../auth/auth";

const SignInButton: React.FC = () => {
  return (
    <>
      <GoogleButton onClick={login} />
    </>
  );
};

export default SignInButton;
