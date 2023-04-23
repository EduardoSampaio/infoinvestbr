import Titulo from "./Titulo";

interface CardProps {
  className: string;
  titulo?: string;
  children?: any;
  sizeText: 'text-xs' | 'text-sm' | 'text-lg'| 'text-xl' | 'text-2xl'
}

export default function Card(props: CardProps) {
  return (
    <div
      className={`${props.className} bg-white m-2.5 h-auto rounded-lg box-shadow
            dark:bg-primary-gray
            `}
    >
        <Titulo texto={props.titulo} size={props.sizeText}/>
        {props.children}
    </div>
  );
}
