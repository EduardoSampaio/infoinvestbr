import { IconButton, Tooltip } from "@mui/material";
import { HiQuestionMarkCircle } from "react-icons/hi";

interface BoxIndicadorProps {
  indicador: string;
  valor: string;
}

export default function BoxIndicador(props: BoxIndicadorProps) {
  return (
    <div
      className={`flex xl:basis-[18%] lg:basis-[15%] md:basis-[100%] sm:basis-[100%]  min-h-[80px] h-auto
        border-2 dark:border-gray-600 m-2.5 justify-center items-center`}
    >
      <div className="flex flex-col w-full justify-center items-center">
        <h3 className=" text-gray-400">{props.indicador}</h3>
        <h2 className="font-semibold">{props.valor}</h2>
      </div>
      <div>
        <Tooltip title="Valor bla bla" className="cursor-pointer">
          <IconButton>
            <HiQuestionMarkCircle />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}
