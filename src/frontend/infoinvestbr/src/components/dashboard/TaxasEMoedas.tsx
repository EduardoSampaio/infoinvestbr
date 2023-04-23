import { Chip } from "@mui/material";

export default function TaxasEmoedas() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex flex-col w-full justify-center items-center">
        <div className="my-2 font-semibold">
          <Chip label="IBOVESPA 104.366,82" className="dark:text-white" />
        </div>
        <div className="my-2 font-semibold">
          <Chip label="IFIX 2.753,11" className="dark:text-white" />
        </div>
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        <div className="my-2 font-semibold">
          <Chip label="CDI 13,28%" className="dark:text-white" />
        </div>
        <div className="my-2 font-semibold">
          <Chip label="IPCA 4,65%" className="dark:text-white" />
        </div>
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        <div className="my-2 font-semibold">
          <Chip label="Dolar 5,05" className="dark:text-white" />
        </div>
        <div className="my-2 font-semibold">
          <Chip label=" Euro 5,60" className="dark:text-white" />
        </div>
      </div>
    </div>
  );
}
