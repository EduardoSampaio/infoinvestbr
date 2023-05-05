import * as React from "react";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridEventListener,
  GridToolbar,
  GridToolbarQuickFilter,
  MuiEvent,
  ptBR,
} from "@mui/x-data-grid";
import Box from '@mui/material/Box';

interface GridCustomProp {
  rows: any;
  columns: GridColDef[];
  onRowClick?: GridEventListener<"rowClick">;
  onCellClick?: GridEventListener<"cellClick">;
  disableRowSelectionOnClick?: boolean | undefined;
  showToolBar?: boolean
  classNameGrid?: string
  className?: string
  id?: any
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
    <div className={`w-full p-10 ${props.className}`}>
      <DataGrid
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        initialState={initialState}
        pageSizeOptions={[5, 10, 25, 50]}
        onRowClick={props?.onRowClick}
        slots={props.showToolBar == true ? { toolbar: GridToolbar } : {}}
        sx={style}
        autoHeight
        onCellClick={props.onCellClick}
        {...props}
        className={props.classNameGrid}
        getRowId={(row) => props?.id ? row[props?.id] : row.id}
      />
    </div>
  );
}
