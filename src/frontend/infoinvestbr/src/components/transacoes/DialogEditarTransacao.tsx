import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ITransacao } from "@/models/transacao.model";
import dayjs from "dayjs";
import { useRef } from "react";

interface FormDialogProps {
  transacao: ITransacao;
  onEditar: (transacao: ITransacao) => void;
}

export default function DialogEditarTransacao(props: FormDialogProps) {
  const [open, setOpen] = React.useState(false);
  const corretora = useRef<HTMLInputElement>(null);
  const quantidade = useRef<HTMLInputElement>(null);
  const preco = useRef<HTMLInputElement>(null);
  const data = useRef<HTMLInputElement>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function renderTextFields() {
    return (
      <>
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
            disabled
            id="corretora"
            label="Corretora"
            variant="outlined"
            className="m-5"
            defaultValue={props.transacao.corretora}
            required
            inputRef={corretora}
            contentEditable={false}
            aria-readonly={true}
            InputProps={{
              readOnly: true,
            }}
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
            type="number"
            inputRef={preco}
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
            inputRef={quantidade}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Data Operação"
              className="ml-5 mt-5 w-[40%]"
              defaultValue={dayjs(props.transacao.data)}
              format="DD/MM/YYYY"
              inputRef={data}
            />
          </LocalizationProvider>
        </div>
      </>
    );
  }

  const submit = () => {
    const transacao: ITransacao = {
      id: props.transacao.id,
      quantidade: Number(quantidade.current?.value),
      data: data.current?.value,
      corretora: corretora.current?.value,
      preco: Number(preco.current?.value),
    };

    props.onEditar(transacao);
    setOpen(false);
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
            {renderTextFields()}
          </div>
        </DialogContent>
        <DialogActions className="flex w-full justify-center mb-10">
          <div className="p-1">
            <Button
              onClick={handleClose}
              className="bg-gray-600 hover:bg-gray-800 text-white"
            >
              Cancelar
            </Button>
          </div>
          <div className="p-1">
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={submit}
            >
              Salvar
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
