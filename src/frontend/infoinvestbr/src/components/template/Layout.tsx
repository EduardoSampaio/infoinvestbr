import { useEffect } from "react";
import Header from "./Header";
import useAppData from "@/hooks/useAppData";
import MenuLateral from "./MenuLateral";

export default function Layout(props: any) {
  const { tema } = useAppData();

  useEffect(() => {
    document.body.style.height = "100%";
    if (tema === "dark") {
      document.body.style.backgroundColor = "black";
    } else {
      document.body.style.backgroundColor = "#E5E7EB";
    }
  }, [tema]);

  return (
    <div
      className={`flex flex-col w-full h-full ${tema}
      `}
    >
      <Header />
      <section className={`flex`}>
        <MenuLateral />
        {props.children}
      </section>
    </div>
  );
}
