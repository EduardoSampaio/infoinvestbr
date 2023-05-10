export interface Usuario {
    id?: string;
    nome?: string;
    email?: string;
    senha?: string;
    confirmar_senha?: string;
    imagem?: string;
    access_token?: string,
    token_type?: "bearer"
    is_authenticated?: boolean
}