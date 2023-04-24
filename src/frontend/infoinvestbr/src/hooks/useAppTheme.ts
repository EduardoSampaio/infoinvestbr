import ColorModeContext from "@/data/themeContext";
import { useContext } from "react";


const useAppTheme = () => useContext(ColorModeContext)

export default useAppTheme