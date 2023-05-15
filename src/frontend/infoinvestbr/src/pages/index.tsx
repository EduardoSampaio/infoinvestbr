import AltasEBaixas from "@/components/dashboard/AltasEBaixas";
import TaxasEmoedas from "@/components/dashboard/TaxasEMoedas";
import Card from "@/components/template/Card";
import Layout from "@/components/template/Layout";
import { ITicker } from "@/models/ticker.model";
import { Autocomplete, TextField } from "@mui/material";

const tickersAlta: ITicker[] = [
  {
    codigo: "BBAS3",
    tipo: "Alta",
    valor: 43.75,
    total: "1.55%",
    imagem: "/img/acoes/331.jpg",
  },
  {
    codigo: "TAEE11",
    tipo: "Alta",
    valor: 34.75,
    total: "3.55%",
    imagem: "/img/acoes/480.jpg",
  },
  {
    codigo: "TASA4",
    tipo: "Alta",
    valor: 14.74,
    total: "3.55%",
    imagem: "/img/acoes/177.jpg",
  },
  {
    codigo: "ITSA4",
    tipo: "Alta",
    valor: 8.75,
    total: "0.55%",
    imagem: "/img/acoes/345.jpg",
  },
  {
    codigo: "BBDC4",
    tipo: "Alta",
    valor: 13.75,
    total: "3.55%",
    imagem: "/img/acoes/330.jpg",
  },
  {
    codigo: "ALUP11",
    tipo: "Alta",
    valor: 26.75,
    total: "3.55%",
    imagem: "/img/acoes/446.jpg",
  },
  {
    codigo: "CMIG4",
    tipo: "Alta",
    valor: 12.74,
    total: "2.55%",
    imagem: "/img/acoes/455.jpg",
  },
  {
    codigo: "CPLE6",
    tipo: "Alta",
    valor: 7.75,
    total: "1.50%",
    imagem: "/img/acoes/462.jpg",
  },
  {
    codigo: "SAPR4",
    tipo: "Alta",
    valor: 3.74,
    total: "11.55%",
    imagem: "/img/acoes/443.jpg",
  },
  {
    codigo: "MOVI3",
    tipo: "Alta",
    valor: 8.75,
    total: "3.55%",
    imagem: "/img/acoes/247.jpg",
  },
];

const tickersBaixa: ITicker[] = [
  {
    codigo: "BBAS3",
    tipo: "Baixa",
    valor: 43.75,
    total: "1.55%",
    imagem: "/img/acoes/331.jpg",
  },
  {
    codigo: "TAEE11",
    tipo: "Baixa",
    valor: 34.75,
    total: "3.55%",
    imagem: "/img/acoes/480.jpg",
  },
  {
    codigo: "TASA4",
    tipo: "Baixa",
    valor: 14.74,
    total: "3.55%",
    imagem: "/img/acoes/177.jpg",
  },
  {
    codigo: "ITSA4",
    tipo: "Baixa",
    valor: 8.75,
    total: "0.55%",
    imagem: "/img/acoes/345.jpg",
  },
  {
    codigo: "BBDC4",
    tipo: "Baixa",
    valor: 13.75,
    total: "3.55%",
    imagem: "/img/acoes/330.jpg",
  },
  {
    codigo: "ALUP11",
    tipo: "Baixa",
    valor: 26.75,
    total: "3.55%",
    imagem: "/img/acoes/446.jpg",
  },
  {
    codigo: "CMIG4",
    tipo: "Baixa",
    valor: 12.74,
    total: "2.55%",
    imagem: "/img/acoes/455.jpg",
  },
  {
    codigo: "CPLE6",
    tipo: "Baixa",
    valor: 7.75,
    total: "1.50%",
    imagem: "/img/acoes/462.jpg",
  },
  {
    codigo: "SAPR4",
    tipo: "Baixa",
    valor: 3.74,
    total: "11.55%",
    imagem: "/img/acoes/443.jpg",
  },
  {
    codigo: "MOVI3",
    tipo: "Baixa",
    valor: 8.75,
    total: "3.55%",
    imagem: "/img/acoes/247.jpg",
  },
];

const tickersFiisAlta: ITicker[] = [
  {
    codigo: "HGLG11",
    tipo: "Alta",
    valor: 43.75,
    total: "1.55%",
    imagem: "/img/fiis.svg",
  },
  {
    codigo: "XPML11",
    tipo: "Alta",
    valor: 34.75,
    total: "3.55%",
    imagem: "/img/fiis.svg",
  },
  {
    codigo: "MXFR11",
    tipo: "Alta",
    valor: 14.74,
    total: "3.55%",
    imagem: "/img/fiis.svg",
  },
  {
    codigo: "XPLG11",
    tipo: "Alta",
    valor: 8.75,
    total: "0.55%",
    imagem: "/img/fiis.svg",
  },
  {
    codigo: "HFOF11",
    tipo: "Alta",
    valor: 13.75,
    total: "3.55%",
    imagem: "/img/fiis.svg",
  },
  {
    codigo: "BCFF11",
    tipo: "Alta",
    valor: 26.75,
    total: "3.55%",
    imagem: "/img/fiis.svg",
  },
  {
    codigo: "VILG11",
    tipo: "Alta",
    valor: 12.74,
    total: "2.55%",
    imagem: "/img/fiis.svg",
  },
  {
    codigo: "VISC11",
    tipo: "Alta",
    valor: 7.75,
    total: "1.50%",
    imagem: "/img/fiis.svg",
  },
  {
    codigo: "VINO11",
    tipo: "Alta",
    valor: 3.74,
    total: "11.55%",
    imagem: "/img/fiis.svg",
  },
  {
    codigo: "HCTR11",
    tipo: "Alta",
    valor: 8.75,
    total: "3.55%",
    imagem: "/img/fiis.svg",
  },
];

const tickersFiisBaixa: ITicker[] = [
  {
    codigo: "HGLG11",
    tipo: "Baixa",
    valor: 43.75,
    total: "1.55%",
    imagem: "/img/fiis.svg",
  },
  {
    codigo: "XPML11",
    tipo: "Baixa",
    valor: 34.75,
    total: "3.55%",
    imagem: "/img/fiis.svg",
  },
  {
    codigo: "MXFR11",
    tipo: "Baixa",
    valor: 14.74,
    total: "3.55%",
    imagem: "/img/fiis.svg",
  },
  {
    codigo: "XPLG11",
    tipo: "Baixa",
    valor: 8.75,
    total: "0.55%",
    imagem: "/img/fiis.svg",
  },
  {
    codigo: "HFOF11",
    tipo: "Baixa",
    valor: 13.75,
    total: "3.55%",
    imagem: "/img/fiis.svg",
  },
  {
    codigo: "BCFF11",
    tipo: "Baixa",
    valor: 26.75,
    total: "3.55%",
    imagem: "/img/fiis.svg",
  },
  {
    codigo: "VILG11",
    tipo: "Baixa",
    valor: 12.74,
    total: "2.55%",
    imagem: "/img/fiis.svg",
  },
  {
    codigo: "VISC11",
    tipo: "Baixa",
    valor: 7.75,
    total: "1.50%",
    imagem: "/img/fiis.svg",
  },
  {
    codigo: "VINO11",
    tipo: "Baixa",
    valor: 3.74,
    total: "11.55%",
    imagem: "/img/fiis.svg",
  },
  {
    codigo: "HCTR11",
    tipo: "Baixa",
    valor: 8.75,
    total: "3.55%",
    imagem: "/img/fiis.svg",
  },
];

export default function Home() {
  const breadcrumbs: LinkModel = { titulo: "Home", link: "/" };

  return (
    <Layout>
      <div className="flex flex-col w-full">
        <div className="flex max-sm:flex-wrap sm:flex-wrap md:flex-wrap lg:flex-nowrap xl:flex-nowrap">
          <Card
            className="basis-full h-[150px]"
            titulo="Mercado Financeiro"
            sizeText="text-xs"
            current={breadcrumbs}
          >
            <TaxasEmoedas />
          </Card>
        </div>
        <div className="flex max-sm:flex-wrap sm:flex-wrap md:flex-wrap lg:flex-nowrap xl:flex-nowrap">
          <Card
            className="basis-full h-[320px]"
            titulo="Ações Maiores Altas"
            sizeText="text-xs"
          >
            <AltasEBaixas ticker={tickersAlta} />
          </Card>
          <Card
            className="basis-full h-[320px]"
            titulo="Ações Maiores Baixas"
            sizeText="text-xs"
          >
            <AltasEBaixas ticker={tickersBaixa} />
          </Card>
          <Card
            className="basis-full h-[320px]"
            titulo="Fundos Imobiliários Maiores Alta"
            sizeText="text-xs"
          >
            <AltasEBaixas ticker={tickersFiisAlta} />
          </Card>
          <Card
            className="basis-full h-[320px]"
            titulo="Fundos Imobiliários Maiores Baixas"
            sizeText="text-xs"
          >
            <AltasEBaixas ticker={tickersFiisBaixa} />
          </Card>
        </div>
      </div>
    </Layout>
  );
}
