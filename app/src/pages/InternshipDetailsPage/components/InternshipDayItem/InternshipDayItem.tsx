import { InternshipDay } from "@/services/types";
import { Button, TableCell, TableRow } from "@mui/material";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

type Props = {
  data: InternshipDay;
  modifyStatus: UseMutateFunction<
    AxiosResponse<any, any>,
    Error,
    { dayID: string; status: string },
    unknown
  >;
};

const InternshipDayItem = (props: Props) => {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {new Date(props.data.workdayDate).toDateString()}
      </TableCell>
      <TableCell align="left">{props.data.dayDescription}</TableCell>
      <TableCell align="left">
        <Button
          variant="contained"
          color="success"
          sx={{ marginX: "10px" }}
          onClick={() => {
            props.modifyStatus({ dayID: props.data.dayID, status: "APPROVED" });
          }}
        >
          APPROVE
        </Button>
        <Button
          variant="contained"
          color="error"
          sx={{ marginX: "10px" }}
          onClick={() => {
            props.modifyStatus({ dayID: props.data.dayID, status: "APPROVED" });
          }}
        >
          REJECT
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default InternshipDayItem;
