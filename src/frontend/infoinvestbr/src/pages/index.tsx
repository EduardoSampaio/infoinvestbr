import Card from "@/components/template/Card";
import Layout from "@/components/template/Layout";
import Titulo from "@/components/template/Titulo";

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col w-full h-screen">
        <div className="flex">
          <Card className="basis-1/2 h-[250px]" titulo="Ibovespa" sizeText="text-xs"></Card>
          <Card className="basis-1/2 h-[250px]" titulo="IFIX" sizeText="text-xs"></Card>
          <Card className="basis-1/2 h-[250px]" titulo="Taxas e Moedas" sizeText="text-xs"></Card>
        </div>
        <div className="flex sm:flex-wrap md:flex-nowrap lg:flex-nowrap xl:flex-nowrap">
          <Card className="basis-full h-[250px]" titulo="Altas Ações" sizeText="text-xs"></Card>
          <Card className="basis-full h-[250px]" titulo="Baixas Ações" sizeText="text-xs"></Card>
          <Card className="basis-full h-[250px]" titulo="Altas Fundos Imobiliários" sizeText="text-xs"></Card>
          <Card className="basis-full h-[250px]" titulo="Baixas Fundos Imobiliários" sizeText="text-xs"></Card>
        </div>
      </div>
    </Layout>
  );
}
