import Titulo from "./Titulo";

interface CardProps {
  className: string;
  titulo?: string;
}

export default function Card(props: CardProps) {
  return (
    <div
      className={`${props.className} bg-white m-3 rounded-lg shadow-lg
            dark:bg-primary-gray
            `}
    >
        <Titulo texto={props.titulo}/>
    </div>
  );
}
