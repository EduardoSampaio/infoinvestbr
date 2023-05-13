import useFetchApi from "@/data/hooks/useFetchApi";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function FundosImobiliarioSetor(props: any) {
  const router = useRouter();
  const [rows, setRows] = useState<any[]>([]);
  const { find } = useFetchApi();
  const setor = router.query.setor?.toString();

  useEffect(() => {
    const fetchData = async () => {
      const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
      return await find(`${API_HOST}/analises/fundos-imobiliarios/setor/${setor}`);
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

  return <div></div>;
}
