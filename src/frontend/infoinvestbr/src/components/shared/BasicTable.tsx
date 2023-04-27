import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface BasicTableProps {
  rows: any[];
  columns: any[];
  description?: string;
  minWidth?: number
}

function renderCellHeader(values: any[]) {
  return values.map((value, index) => (
    <TableCell key={index} align="center">
      {value}
    </TableCell>
  ));
}

function renderCellRow(props: BasicTableProps) {
  return props.rows.map((row, index) => {
    const value: any = [];
    props.columns.forEach((column, indexc) => {
      value.push(<TableCell key={indexc} align="center">{row[column]}</TableCell>);
    });
    return <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>{value}</TableRow>;
  });
}

export default function BasicTable(props: BasicTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: props?.minWidth ? props.minWidth : 650}} aria-label={props?.description}>
        <TableHead>
          <TableRow>{renderCellHeader(props.columns)}</TableRow>
        </TableHead>
        <TableBody>{renderCellRow(props)}</TableBody>
      </Table>
    </TableContainer>
  );
}
