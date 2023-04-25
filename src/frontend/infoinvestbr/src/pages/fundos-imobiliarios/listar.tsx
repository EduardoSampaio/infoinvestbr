
import FundosImoboliariosListar from "@/components/fundos-imobiliarios/FundosImoboliariosListar";
import Card from "@/components/template/Card";
import Layout from "@/components/template/Layout";



export default function ListarFundosImobiliarios() {
    return (
        <Layout>
          <Card
            sizeText="text-xl"
            titulo="Fundos Imobiliários"
            className="flex"
          > 
            <FundosImoboliariosListar />
          </Card>
        </Layout>
      );
}