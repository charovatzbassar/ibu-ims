import React from "react";
import "./Background.css";

type Props = {
  children: React.ReactNode;
};

const Background = (props: Props) => {
  return (
    <ul className="background">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      {props.children}
    </ul>
  );
};

export default Background;
