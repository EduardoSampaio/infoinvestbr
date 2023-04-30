import Card from "@/components/template/Card";
import Layout from "@/components/template/Layout";
import ListarTransacoes from "@/components/transacoes/ListarTransacoes";

export default function Transacoes() {
  const breadcrumbs: LinkModel[] = [{ titulo: "Home", link: "/" }];
  const currentBreadcrumbs: LinkModel = {
    titulo: "Transações",
    link: "/transacao",
  };
  return (
    <Layout>
      <Card
        sizeText="text-sm"
        titulo="Ações"
        className="flex"
        breadcrumbs={breadcrumbs}
        current={currentBreadcrumbs}
      >
          <ListarTransacoes />
      </Card>
    </Layout>
  );
}
