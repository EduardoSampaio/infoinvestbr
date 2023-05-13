import Link from "next/link";
import { useRouter } from "next/router";
import { HiChevronRight } from "react-icons/hi";

interface MenuDropDownLinkProps {
  titulo: string;
  url: string;
}

export default function MenuDropDownLink(props: MenuDropDownLinkProps) {
  return (
    <Link href={props.url}>
      <div
        className={`p-3 cursor-pointer
          hover:bg-gray-100 hover:text-black
          dark:hover:bg-gray-500 dark:text-white dark:hover:text-white
          font-medium text-sm`}
      >
        <div className="w-full flex">
          <HiChevronRight className="mt-1"/>
          {props.titulo}
        </div>
    </div>
    </Link>
  );
}
