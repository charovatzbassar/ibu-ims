import { InternshipListing } from "@/services/types";
import { Controller, useForm } from "react-hook-form";
import { TextField, Button, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { FormAction } from "@/utils";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

type Props = {
  onSubmit: (data: any) => void;
  data?: InternshipListing;
  action: FormAction;
  isError: boolean;
  isPending: boolean;
};

const InternshipListingForm = (props: Props) => {
  const { onSubmit, data, action } = props;
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm();

  let buttonMessage = "";

  switch (action) {
    case FormAction.CREATE:
      buttonMessage = "Create";
      break;
    case FormAction.UPDATE:
      buttonMessage = "Update";
      break;
    default:
      buttonMessage = "";
      break;
  }

  useEffect(() => {
    if (data && action === FormAction.UPDATE) {
      reset({
        position: data?.position,
        listingDescription: data?.listingDescription,
        location: data?.location,
        startDate: data?.startDate,
        endDate: data?.endDate,
        requirements: data?.requirements,
        noOfPlaces: data?.noOfPlaces,
      });
    }
  }, [data, reset, action]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          sx={{ margin: "10px", display: "grid" }}
          components={["DatePicker"]}
        >
          <Controller
            name="startDate"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="Start date"
                onChange={(date) => field.onChange(date)}
              />
            )}
          />
        </DemoContainer>
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          sx={{ margin: "10px", display: "grid" }}
          components={["DatePicker"]}
        >
          <Controller
            name="endDate"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="End date"
                onChange={(date) => field.onChange(date)}
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
        type="submit"
        variant="contained"
        color="primary"
      >
        {!props.isPending ? (
          buttonMessage + " Listing"
        ) : (
          <CircularProgress size={24} />
        )}
      </Button>
    </form>
  );
};

export default InternshipListingForm;
