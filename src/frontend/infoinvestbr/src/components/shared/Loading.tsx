import { CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <div className="w-full flex justify-center items-center h-[400px]">
      <CircularProgress />
    </div>
  );
}
