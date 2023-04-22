import Content from "./Content";
import Header from "./Header";
import useAppData from "@/hooks/useAppData";

export default function Layout(props: any) {
  const { tema } = useAppData();
  return (
    <>
      <div className={`${tema} flex flex-col w-full h-screen
      `}>
        <Header />
        <Content>
          {props.children}
        </Content>
      </div>
    </>
  );
}
