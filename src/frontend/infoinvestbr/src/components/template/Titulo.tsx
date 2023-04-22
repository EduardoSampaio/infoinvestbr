
interface TituloProps {
    texto?: string
    size: 'text-xs' | 'text-sm' | 'text-lg'| 'text-xl' | 'text-2xl'
}

export default function Titulo(props: TituloProps) {
    return <h2 className={`m-4 ${props.size} font-bold dark:text-white ${props.size}`}>{props.texto}</h2>
}