import { IAcao } from "@/models/acao.model";
import { IFundoImobiliario } from "@/models/fundos.model";
import Image from "next/image";
import Link from "next/link";

interface BlocoAcoesProps {
  acao: IAcao;
}

function getImage(imagem?: string) {
  return imagem === undefined || imagem === null
    ? "/img/acao.svg"
    : `/img/acoes/${imagem}.jpg`;
}

export default function BlocoAcoes(
  props: BlocoAcoesProps
) {

  return (
    <Link href={`/acoes/${props.acao.codigo}/detalhes`}>
      <div className="w-[200px] h-200px flex flex-col m-5 dark:text-white border p-2 
      cursor-pointer hover:bg-gray-200 dark:hover:text-black">
        <div className="flex">
          <div className="m-5">
            <Image src={getImage(props.acao.imagem)} alt="acao" width={"40"} height={"40"} />
          </div>
          <div className="mt-5">
            <h2 className="font-bold">{props.acao.codigo}</h2>
          </div>
        </div>
        <div className="flex justify-center  text-xs">
          <h2 className="mr-2">P/L</h2>
          <h2>
            {Number(props.acao.pl).toLocaleString("pt-BR", {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </h2>
        </div>
        <div className="flex  justify-center  text-xs">
          <h2 className="mx-2">P/VP</h2>
          <h2>
            {Number(props.acao.pvp).toLocaleString("pt-BR", {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </h2>
        </div>
        <div className="flex justify-center text-xs">
          <h2 className="mx-2">Div.Yield</h2>
          <h2>
            {(Number(props.acao.dividend_yield) * 100).toLocaleString(
              "pt-BR",
              { maximumFractionDigits: 2, minimumFractionDigits: 2 }
            )}
            %
          </h2>
        </div>
        <div className="flex justify-center text-xs">
          <h2 className="mx-2">ROE</h2>
          <h2>
            {(Number(props.acao.roe) * 100).toLocaleString(
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
