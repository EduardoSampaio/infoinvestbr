import ColorModeContext from "@/data/ThemeContext";
import { useContext } from "react";


const useAppTheme = () => useContext(ColorModeContext)

export default useAppTheme