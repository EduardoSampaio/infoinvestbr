import {
  HiSwitchVertical,
} from "react-icons/hi";
import MenuItem from "./MenuItem";
import { HiWallet, HiHome ,HiBuildingLibrary, HiBuildingOffice2, HiPresentationChartLine } from "react-icons/hi2";

export default function NavMenu() {
  return (
    <nav className="flex h-12 justify-center flex-grow">
      <ul className="flex">
        <MenuItem key={1} icon={HiHome} titulo="Início" url="/" />
        <MenuItem
          key={2}
          icon={HiBuildingLibrary}
          titulo="Ações"
          url="/acoes/listar"
        />
        <MenuItem
          icon={HiBuildingOffice2}
          titulo="Fundos Imobliários"
          url="/fundos-imobiliarios/listar"
          key={3}
        />
        <MenuItem
          icon={HiWallet}
          titulo="Carteira"
          url="/carteira"
          key={4}
        />
        <MenuItem
          icon={HiSwitchVertical}
          titulo="Transações"
          url="/transacao"
          key={5}
        />
      </ul>
    </nav>
  );
}
