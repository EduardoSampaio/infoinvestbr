import Image from "next/image";
import BasicBreadcrumbs from "../shared/BasicBreadcrumbs";

interface CardProps {
  className: string;
  titulo?: string;
  children?: any;
  sizeText: "text-xs" | "text-sm" | "text-lg" | "text-xl" | "text-2xl";
  breadcrumbs?: any
  current?: any
}

export default function Card(props: CardProps) {
  return (
    <div
      className={`flex flex-col ${props.className} bg-white m-2.5 rounded-lg box-shadow
            dark:bg-primary-gray justify-center
            
            `}
    >
      {props.breadcrumbs || props.current ? (
        <div>
          <BasicBreadcrumbs current={props.current} links={props?.breadcrumbs} />
        </div>
      ) : (
        false
      )}
      
      {props.children}
    </div>
  );
}
