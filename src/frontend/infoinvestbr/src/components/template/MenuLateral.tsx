import { HiOutlineChartBar } from "react-icons/hi";
import Card from "./Card";
import { Perfil } from "./Perfil";
import { MdAccountBalanceWallet } from "react-icons/md";
import Link from "next/link";
import MenuLateralItem from "./MenuLateralItem";

interface MenuLateralProps {}

export default function MenuLateral(props: MenuLateralProps) {
  return (
    <aside className={`flex  h-2/3`}>
      <Card className={`h-2/3 w-[150px]`} sizeText="text-xs">
        <Perfil />
        <ul className="flex h-full flex-col items-center text-sm">
          <MenuLateralItem texto="Carteira" url="/carteira" />
          <MenuLateralItem texto="Patrimônio" url="/patrimonio" />
          <MenuLateralItem texto="Transações" url="/transacao" />
          <MenuLateralItem texto="Proventos" url="/proventos" />
          <MenuLateralItem texto="Configurações" url="/configuracoes" />
        </ul>
      </Card>
    </aside>
  );
}
