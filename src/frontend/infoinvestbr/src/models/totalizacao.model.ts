import { IPatrimonio } from "./patrimonio.model"

export interface ITotalizacao {
    acoes: IPatrimonio[]
    fundos: IPatrimonio[]
    ganho_acoes?: number
    total_porcentagem_acao?: number
    ganho_fundo?: number
    total_patrimonio?: number
    total_porcentagem_fundo?: number
    total_fundo?: number
    total_acao?: number
    total_investido?:number
    rentabilidade_total?:number
    ganhos_totais?:number
}