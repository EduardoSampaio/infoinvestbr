import useAppData from "@/hooks/useAppData";
import NavMenu from "./NavMenu";
import Logo from "./Logo";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";


export default function Header() {
  const { tema, alternarTema } = useAppData();
  const classTema = tema === "dark" ? `text-white` : 'text-black';

  return (
    <header
      className={`flex w-full h-12 bg-white dark:bg-primary-gray justify-center`}
    >
      <Logo />
      <NavMenu />
      <IconButton sx={{ ml: 1 }} onClick={alternarTema} className={`${classTema}`}>
        {tema === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </header>
  );
}
