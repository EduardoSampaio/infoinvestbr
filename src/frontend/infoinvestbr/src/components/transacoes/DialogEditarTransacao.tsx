import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ITransacao } from "@/models/transacao.model";
import dayjs, { Dayjs } from "dayjs";
import { useRef } from "react";

interface FormDialogProps {
  transacao: ITransacao;
}

export default function FormDialog(props: FormDialogProps) {
  const [open, setOpen] = React.useState(false);
 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const salvar = () => {
    
  };
  

  return (
    <div>
      <IconButton aria-label="editar" onClick={handleClickOpen}>
        <CreateOutlinedIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar Transação</DialogTitle>
        <DialogContent>
          <div className="flex flex-col h-[400px]">
            <div>
              <TextField
                disabled
                id="ativo"
                label="Ativo"
                variant="outlined"
                className="m-5"
                defaultValue={props.transacao.codigo_ativo}
                contentEditable={false}
                aria-readonly={true}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                disabled
                id="categoria"
                label="Categoria"
                variant="outlined"
                className="m-5"
                value={props.transacao.categoria}
                contentEditable={false}
                aria-readonly={true}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                disabled
                id="ordem"
                label="Ordem"
                variant="outlined"
                className="m-5"
                value={props.transacao.ordem}
                contentEditable={false}
                aria-readonly={true}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="corretora"
                label="Corretora"
                variant="outlined"
                className="m-5"
                defaultValue={props.transacao.corretora}
                required
              />
            </div>
            <div>
              <TextField
                id="preco"
                label="Preço"
                variant="outlined"
                className="m-5"
                defaultValue={props.transacao.preco}
                required
              />
              <TextField
                id="quantidade"
                label="Quantidade"
                variant="outlined"
                type="number"
                className="m-5"
                defaultValue={props.transacao.quantidade}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker
                  label="Data Operação"
                  className="ml-5 mt-5 w-[40%]"
                  defaultValue={dayjs(props.transacao.data)}
                  format="DD/MM/YYYY"
                 
                />
              </LocalizationProvider>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={salvar}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
