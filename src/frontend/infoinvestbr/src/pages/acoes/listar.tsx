import AcoesListar from "@/components/acoes/AcoesListar";
import Card from "@/components/template/Card";
import Layout from "@/components/template/Layout";


export default function ListarAcoes() {
  return (
    <Layout>
      <Card
        sizeText="text-xl"
        titulo="Ações"
        className="flex"
      > 
        <AcoesListar />
      </Card>
    </Layout>
  );
}
