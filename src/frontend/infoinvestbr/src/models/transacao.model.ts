export interface ITransacao {
    categoria?: number
    ordem?: number
    data?: string
    preco?: number
    ganho?: number
    usuario_id?: string
    id?: number
    codigo_ativo?: any
    corretora?: string
    quantidade?: number
    total?: number
    corretagem?: number
}
