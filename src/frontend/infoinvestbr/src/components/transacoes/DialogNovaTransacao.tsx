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
import { HiOutlinePlus } from "react-icons/hi";

interface FormDialogProps {
  transacao: ITransacao;
  onSalvar: (transacao: ITransacao) => void;
}

export default function DialogNovaTransacao(props: FormDialogProps) {
  const [open, setOpen] = React.useState(false);
  const corretora = useRef<HTMLInputElement>(null);
  const quantidade = useRef<HTMLInputElement>(null);
  const preco = useRef<HTMLInputElement>(null);
  const data = useRef<HTMLInputElement>(null);
  const ordem = useRef<HTMLInputElement>(null);
  const codigo_ativo = useRef<HTMLInputElement>(null);
  const categoria = useRef<HTMLInputElement>(null);

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
            required
            inputRef={corretora}
          />
        </div>
        <div>
          <TextField
            id="preco"
            label="Preço"
            variant="outlined"
            className="m-5"
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
      codigo_ativo: codigo_ativo.current?.value,  
      quantidade: Number(quantidade.current?.value),
      data: data.current?.value,
      corretora: corretora.current?.value,
      preco: Number(preco.current?.value),
      ordem: Number(ordem.current?.value),
      categoria: Number(categoria.current?.value),
      usuario_id: "146dde84-bc5a-4e9a-bcd7-44f221b63cda"
    };

    props.onSalvar(transacao);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" className=" dark:text-white dark:bg-gray-700">
          <HiOutlinePlus className="text-lg mr-2"/>
          Nova Transação
     </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nova Transação</DialogTitle>
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
