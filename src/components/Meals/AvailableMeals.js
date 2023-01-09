import { useEffect, useState } from "react";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import Loader from "../UI/Loader";
import { getMeals } from "../../utils/api";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
   const [meals, setMeals] = useState([]);
   const [error, setError] = useState();
   const [isLoading, setIsLoading] = useState(true);

   const fetchMealsHandler = async () => {
      try {
         const data = await getMeals();
         setIsLoading(false);

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
   }, []);

   const mealsList = meals.map((meal) => (
      <MealItem
         id={meal.id}
         key={meal.id}
         name={meal.name}
         description={meal.description}
         price={meal.price}
      />
   ));

   const errorMsg = <p>AN ERROR OCCURED!</p>;

   return (
      <section className={classes.meals}>
         {error ? (
            errorMsg
         ) : isLoading ? (
            <Loader />
         ) : (
            <Card>
               <ul>{mealsList}</ul>
            </Card>
         )}
      </section>
   );
};

export default AvailableMeals;
