import ListaPatrimonio from "@/components/patrimonio/ListarPatrimonio";
import Card from "@/components/template/Card";
import Layout from "@/components/template/Layout";

export default function Patrimonio() {
  const breadcrumbs: LinkModel[] = [{titulo: 'Home', link: '/'}]
  const currentBreadcrumbs: LinkModel = {titulo: 'Patrimônio', link: '/patrimonio'}
  return (
    <Layout>
      <Card
        sizeText="text-sm"
        titulo="Ações"
        className="flex"
        breadcrumbs={breadcrumbs}
        current={currentBreadcrumbs}
      > 
        <ListaPatrimonio />
      </Card>
    </Layout>
  );
}
