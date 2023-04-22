import Link from "next/link";
import { useRouter } from "next/router";
import { HiTag, HiOutlineTag } from "react-icons/hi";

interface MenuLateralItemProps {
  texto: string;
  url: string;
}

export default function MenuLateralItem(props: MenuLateralItemProps) {
  const router = useRouter();
  const active = router.pathname === props.url;

  return (
    <>
      <Link href={props.url}>
        <li
          className="cursor-pointer py-2 text-xs
           hover:text-gray-800 hover:font-bold
         dark:text-white dark:hover:text-gray-300"
        >
          <div className="flex items-center">
            {active ? <HiTag /> : <HiOutlineTag />}

            <h4 className="ml-0.5">{props.texto}</h4>
          </div>
        </li>
      </Link>
    </>
  );
}
