import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridToolbar,
  GridToolbarQuickFilter,
  ptBR,
} from "@mui/x-data-grid";
import Box from '@mui/material/Box';

interface GridCustomProp {
  rows: any;
  columns: GridColDef[];
  handleEvent: GridEventListener<"rowClick">;
}

const style = {
  ".MuiDataGrid-cell:focus": {
    outline: "none",
  },
  // pointer cursor on ALL rows
  "& .MuiDataGrid-row:hover": {
    cursor: "pointer",
  },
};

const initialState = {
  pagination: {
    paginationModel: {
      pageSize: 5,
    },
  },
};

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter
        quickFilterParser={(searchInput: string) =>
          searchInput
            .split(',')
            .map((value) => value.trim())
            .filter((value) => value !== '')
        }
      />
    </Box>
  );
}


export default function GridCustom(props: GridCustomProp) {
  return (
    <div className="w-full p-10">
      <DataGrid
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        rows={props.rows}
        columns={props.columns}
        initialState={initialState}
        pageSizeOptions={[5, 10, 25, 50]}
        onRowClick={props.handleEvent}
        slots={{ toolbar: GridToolbar }}
        sx={style}
        autoHeight
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'white' : 'gray'
        }
      />
    </div>
  );
}
