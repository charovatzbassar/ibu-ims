import { Alert } from "@mui/material";
import React from "react";

type Props = {
  message?: string;
};

const ErrorAlert = (props: Props) => {
  const [open, setOpen] = React.useState(true);

  return (
    <div
      style={{
        textAlign: "left",
        display: "flex",
        flexDirection: "row-reverse",
      }}
    >
      <Alert
        severity="error"
        sx={{ position: "fixed", display: !open ? "none" : null }}
        onClose={() => {
          setOpen(false);
        }}
      >
        {props.message ? props.message : "An error occurred"}
      </Alert>{" "}
    </div>
  );
};

export default ErrorAlert;
