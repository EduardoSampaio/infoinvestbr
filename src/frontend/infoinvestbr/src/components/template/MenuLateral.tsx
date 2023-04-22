import Card from "./Card";

interface MenuLateralProps {

}

export default function MenuLateral(props: MenuLateralProps) {
    return (    
        <aside className={`flex h-screen bg-gray-200 dark:bg-black`}>
            <Card  className={`h-2/3 w-[200px]`}/>
        </aside>
    )
}