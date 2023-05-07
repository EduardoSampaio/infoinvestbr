import Image from 'next/image';
import Button from '../Button';
import Dialog from './Dialog';
import { AiOutlineWarning } from "react-icons/ai";

interface Props {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onClose: Function;
  onConfirm: Function; 
}

export default function ConfirmDialog(props: Props) {
  const { open, onClose, title, children, onConfirm } = props;
  if (!open) {
    return <></>;
  }
  
  return (
    <Dialog open={open} onClose={onClose}>
      <div className='flex'>
        <AiOutlineWarning  width={"50px"} height={"50px"} className='h-[25px] w-[25px] text-yellow-500'/>
        <h2 className="text-xl ml-2">{title}</h2>
      </div>
      <div className="py-5">{children}</div>
      <div className="flex justify-end">
        <div className="p-1">
          <Button 
            onClick={() => onClose()}
            className="bg-gray-500 hover:bg-gray-800"
          >
            No
          </Button>
        </div>
        <div className="p-1">
          <Button
            className='bg-red-400 hover:bg-red-600'
            onClick={() => {
              onClose();
              onConfirm();
            }}
          >
            Yes
          </Button>
        </div>
      </div>
    </Dialog>
  );
}