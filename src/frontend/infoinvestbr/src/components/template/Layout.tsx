import { useEffect } from "react";
import Header from "./Header";
import MenuLateral from "./MenuLateral";
import { useTheme } from "@mui/material";
import Head from "next/head";

export default function Layout(props: any) {
  const theme = useTheme();
  const dark = theme.palette.mode === "dark" ? "dark" : "";

  useEffect(() => {
    document.body.style.height = "100%";
    if (dark === "dark") {
      document.body.style.backgroundColor = "black";
    } else {
      document.body.style.backgroundColor = "#E5E7EB";
    }
  }, [dark]);

  return (
    <div className={`flex flex-col w-full min-w-full ${dark}`}>
      <Head>
        <title>InfoInvest</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <Header />
      <div className="flex w-full">
        <MenuLateral />
        <div className="w-full">{props.children}</div>
      </div>
    </div>
  );
}
