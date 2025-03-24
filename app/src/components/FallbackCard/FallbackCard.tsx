import { Card } from "@mui/material";

type Props = {
  content: string;
};

const FallbackCard = (props: Props) => {
  return <Card sx={{ marginY: "10px", padding: "20px" }}>{props.content}</Card>;
};

export default FallbackCard;
