import { Alert } from "@mui/material";

const ErrorAlert = () => {
  return (
    <div
      style={{
        textAlign: "left",
        display: "flex",
        flexDirection: "row-reverse",
      }}
    >
      <Alert severity="error" sx={{ position: "fixed" }}>
        An error occured.
      </Alert>{" "}
    </div>
  );
};

export default ErrorAlert;
