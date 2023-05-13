import { HiSwitchVertical } from "react-icons/hi";
import MenuItem from "./MenuItem";
import {
  HiWallet,
  HiHome,
  HiBuildingLibrary,
  HiBuildingOffice2,
  HiPresentationChartLine,
} from "react-icons/hi2";
import MenuItemDropDown from "./MenuItemDropDown";
import MenuDropDownLink from "./MenuDropDownLink";

export default function NavMenu() {
  return (
    <nav className="flex h-12 justify-center flex-grow">
      <ul className="flex">
        <MenuItem key={1} icon={HiHome} titulo="Início" url="/" />
        <MenuItemDropDown
          key={2}
          icon={HiBuildingLibrary}
          titulo="Ações"
          url="/acoes/listar"
          activeUrlOpt="/acoes/[codigo]/detalhes"
        >
          <MenuDropDownLink titulo="Todos os setores" url="/acoes/listar" />
          <MenuDropDownLink titulo="Bens Industriais" url="/acoes/setor/Bens industriais" />
          <MenuDropDownLink titulo="Consumo Cíclico" url="/acoes/setor/Consumo Cíclico" />
          <MenuDropDownLink titulo="Consumo não Cíclico" url="/acoes/setor/Consumo não Cíclico" />
          <MenuDropDownLink titulo="Comunicações" url="/acoes/setor/Comunicações" />
          <MenuDropDownLink titulo="Financeiros" url="/acoes/setor/Financeiros" />
          <MenuDropDownLink titulo="Materiais Básicos" url="/acoes/setor/Materiais Básicos" />
          <MenuDropDownLink titulo="Petroleo, Gás, Biocombustíveis" url="/acoes/setor/Petroleo, Gás, Biocombustíveis" />
          <MenuDropDownLink titulo="Saúde" url="/acoes/setor/Saúde" />
          <MenuDropDownLink titulo="Tecnologia de informação" url="/acoes/setor/Tecnologia da Informação" />
          <MenuDropDownLink titulo="Utilidade Pública" url="/acoes/setor/Utilidade Pública" />
        </MenuItemDropDown>
        <MenuItemDropDown
          key={3}
          icon={HiBuildingLibrary}
          titulo="FIIS"
          url="/fundos-imobiliarios/listar"
          activeUrlOpt="/fundos-imobiliarios/[codigo]/detalhes"
        >
          <MenuDropDownLink
            titulo="Todos os segmentos"
            url="/fundos-imobiliarios/listar"
          />
          <MenuDropDownLink titulo="Híbrido" url="/fundos-imobiliarios/setor/Híbrido" />
          <MenuDropDownLink titulo="Hospital" url="/fundos-imobiliarios/setor/Hospital" />
          <MenuDropDownLink titulo="Hotel" url="/fundos-imobiliarios/setor/Hotel" />
          <MenuDropDownLink titulo="Lajes Corporativas" url="/fundos-imobiliarios/setor/Lajes Corporativas" />
          <MenuDropDownLink titulo="Logística" url="/fundos-imobiliarios/setor/Logística" />
          <MenuDropDownLink titulo="Outros" url="/fundos-imobiliarios/setor/Outros" />
          <MenuDropDownLink titulo="Renda" url="/fundos-imobiliarios/setor/Renda" />
          <MenuDropDownLink titulo="Residencial" url="/fundos-imobiliarios/setor/Residencial" />
          <MenuDropDownLink titulo="Shoppings" url="/fundos-imobiliarios/setor/Shoppings" />
          <MenuDropDownLink titulo="Títulos e Val. Mob" url="/fundos-imobiliarios/setor/Títulos e Val. Mob." />
        </MenuItemDropDown>
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
