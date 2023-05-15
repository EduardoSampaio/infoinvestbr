import { useEffect, useState } from "react";
import Header from "./Header";
import { Autocomplete, Button, TextField, useTheme } from "@mui/material";
import Head from "next/head";
import ForcarAutenticacao from "../shared/ForcarAutenticacao";
import SnackBarCustom from "../shared/SnackbarCustom";
import useNotification from "@/data/hooks/useNotification";
import { ACAO_TICKER } from "../shared/autocomplete";
import { FUNDOS_TICKER } from "../shared/autocomplete";
import { useRouter } from "next/router";
import Search from "../shared/Search";

export default function Layout(props: any) {
  const theme = useTheme();
  const dark = theme.palette.mode === "dark" ? "dark" : "";
  const { type,message,handleClose, showNotification } = useNotification();
  const [search, setSearch] = useState<'' | 'hidden'>('hidden');

  useEffect(() => {
    document.body.style.height = "100%";
    if (dark === "dark") {
      document.body.style.backgroundColor = "black";
    } else {
      document.body.style.backgroundColor = "#E5E7EB";
    }
  }, [dark]);

  useEffect(() => {
    const handleEsc = (event: any) => {
       if (event.keyCode === 27 && search == '') {
        setSearch('hidden')
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  function showSearch() {
    if(search === 'hidden') {
      setSearch('')
    }else{
      setSearch('hidden')
    }
  }

  return (
    <ForcarAutenticacao>
      <div className={`flex flex-col w-full min-w-full ${dark}`}>
        <div className={`${search}`}>
          <Search handleClose={showSearch}/>
        </div>
        <Head>
          <title>InfoInvest</title>
          <meta property="og:title" content="My page title" key="title" />
        </Head>
        <Header showSearch={showSearch}/>
        <div className="flex w-full">
          {showNotification ? (
            <SnackBarCustom
              severity={type}
              handleClose={() => handleClose?.()}
              openSnack={showNotification}
              variant="filled"
              vertical="top"
              horizontal="right"
              message={message}
            />
          ) : (
            false
          )}

          <div className="w-full">{props.children}</div>
        </div>
      </div>
    </ForcarAutenticacao>
  );
}
