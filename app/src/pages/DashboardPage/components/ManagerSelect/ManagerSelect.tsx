import { MenuItem, Select, Typography } from "@mui/material";
import React from "react";

type Props = {};

const ManagerSelect = (props: Props) => {
  return (
    <>
      <Typography
        sx={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: 2,
        }}
      >
        Change current manager
      </Typography>
      <Select
        value={selectedManager || ""}
        onChange={(e) => {
          const selectedManager = managers?.find(
            (manager) => manager.managerID === e.target.value
          );
          if (selectedManager) {
            setSelectedManager(selectedManager.managerID);
          }
        }}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        {managers?.map((manager) => (
          <MenuItem key={manager.managerID} value={manager.managerID}>
            {`${manager.firstName} ${manager.lastName}`}
          </MenuItem>
        ))}
      </Select>
      <Button
        color="success"
        onClick={() => setModalOpen(true)}
        sx={{ marginTop: "10px" }}
        variant="contained"
      >
        Submit
      </Button>
      <ConfirmModal
        onClick={(e) => {
          e!.preventDefault();
          setModalOpen(false);
        }}
        modalOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
        buttonColor="success"
      >
        <Typography variant="h6" component="h2">
          Are you sure you want to update the manager?
        </Typography>
      </ConfirmModal>
    </>
  );
};

export default ManagerSelect;
