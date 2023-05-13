import { IFundoImobiliario } from "@/models/fundos.model";
import Image from "next/image";
import Link from "next/link";

interface BlocoFundoImobiliarioProps {
  fundo: IFundoImobiliario;
}

export default function BlocoFundoImobiliario(
  props: BlocoFundoImobiliarioProps
) {
  return (
    <Link href={`/fundos-imobiliarios/${props.fundo.codigo}/detalhes`}>
      <div className="w-[200px] h-200px flex flex-col m-5 dark:text-white border p-2 
      cursor-pointer hover:bg-gray-200">
        <div className="flex">
          <div className="m-5">
            <Image src={"/img/fiis.svg"} alt="fii" width={"40"} height={"40"} />
          </div>
          <div className="mt-5">
            <h2 className="font-bold">{props.fundo.codigo}</h2>
          </div>
        </div>
        <div className="flex justify-center  text-xs">
          <h2 className="mr-2 ">P/VPA</h2>
          <h2>{props.fundo.p_vpa}</h2>
        </div>
        <div className="flex  justify-center  text-xs">
          <h2 className="mx-2">Último Dividendo</h2>
          <h2>
            {Number(props.fundo.dividendo).toLocaleString("pt-BR", {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </h2>
        </div>
        <div className="flex justify-center text-xs">
          <h2 className="mx-2">Div.Yield</h2>
          <h2>
            {(Number(props.fundo.dividend_yield) * 100).toLocaleString(
              "pt-BR",
              { maximumFractionDigits: 2, minimumFractionDigits: 2 }
            )}
            %
          </h2>
        </div>
      </div>
    </Link>
  );
}
