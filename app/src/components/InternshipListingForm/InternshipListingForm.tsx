import { InternshipListing } from "@/services/types";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
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
        sx={{ margin: "10px" }}
        label="Position"
        variant="outlined"
        {...register("position", { required: "Position is required!" })}
        error={errors.position ? true : false}
        helperText={errors.position && errors.position.message}
      />
      <TextField
        type="text"
        label="Description"
        sx={{ margin: "10px" }}
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
      <TextField
        type="text"
        sx={{ margin: "10px" }}
        label="Location"
        variant="outlined"
        {...register("location", { required: "Location is required!" })}
        error={errors.location ? true : false}
        helperText={errors.location && errors.location.message}
      />
      <TextField
        type="text"
        label="Requirements"
        sx={{ margin: "10px" }}
        multiline
        rows={4}
        {...register("requirements", {
          required: "Requirements are required!",
        })}
        error={errors.requirements ? true : false}
        helperText={errors.requirements && errors.requirements.message}
      />
      <TextField
        label="Number of places"
        type="number"
        min={1}
        {...register("noOfPlaces", {
          required: "Number of places is required!",
        })}
        error={errors.noOfPlaces ? true : false}
        helperText={errors.noOfPlaces && errors.noOfPlaces.message}
        InputLabelProps={{
          shrink: true,
        }}
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
