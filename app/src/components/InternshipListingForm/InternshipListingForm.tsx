import { InternshipListing } from "@/services/types";
import { useForm } from "react-hook-form";
import { TextField, Button, Switch } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useEffect } from "react";
import { FormAction } from "@/utils";

type Props = {
  onSubmit: () => void;
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

  return <form onSubmit={handleSubmit(onSubmit)}>InternshipListingForm</form>;
};

export default InternshipListingForm;
