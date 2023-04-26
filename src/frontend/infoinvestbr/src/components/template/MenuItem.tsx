import Link from "next/link"
import { useRouter } from "next/router"
import { IconType } from "react-icons/lib"


interface MenuItemProps {
    icon: IconType
    url: string
    titulo: string
}


export default function MenuItem(props: MenuItemProps) {
    const router = useRouter();
    const active = router.pathname === props.url ? `
    bg-gray-100 text-black border-b-2 border-black 
    dark:bg-gray-500 dark:text-white dark:border-white dark:hover:border-white
    ` : '';

    return (
        <Link href={props.url}>
            <li className={`
                flex flex-col items-center text-sm
                mx-2 pt-1.5 px-6 cursor-pointer
                 hover:bg-gray-100 hover:border-b-2 hover:border-black hover:text-black
                 dark:hover:bg-gray-500 dark:text-white dark:hover:text-white 
                 dark:border-white dark:hover:border-white
                 ${active}`}>
                {<props.icon className="text-2xl"/>}
                <span className="text-xs">{props.titulo}</span>
            </li>
        </Link>
    )
}