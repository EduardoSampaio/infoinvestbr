import DetalhesFundosImobiliario from "@/components/fundos-imobiliarios/DetalhesFundosImobiliario";
import Card from "@/components/template/Card";
import Layout from "@/components/template/Layout";
import { useRouter } from "next/router";


export default function Detalhes() {
    const router = useRouter();
    const codigo = router.query.codigo?.toString();
    const breadcrumbs: LinkModel[] = [{titulo: 'Home', link: '/'}, {titulo: 'Fundos Imobiliário', link: '/fundos-imobiliarios/listar'}]
    const currentBreadcrumbs: LinkModel =  {titulo: 'Detalhes', link: `/fundos-imobiliarios/${codigo}/detalhes`};
    return (
      <Layout>
        <Card sizeText="text-sm" breadcrumbs={breadcrumbs} current={currentBreadcrumbs} className="flex">
          <DetalhesFundosImobiliario />
        </Card>
      </Layout>
    );
}