import MenuLateral from "./MenuLateral";

export default function Content(props: any) {
  return (
    <div className={`flex`}>
      <MenuLateral />
      <section className="flex h-screen w-full">
        {props.children}
      </section>
    </div>
  );
}
