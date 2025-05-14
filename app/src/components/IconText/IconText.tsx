import { Card, Typography } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  text: string;
  icon: JSX.Element;
  children?: ReactNode;
};

const IconText = (props: Props) => {
  return (
    <Card
      sx={{
        paddingX: "20px",
        paddingY: "10px",
        marginBottom: "20px",
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      {props.icon}
      <Typography sx={{ fontSize: 25, marginY: "10px" }}>
        {props.text}
      </Typography>
      {props.children}
    </Card>
  );
};

export default IconText;
