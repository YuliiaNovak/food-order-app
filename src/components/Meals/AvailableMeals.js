import { useEffect, useState } from "react";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
   const [meals, setMeals] = useState([]);
   const [error, setError] = useState();

   const fetchMealsHandler = async () => {
      try {
         const response = await fetch(
            "https://food-order-1cdae-default-rtdb.firebaseio.com/meals.json"
         );
         const data = await response.json();
         const loadedMeals = [];
         for (const key in data) {
            loadedMeals.push({
               id: key,
               name: data[key].name,
               description: data[key].description,
               price: data[key].price,
            });
         }
         setMeals(loadedMeals);
      } catch (error) {
         return setError(error);
      }
   };

   useEffect(() => {
      fetchMealsHandler();
   }, [meals]);

   const mealsList = meals.map((meal) => (
      <MealItem
         id={meal.id}
         key={meal.id}
         name={meal.name}
         description={meal.description}
         price={meal.price}
      />
   ));

   return (
      <>
         <section className={classes.meals}>
            {error ? (
               <p>AN ERROR OCCURED!</p>
            ) : (
               <Card>
                  <ul>{mealsList}</ul>
               </Card>
            )}
         </section>
      </>
   );
};

export default AvailableMeals;
