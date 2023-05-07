import { useEffect } from "react";
import Header from "./Header";
import { useTheme } from "@mui/material";
import Head from "next/head";
import ForcarAutenticacao from "../shared/ForcarAutenticacao";
import SnackBarCustom from "../shared/SnackbarCustom";
import useNotification from "@/data/hooks/useNotification";

export default function Layout(props: any) {
  const theme = useTheme();
  const dark = theme.palette.mode === "dark" ? "dark" : "";
  const { type,message,handleClose, showNotification } = useNotification();

  

  useEffect(() => {
    document.body.style.height = "100%";
    if (dark === "dark") {
      document.body.style.backgroundColor = "black";
    } else {
      document.body.style.backgroundColor = "#E5E7EB";
    }
  }, [dark]);

  return (
    <ForcarAutenticacao>
      <div className={`flex flex-col w-full min-w-full ${dark}`}>
        <Head>
          <title>InfoInvest</title>
          <meta property="og:title" content="My page title" key="title" />
        </Head>
        <Header />
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
