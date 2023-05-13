import FundosImobiliarioSetor from "@/components/fundos-imobiliarios/FundosImobiliarioSetor";
import Card from "@/components/template/Card";
import Layout from "@/components/template/Layout";
import { useRouter } from "next/router"



export default function Setor(){
    const router = useRouter()
    const setor = router.query.setor?.toString();
    const breadcrumbs: LinkModel[] = [{titulo: 'Home', link: '/'}, {titulo: 'Fundos Imobiliários', link: '/fundos-imobiliarios/listar'}]
    const currentBreadcrumbs: LinkModel =  {titulo: `${setor}`, link: `/fundos-imobiliarios/setor/${setor}`};
    return (
    <Layout>
        <Card sizeText="text-sm" breadcrumbs={breadcrumbs} current={currentBreadcrumbs} className="flex">
            <FundosImobiliarioSetor />
        </Card>
    </Layout>
    )
}