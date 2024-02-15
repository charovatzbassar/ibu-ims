import React from "react";
import { Link } from "react-router-dom";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import {
  Info,
  BarChart,
  People,
  Logout,
  Assignment,
  Dashboard,
  Addchart,
  FormatListBulleted,
  AccessTime,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/auth";

interface NavigationItemsProps {
  role: string;
}

const getNavigationItems = (role: string) => {
  switch (role) {
    case "intern":
      return (
        <>
          <ListItemButton>
            <ListItemIcon>
              <BarChart />
            </ListItemIcon>
            <ListItemText primary="My Internship" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <AccessTime />
            </ListItemIcon>
            <ListItemText primary="My Applications" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Assignment />
            </ListItemIcon>
            <ListItemText primary="Internship Days" />
          </ListItemButton>
        </>
      );
    case "manager":
      return (
        <>
          <Link
            to="/home/my-internships"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItemButton>
              <ListItemIcon>
                <BarChart />
              </ListItemIcon>
              <ListItemText primary="My Internships" />
            </ListItemButton>
          </Link>
          <ListItemButton>
            <ListItemIcon>
              <Assignment />
            </ListItemIcon>
            <ListItemText primary="My Students" />
          </ListItemButton>
        </>
      );
    case "company":
      return (
        <>
          <Link
            to="/home/my-internships"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItemButton>
              <ListItemIcon>
                <BarChart />
              </ListItemIcon>
              <ListItemText primary="My Internships" />
            </ListItemButton>
          </Link>
          <Link
            to="/home/my-listings"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItemButton>
              <ListItemIcon>
                <FormatListBulleted />
              </ListItemIcon>
              <ListItemText primary="My Listings" />
            </ListItemButton>
          </Link>
          <Link
            to="/home/create-listing"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItemButton>
              <ListItemIcon>
                <Addchart />
              </ListItemIcon>
              <ListItemText primary="Create Listing" />
            </ListItemButton>
          </Link>
        </>
      );
  }
};

const NavigationItems: React.FC<NavigationItemsProps> = (props) => {
  const dispatch = useDispatch();

  return (
    <>
      <Link
        to="/home/dashboard"
        style={{ textDecoration: "none", color: "black" }}
      >
        <ListItemButton>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>
      <Link
        to="/home/internship-listings"
        style={{ textDecoration: "none", color: "black" }}
      >
        <ListItemButton>
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <ListItemText primary="Internship Listings" />
        </ListItemButton>
      </Link>
      {getNavigationItems(props.role)}
      <Link
        to="/home/profile-info"
        style={{ textDecoration: "none", color: "black" }}
      >
        <ListItemButton>
          <ListItemIcon>
            <Info />
          </ListItemIcon>
          <ListItemText primary="Profile Info" />
        </ListItemButton>
      </Link>
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
