import { Alert } from "@mui/material";

type Props = {
  content: string;
};

const SuccessAlert = (props: Props) => {
  return (
    <div
      style={{
        textAlign: "left",
        display: "flex",
        flexDirection: "row-reverse",
      }}
    >
      <Alert severity="success" sx={{ position: "fixed" }}>
        {props.content}
      </Alert>{" "}
    </div>
  );
};

export default SuccessAlert;
