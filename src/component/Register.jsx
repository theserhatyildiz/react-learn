import { Link } from "react-router-dom"
import { useState } from "react"

export default function Register()
{

    // ------------------Variables------------------

    const [userDetails,setUserDetails] = useState({
        name:"",
        email:"",
        password:"",
        age:"",
    })

    const [message,setMessage] = useState({
        type:"invisible-msg",
        text:"Dummy Msg"
    })


    // ------------------Functions------------------

    function handleInput(event)
    {
        setUserDetails((prevState)=>{

            return {...prevState,[event.target.name]:event.target.value}
        }) 
    }

    function handleSubmit(event)
    {
        event.preventDefault();
        console.log(userDetails);

    // ------------------Sending the data to API------------------

        fetch("http://localhost:8000/register",{
            method:"POST",
            body:JSON.stringify(userDetails),
            headers:{
                "Content-type":"application/json"
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            
            setMessage({type:"success",text:data.message});

            setUserDetails({
                name:"",
                email:"",
                password:"",
                age:"",
            })

            setTimeout(()=>{
                setMessage({type:"invisible-msg",text:"Dummy msg"});
            },5000)
        })
        .catch((err)=>{
            console.log(err);
        })


    }
    

    // ------------------Result------------------


    return(
        
        <section className="container">

            <form className="form" onSubmit={handleSubmit}>

                <h1>Galwin Nutrition </h1>

                <input className="inp" type="text" onChange={handleInput} placeholder="Enter Name" name="name" value={userDetails.name} required/>
                <input className="inp" type="email" onChange={handleInput} placeholder="Enter Email" name="email" value={userDetails.email} required/>
                <input className="inp" type="password" onChange={handleInput} placeholder="Enter Password" name="password" value={userDetails.password} required minLength={8}/>
                <input className="inp" type="number" onChange={handleInput} placeholder="Enter Age" name="age"value={userDetails.age} required/>

                <button className="btn">Register</button>

                <p>Already Registered? <Link to="/login"> Login</Link></p>

                <p className={message.type}>{message.text}</p>
            
            </form>
        </section>
    )
}