import { ConfirmModal } from "@/components";
import { Manager, ManagerFormValues } from "@/services/types";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  setFormModalOpen: () => void;
  onSubmit: (data: ManagerFormValues) => void;
  data?: Manager;
  isError: boolean;
  isPending: boolean;
};

const CompanyForm = (props: Props) => {
  const { onSubmit, data } = props;
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    trigger,
    formState: { errors, isValid },
  } = useForm<ManagerFormValues>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography
        sx={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: 2,
        }}
      >
        {getFormType(action)} Company
      </Typography>
      <TextField
        label="Company Name"
        variant="outlined"
        {...register("companyName", { required: "Position is required!" })}
        error={!!errors.companyName}
        helperText={errors.companyName && errors.companyName.message}
        sx={{ marginBottom: 2 }}
        fullWidth
      />
      <TextField
        label="Contact Email"
        {...register("contactEmail", { required: "Position is required!" })}
        error={!!errors.contactEmail}
        helperText={errors.contactEmail && errors.contactEmail.message}
        variant="outlined"
        sx={{ marginBottom: 2 }}
        fullWidth
      />
      <TextField
        label="Location"
        {...register("location", { required: "Position is required!" })}
        error={!!errors.location}
        helperText={errors.location && errors.location.message}
        variant="outlined"
        sx={{ marginBottom: 2 }}
        fullWidth
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <Button
          color="error"
          sx={{ marginTop: "10px" }}
          variant="contained"
          onClick={props.setFormModalOpen}
        >
          Dismiss
        </Button>
        <Button
          color="success"
          onClick={isValid ? () => setModalOpen(true) : () => trigger()}
          sx={{ marginTop: "10px" }}
          variant="contained"
        >
          Submit
        </Button>
      </Box>
      <ConfirmModal
        onClick={(e) => {
          e!.preventDefault();
          setModalOpen(false);
          handleSubmit(onSubmit)();
        }}
        modalOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
        buttonColor="success"
      >
        <Typography variant="h6" component="h2">
          Are you sure you want to {getFormType(action).toLowerCase()} this
          company?
        </Typography>
      </ConfirmModal>
    </form>
  );
};

export default CompanyForm;
