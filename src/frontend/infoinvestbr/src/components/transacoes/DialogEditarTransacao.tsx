import * as React from "react";
import Button from '../shared/Button';
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
      <div className="mt-5">
        <div className="flex flex-nowrap mb-5">
          <TextField
            disabled
            id="ativo"
            label="Ativo"
            variant="outlined"
            className="basis-full"
            style={{marginRight:"10px"}}
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
            className="basis-full"
            value={props.transacao.categoria}
            contentEditable={false}
            aria-readonly={true}
            InputProps={{
              readOnly: true,
            }}
          />
          </div>
          <div className="flex flex-nowrap mb-5">
          <TextField
            disabled
            id="ordem"
            label="Ordem"
            variant="outlined"
            className="basis-full"
            style={{marginRight:"10px"}}
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
            className="basis-full"
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
        <div className="flex flex-nowrap">
          <TextField
            id="preco"
            label="Preço"
            variant="outlined"
            className="basis-full"
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
            className="basis-full"
            style={{marginLeft: "10px", marginRight:"10px"}}
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
              className="basis-full"
              defaultValue={dayjs(props.transacao.data)}
              format="DD/MM/YYYY"
              inputRef={data}
            />
          </LocalizationProvider>
        </div>
      </div>
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
          <div className="flex flex-col h-[250px]">
            {renderTextFields()}
          </div>
        </DialogContent>
        <DialogActions className="flex w-full justify-center items-center mb-10">
          <div className="w-full flex justify-center">
            <Button
              onClick={handleClose}
              className="bg-gray-600 hover:bg-gray-800 text-white mr-10"
            >
              Cancelar
            </Button>
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
