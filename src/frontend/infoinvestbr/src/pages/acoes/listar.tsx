import AcoesListar from "@/components/acoes/AcoesListar";
import Card from "@/components/template/Card";
import Layout from "@/components/template/Layout";


export default function ListarAcoes() {
  const breadcrumbs: LinkModel[] = [{titulo: 'Home', link: '/'}]
  const currentBreadcrumbs: LinkModel = {titulo: 'Ações', link: '/acoes/listar'}
  return (
    <Layout>
      <Card
        sizeText="text-sm"
        titulo="Ações"
        className="flex"
        breadcrumbs={breadcrumbs}
        current={currentBreadcrumbs}
      > 
        <AcoesListar />
      </Card>
    </Layout>
  );
}
