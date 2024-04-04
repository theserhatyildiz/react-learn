import { UserContext } from "../context/UserContext"; 
import { useContext } from "react";
import { useEffect, useState } from "react";
import Header from './Header';

export default function Diet()
{

    // ------------------Variables------------------

    const loggedData = useContext(UserContext);

    const [date,setDate] = useState(new Date());

    const [items,setItems] = useState([]);

    let [total,setTotal] = useState({
        totalCaloreis:0,
        totalProtein:0,
        totalCarbs:0,
        totalFats:0,
        totalFiber:0
    })

    // ------------------Functions------------------

    useEffect(()=>{

    // ------------------Calling the data to API------------------

        fetch(`http://localhost:8000/track/${loggedData.loggedUser.userid}/${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${loggedData.loggedUser.token}`
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            setItems(data);
        })
        .catch((err)=>{
            console.log(err);
        })

    },[date])

    useEffect(()=>{
        calculateTotal();
    },[items])

    function calculateTotal()
    {
        let totalCopy = {
            totalCaloreis:0,
            totalProtein:0,
            totalCarbs:0,
            totalFats:0,
            totalFiber:0
        };

        items.forEach((item)=>{
            totalCopy.totalCaloreis += item.details.Calorie;
            totalCopy.totalProtein += item.details.Protein;
            totalCopy.totalCarbs += item.details.Carbohydrate;
            totalCopy.totalFats += item.details.Fat;
            totalCopy.totalFiber += item.details.Fiber;

        });

        setTotal(totalCopy);
 
    }

    return(
        <section className="container diet-container">

            <Header/>

            <input className="date-box" type="date" onChange={(event)=>{
                     
                     setDate(new Date(event.target.value));
                    
                    }}/>

            <div className="item">

                <h3>  {total.totalCaloreis} Kcal </h3>

                <p>Pro {total.totalProtein}g, Carbs {total.totalCarbs}g, Fats {total.totalFats}g, Fiber {total.totalFiber}g</p>

                </div>   

            {
                items.map((item)=>{

                    return(
                        <div className="item" key={item._id}>

                            <h3>{item.foodId.NameTr}</h3>

                            <h4>{item.quantity}g</h4>

                            <p>{item.details.Calorie} cal: {item.details.Protein}p, {item.details.Carbohydrate}k, {item.details.Fat}y, {item.details.Fiber}lif  </p>

                        </div>
                    )
                })
        }

        </section>
    )
}