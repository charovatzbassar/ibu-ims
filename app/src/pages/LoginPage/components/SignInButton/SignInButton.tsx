import React from "react";
import GoogleButton from "react-google-button";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/auth";
import { AppDispatch } from "@/store";

const SignInButton: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <GoogleButton onClick={() => dispatch(login())} />
    </>
  );
};

export default SignInButton;
