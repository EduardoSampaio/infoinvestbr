import { HiOutlineChartBar } from "react-icons/hi";
import Card from "./Card";
import { Perfil } from "./Perfil"; 
import MenuLateralItem from "./MenuLateralItem";

interface MenuLateralProps {
  className?: string;
}

export default function MenuLateral(props: MenuLateralProps) {
  return (
      <Card className={`min-w-[180px] h-[280px]`} sizeText="text-lg">
        <Perfil />
        <ul className="flex flex-col ml-10 text-lg">
          <MenuLateralItem texto="Carteira" url="/carteira" />
          <MenuLateralItem texto="Patrimônio" url="/patrimonio" />
          <MenuLateralItem texto="Transações" url="/transacao" />
          {/* <MenuLateralItem texto="Proventos" url="/proventos" /> */}
        </ul>
      </Card>
      // {/* <Card className={`h-[100px] w-[150px] flex flex-col align-middle items-center`} sizeText="text-xs">
      //   <Link href="/auth/login">
      //     <Button variant="outlined">Login</Button>
      //   </Link>
      // </Card> */}
  );
}
