import DetalhesAcoes from "@/components/acoes/DetalhesAcoes";
import Card from "@/components/template/Card";
import Layout from "@/components/template/Layout";
import { Router, useRouter } from "next/router";

export default function Detalhes() {
  const router = useRouter();
  const codigo = router.query.codigo?.toString();
  const breadcrumbs: LinkModel[] = [{titulo: 'Home', link: '/'}, {titulo: 'Ações', link: '/acoes/listar'}]
  const currentBreadcrumbs: LinkModel =  {titulo: 'Detalhes', link: `/acoes/${codigo}/detalhes`};
  return (
    <Layout>
      <Card sizeText="text-sm" breadcrumbs={breadcrumbs} current={currentBreadcrumbs} className="flex">
        <DetalhesAcoes/>
      </Card>
    </Layout>
  );
}
