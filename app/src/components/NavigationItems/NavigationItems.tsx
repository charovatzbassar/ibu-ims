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
              <Assignment />
            </ListItemIcon>
            <ListItemText primary="Internship Days" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Info />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </ListItemButton>
        </>
      );
    case "manager":
      return (
        <>
          <ListItemButton>
            <ListItemIcon>
              <BarChart />
            </ListItemIcon>
            <ListItemText primary="My Internships" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Assignment />
            </ListItemIcon>
            <ListItemText primary="My Students" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Info />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </ListItemButton>
        </>
      );
    case "company":
      return (
        <>
          <ListItemButton>
            <ListItemIcon>
              <BarChart />
            </ListItemIcon>
            <ListItemText primary="My Internships" />
          </ListItemButton>
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
          <ListItemButton>
            <ListItemIcon>
              <Info />
            </ListItemIcon>
            <ListItemText primary="Company Info" />
          </ListItemButton>
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
