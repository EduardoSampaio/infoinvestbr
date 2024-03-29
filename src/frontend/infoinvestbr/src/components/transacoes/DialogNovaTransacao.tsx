import * as React from "react";
import Button from "../shared/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useRef, useState } from "react";
import { ITransacao } from "@/models/transacao.model";
import { Autocomplete, InputAdornment, MenuItem } from "@mui/material";
import { CORRETORAS, ACAO_TICKER, FUNDOS_TICKER } from "../shared/autocomplete";
import useAuth from "@/data/hooks/useAuth";
interface FormDialogProps {
  onSalvar: (transacao: ITransacao) => void;
  open: boolean;
  setOpenNewDialog: any;
}

export default function DialogNovaTransacao(props: FormDialogProps) {
  const [corretora, setCorretora] = useState<string | undefined>("");
  const [categoria, setCategoria] = useState<string | undefined>("");

  const [carregarAtivo, setCarregarAtivo] = useState<any[]>([]);
  const [codigo, setCodigo] = useState<any>("");
  const [ordem, setOrdem] = useState<string | undefined>("");
  const [total, setTotal] = useState<number>(0);

  const quantidade = useRef<HTMLInputElement>(null);
  const preco = useRef<HTMLInputElement>(null);
  const data = useRef<HTMLInputElement>(null);
  const corretagem = useRef<HTMLInputElement>(null);
  const outros = useRef<HTMLInputElement>(null);

  const {usuario} = useAuth()

  const handleClose = () => {
    props.setOpenNewDialog({ open: false, value: undefined });
    setCodigo("");
    setOrdem("");
    setTotal(0);
    setCorretora("");
    setCategoria("");
  };

  const changeCategoria = (value: string) => {
    setCodigo("");
    setCategoria(value);
    if (value == "1") {
      setCarregarAtivo(ACAO_TICKER);
    } else {
      setCarregarAtivo(FUNDOS_TICKER);
    }
  };

  const calcularTotal = () => {
    let novoTotal = 0;
    if (preco !== null && quantidade !== null) {
      const precoValor = Number(preco.current?.value);
      const qtd = Number(quantidade.current?.value);
      novoTotal = precoValor * qtd;
    }

    if (corretagem !== null && outros !== null) {
      const corretagemValor = Number(corretagem.current?.value);
      const outrosValor = Number(outros.current?.value);
      novoTotal += corretagemValor + outrosValor;
    }

    setTotal(novoTotal);
  };

  function renderTextFieldsCompra() {
    return (
      <div className="flex flex-col mt-5">
          <div className="flex w-full">
            <TextField
              id="ordem"
              label="Ordem"
              variant="outlined"
              className="ml-5 basis-full"
              select
              required
              value={ordem}
              onChange={(event) => setOrdem(event.target.value)}
            >
              <MenuItem key={1} value={"1"}>
                Compra
              </MenuItem>
              <MenuItem key={2} value={"2"}>
                Venda
              </MenuItem>
            </TextField>
            <Autocomplete
              id="corretora"
              options={CORRETORAS}
              className="ml-5 basis-full"
              renderInput={(params) => (
                <TextField {...params} label="Corretoras" required />
              )}
              onChange={(event, value) => setCorretora(value?.label)}
              isOptionEqualToValue={(option, value) =>
                option.label === value?.label
              }
            />
          </div>
          <div className="flex w-full mt-5">
            <TextField
              id="categoria"
              label="Categoria"
              variant="outlined"
              className="basis-full"
              style={{marginRight:"20px"}}
              select
              required
              value={categoria}
              onChange={(event) => changeCategoria(event.target.value)}
            >
              <MenuItem key={3} value={"1"}>
                Ação
              </MenuItem>
              <MenuItem key={4} value={"2"}>
                Fundo Imobiliários
              </MenuItem>
            </TextField>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Data Operação"
                className="basis-full"
                format="DD/MM/YYYY"
                inputRef={data}
              />
            </LocalizationProvider>
          </div>
          <div className="flex w-full mt-5">
            <Autocomplete
              id="ativo"
              options={carregarAtivo}
              className="basis-full"
              style={{marginRight:"20px"}}
              renderInput={(params) => (
                <TextField {...params} label="Ativos" value={codigo} required />
              )}
              onChange={(event, value) => setCodigo(value?.label)}
              isOptionEqualToValue={(option, value) => {
                return true;
              }}
            />
            <TextField
              id="preco"
              label="Preço"
              variant="outlined"
              className="ml-5 basis-full"
              style={{marginRight:"20px"}}
              required
              type="number"
              inputRef={preco}
              onChange={() => calcularTotal()}
              inputProps={{
                startadornment: <InputAdornment position="start">R$</InputAdornment>
   
              }}
            />
            <TextField
              id="quantidade"
              label="Quantidade"
              variant="outlined"
              type="number"
              className="basis-full"
              required
              InputLabelProps={{
                shrink: true,
              }}
              inputRef={quantidade}
              onChange={() => calcularTotal()}
            />
          </div>
          <div className="flex w-full mt-5">
            <TextField
              id="corretagem"
              label="Corretagem"
              variant="outlined"
              type="number"
              className="ml-5 basis-full"
              style={{marginRight:"20px"}}
              InputLabelProps={{
                shrink: true,
              }}
              inputRef={corretagem}
              onChange={() => calcularTotal()}
            />
            <TextField
              id="outros"
              label="Outros Custos"
              variant="outlined"
              type="number"
              className="ml-5 basis-full"
              InputLabelProps={{
                shrink: true,
              }}
              inputRef={outros}
              onChange={() => calcularTotal()}
            />
          </div>
          <div className=" w-full h-10 mt-5">
            <span className="font-bold">
              Total R$
              {total.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}
            </span>
          </div>
      </div>
    );
  }

  const submit = () => {
    const transacao: ITransacao = {
      codigo_ativo: codigo,
      quantidade: Number(quantidade.current?.value),
      data: data.current?.value,
      corretora: corretora,
      preco: Number(preco.current?.value),
      ordem: Number(ordem),
      categoria: Number(categoria),
      usuario_id: usuario?.id,
      corretagem: Number(corretagem.current?.value),
      outro: Number(outros.current?.value),
    };
    props.onSalvar(transacao);
    handleClose();
  };

  return (
    <div className="flex w-full justify-end mr-10">
      <Button
        className="dark:text-white dark:bg-gray-700 bg-gray-500 hover:bg-gray-400"
        onClick={() => props.setOpenNewDialog({ open: true, value: undefined })}
      >
        Nova Transação
      </Button>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle className="font-bold">Nova Transação</DialogTitle>
        <DialogContent>
            {renderTextFieldsCompra()}
        </DialogContent>
        <DialogActions>
        <div className="w-full flex justify-center mb-10">
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
