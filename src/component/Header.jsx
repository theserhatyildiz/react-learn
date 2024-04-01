import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Header()
{

    // ------------------Variables------------------

    const loggedData = useContext(UserContext);

    const navigate = useNavigate();


    // ------------------Functions------------------

    function logout()
    {
        localStorage.removeItem("app-user");
        loggedData.setLoggedUser(null);
        navigate("/login");

    }


    // ------------------Results------------------
    return(
        <div>
                
        <ul className="header">
            <li>Diet</li>
            <li onClick={logout}>Logout</li>
        </ul>

</div>
    )
}