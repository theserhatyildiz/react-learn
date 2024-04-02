export default function FoodData({food})
{
    return(
        
        <div className="food">

                <h2>{food.NameTr} {food.Calorie} kcal</h2>

                <div className="nutrient">
                    <p className="n-title">Pro</p>
                    <p className="n-value">{food.Protein}g</p>
                </div>

                <div className="nutrient">
                    <p className="n-title">Carbs</p>
                    <p className="n-value">{food.Carbohydrate}g</p>
                </div>

                <div className="nutrient">
                    <p className="n-title">Fat</p>
                    <p className="n-value">{food.Fat}g</p>
                </div>

                <div className="nutrient">
                    <p className="n-title">Fiber</p>
                    <p className="n-value">{food.Fiber}g</p>
                </div>

                <input type="number" className="inp-quant" placeholder="Quantity in Grams" />

                <button className="btn-add">Add</button>

        </div>
    )
}