export interface Usuario {
    id?: string;
    nome?: string;
    email?: string;
    imagem?: string;
    access_token?: string,
    token_type?: "bearer"
    is_authenticated?: boolean
}