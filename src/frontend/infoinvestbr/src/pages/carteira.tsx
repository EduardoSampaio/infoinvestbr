import Card from "@/components/template/Card";
import Layout from "@/components/template/Layout";

export default function Carteira() {
  const breadcrumbs: LinkModel[] = [{titulo: 'Home', link: '/'}]
  const currentBreadcrumbs: LinkModel = {titulo: 'Carteira', link: '/carteira'}
  return (
    <Layout>
      <Card
        sizeText="text-sm"
        titulo="Ações"
        className="flex"
        breadcrumbs={breadcrumbs}
        current={currentBreadcrumbs}
      > 

      </Card>
    </Layout>
  );
}
