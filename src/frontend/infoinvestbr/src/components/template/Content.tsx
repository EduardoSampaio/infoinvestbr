import MenuLateral from "./MenuLateral";

export default function Content(props: any) {
  return (
    <div className={`flex`}>
      <MenuLateral />
      <section className="flex h-screen w-full bg-gray-200 dark:bg-black">
        {props.children}
      </section>
    </div>
  );
}
