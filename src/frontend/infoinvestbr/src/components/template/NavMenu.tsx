import {
  HiOutlineHome,
  HiOutlineOfficeBuilding,
  HiOutlineDocument,
} from "react-icons/hi";
import MenuItem from "./MenuItem";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";

export default function NavMenu() {
  function getMenuId(menuId: any) {
    console.log(menuId);
  }

  return (
    <nav className="flex h-12 justify-center flex-grow">
      <ul className="flex">
        <MenuItem key={1} icon={HiOutlineHome} titulo="Início" url="/" />
        <MenuItem
          key={2}
          icon={HiOutlineDocument}
          titulo="Ações"
          url="/acoes/listar"
        />
        <MenuItem
          icon={HiOutlineOfficeBuilding}
          titulo="Fundos Imobliários"
          url="/fundos-imobiliarios/listar"
          key={3}
        />
      </ul>
    </nav>
  );
}
