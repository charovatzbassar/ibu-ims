import { Alert } from "@mui/material";

type Props = {
  message?: string;
};

const ErrorAlert = (props: Props) => {
  return (
    <div
      style={{
        textAlign: "left",
        display: "flex",
        flexDirection: "row-reverse",
      }}
    >
      <Alert severity="error" sx={{ position: "fixed" }}>
        {props.message ? props.message : "An error occurred"}
      </Alert>{" "}
    </div>
  );
};

export default ErrorAlert;
