export interface ITicker  {
    codigo: string;
    valor: number;
    tipo: 'Alta' | 'Baixa'
    total: string;
    imagem: string;
}