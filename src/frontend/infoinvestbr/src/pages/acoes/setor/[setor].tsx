import Card from "@/components/template/Card";
import Layout from "@/components/template/Layout";
import { useRouter } from "next/router"



export default function Setor(){
    const router = useRouter()
    const setor = router.query.setor?.toString();
    const breadcrumbs: LinkModel[] = [{titulo: 'Home', link: '/'}, {titulo: 'Ações', link: '/acoes/listar'}]
    const currentBreadcrumbs: LinkModel =  {titulo: `${setor}`, link: `/acoes/setor/${setor}`};
    return (
    <Layout>
        <Card sizeText="text-sm" breadcrumbs={breadcrumbs} current={currentBreadcrumbs} className="flex">
            <div><h2>setor</h2></div>
        </Card>
    </Layout>
    )
}