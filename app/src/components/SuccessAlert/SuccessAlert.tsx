import { Alert } from "@mui/material";
import React from "react";

type Props = {
  content: string;
};

const SuccessAlert = (props: Props) => {
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
        severity="success"
        sx={{ position: "fixed", display: !open ? "none" : null }}
        onClose={() => {
          setOpen(false);
        }}
      >
        {props.content}
      </Alert>{" "}
    </div>
  );
};

export default SuccessAlert;
