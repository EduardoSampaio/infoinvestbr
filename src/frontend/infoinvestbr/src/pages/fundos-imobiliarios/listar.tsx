
import FundosImobiliariosListar from "@/components/fundos-imobiliarios/FundosImoboliariosListar";
import Card from "@/components/template/Card";
import Layout from "@/components/template/Layout";



export default function ListarFundosImobiliarios() {
  const breadcrumbs: LinkModel[] = [{titulo: 'Home', link: '/'}]
  const currentBreadcrumbs: LinkModel = {titulo: 'Fundos Imobiliários', link: '/fundos-imobiliarios/listar'}
    return (
        <Layout>
          <Card
            sizeText="text-sm"
            titulo="Fundos Imobiliários"
            className="flex"
            breadcrumbs={breadcrumbs}
            current={currentBreadcrumbs}
          > 
            <FundosImobiliariosListar />
          </Card>
        </Layout>
      );
}