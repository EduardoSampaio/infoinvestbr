import { HiOutlineChartBar } from "react-icons/hi";
import Card from "./Card";
import { Perfil } from "./Perfil"; 
import MenuLateralItem from "./MenuLateralItem";
import { Button } from "@mui/material";

interface MenuLateralProps {}

export default function MenuLateral(props: MenuLateralProps) {
  return (
      <Card className={`h-[250px] w-[180px]`} sizeText="text-xs">
        <Perfil />
        <ul className="flex h-full flex-col ml-10 text-sm">
          <MenuLateralItem texto="Carteira" url="/carteira" />
          <MenuLateralItem texto="Patrimônio" url="/patrimonio" />
          <MenuLateralItem texto="Transações" url="/transacao" />
          <MenuLateralItem texto="Proventos" url="/proventos" />
        </ul>
      </Card>
      // {/* <Card className={`h-[100px] w-[150px] flex flex-col align-middle items-center`} sizeText="text-xs">
      //   <Link href="/auth/login">
      //     <Button variant="outlined">Login</Button>
      //   </Link>
      // </Card> */}
  );
}
