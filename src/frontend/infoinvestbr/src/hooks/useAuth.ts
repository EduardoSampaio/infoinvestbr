import { useContext } from "react";
import AuthContext from "../data/AuthContext";

const useAuth = () => useContext(AuthContext)

export default useAuth