import { useSelector } from "react-redux";
import { selectInformation } from "../../pages/login/loginSlice";
export default function PopupScreen() {
    const loginInformation = useSelector(selectInformation);
    console.log(loginInformation);
    
}