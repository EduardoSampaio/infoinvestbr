import useFetchApi from "@/data/hooks/useFetchApi";
import { IFundoImobiliario } from "@/models/fundos.model";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BlocoAcoes from "./BlocoAcoes";
import { IAcao } from "@/models/acao.model";

export default function AcaoSetor(props: any) {
  const router = useRouter();
  const [rows, setRows] = useState<IAcao[]>([]);
  const { find } = useFetchApi();
  const setor = router.query.setor?.toString();

  useEffect(() => {
    const fetchData = async () => {
      const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
      return await find(`${API_HOST}/analises/acao/setor/${setor}`);
    };

    if (setor !== undefined) {
      console.log(setor)
      fetchData()
        .then((json) => {
          setRows(json.result);
          console.log(json.result);
        })
        .catch((error) => console.log(error));
    }
  }, [router]);

  return (
    <div className="min-h-[600px] w-full flex flex-wrap">
        {rows.map((acao, index)=>  <BlocoAcoes acao={acao} key={index}/>)}
    </div>
  )
}
