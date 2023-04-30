import Card from "@/components/template/Card";
import Layout from "@/components/template/Layout";

export default function Proventos() {
  const breadcrumbs: LinkModel[] = [{titulo: 'Home', link: '/'}]
  const currentBreadcrumbs: LinkModel = {titulo: 'Proventos', link: '/proventos'}
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
