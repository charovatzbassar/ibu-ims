import { ConfirmModal } from "@/components";
import { InternshipReport } from "@/services/types";
import { Button, Card, Divider, TextField, Typography } from "@mui/material";
import { UseMutateFunction } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";

type Props = {
  report: InternshipReport;
  modifyReportStatus: UseMutateFunction<
    any,
    Error,
    {
      reportID: string;
      status: string;
      grade: number;
    },
    unknown
  >;
};

const FinalReport = (props: Props) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ finalGrade: number }>();

  const getGrade = (data: { finalGrade?: number }) => {
    props.modifyReportStatus({
      reportID: props.report.reportID,
      status: "APPROVED",
      grade: Number(data.finalGrade),
    });
  };

  return (
    <Card sx={{ marginY: "10px" }}>
      <Typography sx={{ padding: "10px", fontSize: 20 }}>
        Final Report
      </Typography>
      <Divider />
      {!props.report && (
        <Typography sx={{ margin: "10px" }}>
          There is no final report.
        </Typography>
      )}
      {props.report && (
        <>
          <Typography sx={{ margin: "10px" }}>
            {props.report?.finalReport}
          </Typography>
          <Divider />
          <Button
            onClick={() => setOpen(true)}
            color="success"
            variant="contained"
            sx={{ margin: "10px" }}
          >
            Approve Internship
          </Button>

          <ConfirmModal
            onClick={() => {
              setOpen(false);
              handleSubmit(getGrade)();
            }}
            modalOpen={open}
            closeModal={() => setOpen(false)}
            buttonColor="success"
          >
            <Typography sx={{ marginY: "10px" }}>
              Are you sure you want to approve this internship?
            </Typography>
            <Typography sx={{ marginY: "10px" }}>
              Please enter the final grade:
            </Typography>
            <form onSubmit={handleSubmit(getGrade)}>
              <TextField
                label="Number"
                type="number"
                InputProps={{
                  inputProps: { min: 5, max: 10 },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("finalGrade", {
                  required: "Please enter the final grade!",
                })}
                error={!!errors.finalGrade}
                helperText={errors.finalGrade && errors.finalGrade.message}
              />
            </form>
          </ConfirmModal>
        </>
      )}
    </Card>
  );
};

export default FinalReport;
