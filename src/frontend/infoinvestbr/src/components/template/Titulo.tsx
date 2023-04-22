
interface TituloProps {
    texto?: string
}

export default function Titulo(props: TituloProps) {
    return <h2 className="m-4 font-bold dark:text-white">{props.texto}</h2>
}