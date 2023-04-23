import AcoesListar from "@/components/acoes/AcoesListar";
import Card from "@/components/template/Card";
import Layout from "@/components/template/Layout";


export default function ListarPage() {
    return (
        <Layout>
            <Card sizeText="text-xs" titulo="Ações" className="flex w-full">
                <AcoesListar />
            </Card>
        </Layout>
    )
}