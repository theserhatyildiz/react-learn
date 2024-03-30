import { useState,  } from "react"
import { Link, useNavigate} from "react-router-dom"

export default function Login()
{

     // ------------------Variables------------------

     const [userCreds,setUserCreds] = useState({
        email:"",
        password:""
     })

     const [message,setMessage] = useState({
        type:"invisible-msg",
        text:"Dummy Msg"
     })

     const navigate = useNavigate();

     // ------------------Functions------------------

     function handleInput(event)
     {

        // console.log(event.target.name, event.target.value)


        setUserCreds((prevState)=>{

            return {...prevState,[event.target.name]:event.target.value}

        })     
        
     }

     function handleSubmit(event)
     {
        event.preventDefault();
        console.log(userCreds);


        // ------------------Sending the data to API------------------

        fetch("http://localhost:8000/login",{
            method:"POST",
            body:JSON.stringify(userCreds),
            headers:{
                "Content-type":"application/json"
            }

        })
        .then((response)=>{

            if(response.status===404)
            {
                setMessage({ type:"error", text:"Email Doesn't exist"})
            }
            else if(response.status===403)
            {
                setMessage({ type:"error", text:"Invalid Password"})
            }

            setTimeout(()=>{

                setMessage({type:"invisible-msg", text:"Dummy msg"})

            },5000)

            return response.json();

        })
        .then((data)=>{
            if(data.token!==undefined)
            {
                localStorage.setItem("app-user",JSON.stringify(data));

                // loggedData.setLoggedUser(data);

                navigate("/diet");
            }
        })
        .catch((err)=>{
            console.log(err)
        })

     }

     

     // ------------------Result------------------

    return(
        <section className="container">

        <form className="form" onSubmit={handleSubmit}>

            <h1>Login </h1>

            <input className="inp" type="email" onChange={handleInput} placeholder="Enter Email" name="email" value={userCreds.email} required/>
            <input className="inp" type="password" onChange={handleInput} placeholder="Enter Password" name="password"value={userCreds.password} required minLength={8}/>


            <button className="btn">Login</button>

            <p>Don't have an accout? <Link to="/register"> Register now</Link></p>

            <p className={message.type}>{message.text}</p>
        
        </form>
    </section>
    )
}