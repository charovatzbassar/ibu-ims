import { InternshipListing } from "@/services/types";
import { useForm } from "react-hook-form";
import { TextField, Button, Switch } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useEffect } from "react";
import { FormAction } from "@/utils";

type Props = {
  onSubmit: (data: any) => void;
  data?: InternshipListing;
  action: FormAction;
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
    case FormAction.EDIT:
      buttonMessage = "Edit";
      break;
    default:
      buttonMessage = "";
      break;
  }

  useEffect(() => {
    if (action === FormAction.EDIT) {
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
      {" "}
      <TextField
        sx={{ margin: "10px" }}
        label={action === FormAction.CREATE ? "Position" : ""}
        variant="outlined"
        type="position"
        {...register("position", { required: "Position is required!" })}
        error={errors.position ? true : false}
        helperText={errors.position && errors.position.message}
      />
      <TextField
        label="Description"
        multiline
        rows={4}
        {...register("listingDescription", {
          required: "Description is required!",
        })}
        error={errors.listingDescription ? true : false}
        helperText={
          errors.listingDescription && errors.listingDescription.message
        }
      />
      <Button
        sx={{ margin: "10px" }}
        type="submit"
        variant="contained"
        color="primary"
      >
        {buttonMessage} Listing
      </Button>
    </form>
  );
};

export default InternshipListingForm;
