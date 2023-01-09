export const getMeals = async () => {
   const response = await fetch(
      "https://food-order-1cdae-default-rtdb.firebaseio.com/meals.json"
   );
   const data = await response.json();
   return data;
};
