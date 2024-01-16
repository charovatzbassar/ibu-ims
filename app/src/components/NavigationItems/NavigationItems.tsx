import React from "react";
import { Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Logout } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/auth";

interface NavigationItemsProps {
  role: string;
}

const NavigationItems: React.FC<NavigationItemsProps> = (props) => {
  const dispatch = useDispatch();

  let items;

  if (props.role === "intern") {
    items = (
      <>
        <ListItemButton>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="My Internship" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Internship Days" />
        </ListItemButton>
      </>
    );
  } else if (props.role === "mentor") {
    items = (
      <>
        <ListItemButton>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="My Internships" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="My Students" />
        </ListItemButton>
      </>
    );
  } else if (props.role === "company") {
    items = (
      <>
        <ListItemButton>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="My Internships" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Company Info" />
        </ListItemButton>
      </>
    );
  }
  return (
    <>
      <Link
        to="/home/dashboard"
        style={{ textDecoration: "none", color: "black" }}
      >
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>
      <Link
        to="/home/internships"
        style={{ textDecoration: "none", color: "black" }}
      >
        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Internships" />
        </ListItemButton>
      </Link>
      {items}{" "}
      <ListItemButton onClick={() => dispatch(logout())}>
        <ListItemIcon>
          <Logout />
        </ListItemIcon>
        <ListItemText primary="Log Out" />
      </ListItemButton>
    </>
  );
};

export default NavigationItems;
