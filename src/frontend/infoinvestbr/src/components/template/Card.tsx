interface CardProps {
  className: string;
  titulo?: string;
  children?: any;
  sizeText: "text-xs" | "text-sm" | "text-lg" | "text-xl" | "text-2xl";
}

export default function Card(props: CardProps) {
  return (
    <div
      className={`flex flex-col ${props.className} bg-white m-2.5 rounded-lg box-shadow
            dark:bg-primary-gray
            `}
    >
      <div
        className={`flex w-full m-4 ${props.sizeText} font-bold dark:text-white`}
      >
        {props.titulo}
      </div>
      {props.children}
    </div>
  );
}
