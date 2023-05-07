import ColorModeContext from "@/data/context/ThemeContext";
import { useContext } from "react";


const useAppTheme = () => useContext(ColorModeContext)

export default useAppTheme