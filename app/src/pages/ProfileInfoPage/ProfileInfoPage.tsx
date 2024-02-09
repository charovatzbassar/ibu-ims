import { RootState } from "@/store";
import { Card, Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const ProfileInfoPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Card sx={{ padding: "20px" }}>
      <img src={user.photo || ""} alt="Profile Picture" />
      <Divider />
      <Typography variant="h6" sx={{ paddingY: "10px" }}>
        {user?.role === "company" ? "Company" : "Full"} Name:{" "}
        {`${user.firstName} ${user.lastName}`}
      </Typography>
      <Divider />
      <Typography variant="h6" sx={{ paddingY: "10px" }}>
        Email: {user.email}
      </Typography>
    </Card>
  );
};

export default ProfileInfoPage;
