import {
  InternshipListing,
  InternshipListingFormValues,
} from "@/services/types";
import { Controller, useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  Box,
  Fade,
  Modal,
  Card,
  Backdrop,
} from "@mui/material";
import React, { useEffect } from "react";
import { FormAction } from "@/utils";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { modalStyle } from "@/utils";
import { ConfirmModal } from "..";

type Props = {
  onSubmit: (data: InternshipListingFormValues) => void;
  data?: InternshipListing;
  action: FormAction;
  isError: boolean;
  isPending: boolean;
};

const getFormType = (action: FormAction) => {
  switch (action) {
    case FormAction.CREATE:
      return "Create";
    case FormAction.UPDATE:
      return "Update";
  }
};

const InternshipListingForm = (props: Props) => {
  const { onSubmit, data, action } = props;
  const {
    handleSubmit,
    register,
    reset,
    control,
    trigger,
    formState: { errors, isValid },
  } = useForm<InternshipListingFormValues>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  useEffect(() => {
    if (data && action === FormAction.UPDATE) {
      reset({
        position: data.position,
        listingDescription: data.listingDescription,
        location: data.location,
        requirements: data.requirements,
        noOfPlaces: data.noOfPlaces,
      });
    }
  }, [data, reset, action]);

  return (
    <Card sx={{ padding: "20px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography sx={{ textAlign: "left", fontSize: 25, margin: "10px" }}>
          {getFormType(action)} Listing
        </Typography>
        <TextField
          type="text"
          sx={{ margin: "10px", display: "flex" }}
          label="Position"
          variant="outlined"
          {...register("position", { required: "Position is required!" })}
          error={!!errors.position}
          helperText={errors.position && errors.position.message}
        />
        <TextField
          type="text"
          label="Description"
          sx={{ margin: "10px", display: "flex" }}
          multiline
          rows={4}
          {...register("listingDescription", {
            required: "Description is required!",
          })}
          error={!!errors.listingDescription}
          helperText={
            errors.listingDescription && errors.listingDescription.message
          }
        />
        <TextField
          type="text"
          sx={{ margin: "10px", display: "flex" }}
          label="Location"
          variant="outlined"
          {...register("location", { required: "Location is required!" })}
          error={!!errors.location}
          helperText={errors.location && errors.location.message}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DemoContainer
            sx={{ margin: "10px", display: "grid" }}
            components={["DatePicker"]}
          >
            <Controller
              name="startDate"
              control={control}
              defaultValue={
                FormAction.UPDATE && data?.startDate
                  ? new Date(data.startDate)
                  : null
              }
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Start date"
                  onChange={(date) => field.onChange(date)}
                  value={field.value || null}
                />
              )}
            />
          </DemoContainer>
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DemoContainer
            sx={{ margin: "10px", display: "grid" }}
            components={["DatePicker"]}
          >
            <Controller
              name="endDate"
              control={control}
              defaultValue={
                FormAction.UPDATE && data?.endDate
                  ? new Date(data.endDate)
                  : null
              }
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="End date"
                  onChange={(date) => field.onChange(date)}
                  value={field.value || null}
                />
              )}
            />
          </DemoContainer>
        </LocalizationProvider>

        <TextField
          type="text"
          label="Requirements"
          sx={{ margin: "10px", display: "flex" }}
          multiline
          rows={4}
          {...register("requirements", {
            required: "Requirements are required!",
          })}
          error={!!errors.requirements}
          helperText={errors.requirements && errors.requirements.message}
        />
        <TextField
          label="Number of places"
          type="number"
          sx={{ margin: "10px", display: "flex" }}
          min={1}
          {...register("noOfPlaces", {
            required: "Number of places is required!",
          })}
          error={!!errors.noOfPlaces}
          helperText={errors.noOfPlaces && errors.noOfPlaces.message}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Button
          sx={{ margin: "10px", display: "flex" }}
          onClick={isValid ? () => setModalOpen(true) : () => trigger()}
          variant="contained"
          color="primary"
        >
          {getFormType(action) + " Listing"}
        </Button>

        <ConfirmModal
          onClick={(e) => {
            e.preventDefault();
            setModalOpen(false);
            handleSubmit(onSubmit)();
          }}
          modalOpen={modalOpen}
          closeModal={() => setModalOpen(false)}
          buttonColor="success"
        >
          <Typography variant="h6" component="h2">
            Are you sure you want to {getFormType(action).toLowerCase()} this
            listing?
          </Typography>
        </ConfirmModal>

      </form>
    </Card>
  );
};

export default InternshipListingForm;
