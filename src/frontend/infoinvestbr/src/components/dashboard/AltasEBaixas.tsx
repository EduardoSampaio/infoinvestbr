import { ITicker } from "@/models/ticker.model";
import Image from "next/image";
import { MdArrowUpward, MdArrowDownward } from "react-icons/md";

interface AltasEBaixasProps {
  ticker: ITicker[];
}

export default function AltasEBaixas(props: AltasEBaixasProps) {
  function renderList() {
    const renderTicker = props.ticker.map((value, index) => {
      return (
        <li key={index} className="my-1.5">
          <div className={`flex mx-4 justify-center`}>
            <div className="font-semibold  w-1/2">{index+1} </div>
            <Image
              alt="ativo imagem"
              src={value.imagem}
              width="20"
              height="20"
              className="mr-2"
            /> 
            <div className="font-semibold  w-full">{value.codigo} </div>
            <div className={`flex  w-full font-semibold ${value?.tipo === 'Alta' ? 'text-green-400' : 'text-red-500'} ml-2`}>{value.total} 
                {value?.tipo === 'Alta' ? <MdArrowUpward /> :  <MdArrowDownward />}
            </div>
          </div>
        </li>
      );
    });
    return <ul>{renderTicker}</ul>;
  }

  return (
    <div>
      <ul
        className={`text-sm
      `}
      >
        {renderList()}
      </ul>
    </div>
  );
}
