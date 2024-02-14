import { Application } from "@/services/types";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
} from "@mui/material";

type Props = {
  data: Application[];
  updateApplicationStatus: (status: string) => void;
};

const ApplicationTable = (props: Props) => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell align="left">Last Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((application) => (
            <TableRow
              key={application.applicationID}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {application.intern.firstName}
              </TableCell>
              <TableCell align="left">{application.intern.lastName}</TableCell>
              <TableCell align="left">{application.intern.email}</TableCell>
              <TableCell align="left">
                <Button
                  color="success"
                  variant="contained"
                  sx={{ margin: "5px" }}
                  onClick={() => props.updateApplicationStatus("APPROVED")}
                >
                  Approve
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  sx={{ margin: "5px" }}
                >
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ApplicationTable;
