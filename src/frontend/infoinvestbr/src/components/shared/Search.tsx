import { useRouter } from "next/router";
import { ACAO_TICKER, FUNDOS_TICKER } from "./autocomplete";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import useAuth from "@/data/hooks/useAuth";

export default function Search(props: any) {
  const router = useRouter();
  const ativos = [...ACAO_TICKER, ...FUNDOS_TICKER].sort();
  const {mudarStatusCarregando} = useAuth();

  function search(codigo: string) {
    mudarStatusCarregando?.(true)
    if (ACAO_TICKER.find((x) => x.label === codigo)) {
      props.handleClose();
      router.push(`/acoes/${codigo}/detalhes`);
    } else if (FUNDOS_TICKER.find((x) => x.label === codigo)) {
      props.handleClose();
      router.push(`/fundos-imobiliarios/${codigo}/detalhes`);     
    }
    setTimeout(() => {
        mudarStatusCarregando?.(false)
    }, 1000)
  }

  return (
    <>
      <div className="absolute z-10 w-full h-screen bg-gray-400 opacity-80"
        onClick={props.handleClose}
      ></div>
      <div className="absolute z-20 left-[32%] top-[10%] w-[650px] h-[150px] bg-white dark:bg-gray-600 rounded-xl">
        <div className="w-full h-full flex justify-center items-center">
          <Autocomplete
            id="ativo"
            options={ativos}
            className="w-full mx-10"
            renderInput={(params) => (
              <TextField {...params} label="Pesquisar por Ativos" />
            )}
            onChange={(event, value) => search(value?.label)}
          />
        </div>
      </div>
    </>
  );
}
