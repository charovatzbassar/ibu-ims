import { GridColDef } from "@mui/x-data-grid";

function generateColumns<T>(row: T): GridColDef[] {
  return Object.keys(row || {}).map((key) => ({
    field: key,
    headerName: key
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, (match) => match.toUpperCase()),
    width: 260,
    sortable: true,
    filterable: true,

  }));
}

export default generateColumns;
