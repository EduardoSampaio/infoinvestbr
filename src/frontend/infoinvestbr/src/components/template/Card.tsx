import Image from "next/image";
import BasicBreadcrumbs from "../shared/BasicBreadcrumbs";
import useAppTheme from "@/hooks/useAppTheme";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

interface CardProps {
  className: string;
  titulo?: string;
  children?: any;
  sizeText: "text-xs" | "text-sm" | "text-lg" | "text-xl" | "text-2xl";
  breadcrumbs?: any
  current?: any
}

export default function Card(props: CardProps) {
  const {theme, toggleColorMode} = useAppTheme();
  
  return (
    <div
      className={`flex flex-col ${props.className} bg-white m-2.5 rounded-lg box-shadow
            dark:bg-primary-gray justify-center
            
            `}
    >
      {props.breadcrumbs || props.current ? (
        <div className="flex w-full">
          <div className="basis-full">
            <BasicBreadcrumbs current={props.current} links={props?.breadcrumbs} />
          </div>
          <div className="mr-8">
            <IconButton sx={{ ml: 1 }} onClick={toggleColorMode}>
                {theme?.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </div>
          </div>
      ) : (
        false
      )}
      
      {props.children}
    </div>
  );
}
