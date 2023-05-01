import ExitIcon from "./ExitIcon";
import IconButton from "./IconButton";

interface Props {
  children: React.ReactNode;
  open: boolean;
  onClose: Function;
}
export default function Dialog(props: Props) {
  const { open, onClose } = props;
  if (!open) {
    return <></>;
  }
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
      <div className={`relative p-8 bg-white border-2 shadow-lg w-full max-w-md m-auto flex-col flex rounded-lg 
        dark:bg-gray-700 dark:border-gray-500
      `}>
      <div>{props.children}</div>
      <span className="absolute top-0 right-0 p-4">     
       <IconButton onClick={() => onClose()}>
         <ExitIcon />
       </IconButton>
     </span>
     </div>
   </div>
 );
}