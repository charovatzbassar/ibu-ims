import { Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

type Props = {
  rows: any[];
  columns: GridColDef[];
  paginationModel?: { page: number; pageSize: number };
  getRowId?: (row: any) => string;
};

const DataTable = (props: Props) => {
  return (
    <Paper sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={props.rows}
        columns={props.columns}
        initialState={{
          pagination: { paginationModel: props.paginationModel },
        }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        getRowId={props.getRowId}
        disableColumnResize
        disableRowSelectionOnClick
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default DataTable;
