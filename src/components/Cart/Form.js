import { useRef, useState } from "react";
import classes from "./Form.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Form = (props) => {
   const [formInputsValidity, setFormInputsValidity] = useState({
      name: true,
      city: true,
      street: true,
      postalCode: true,
   });

   const nameRef = useRef();
   const cityRef = useRef();
   const streetRef = useRef();
   const postalRef = useRef();

   const confirmHandler = (e) => {
      e.preventDefault();

      const enteredName = nameRef.current.value;
      const enteredCity = cityRef.current.value;
      const enteredStreet = streetRef.current.value;
      const enteredPostal = postalRef.current.value;

      const enteredNameIsValid = !isEmpty(enteredName);
      const enteredCityIsValid = !isEmpty(enteredCity);
      const enteredStreetIsValid = !isEmpty(enteredStreet);
      const enteredPostalIsValid = isFiveChars(enteredPostal);

      setFormInputsValidity({
         name: enteredNameIsValid,
         city: enteredCityIsValid,
         street: enteredStreetIsValid,
         postalCode: enteredPostalIsValid,
      });

      const formIsValid =
         enteredNameIsValid &&
         enteredCityIsValid &&
         enteredStreetIsValid &&
         enteredPostalIsValid;

      if (!formIsValid) {
         return;
      }

      props.onConfirm({
         name: enteredName,
         city: enteredCity,
         street: enteredStreet,
         postalCode: enteredPostal,
      });
   };

   const nameControlClasses = `${classes.control} ${
      formInputsValidity.name ? "" : classes.invalid
   }`;
   const cityControlClasses = `${classes.control} ${
      formInputsValidity.city ? "" : classes.invalid
   }`;
   const streetControlClasses = `${classes.control} ${
      formInputsValidity.street ? "" : classes.invalid
   }`;
   const postalControlClasses = `${classes.control} ${
      formInputsValidity.postalCode ? "" : classes.invalid
   }`;

   return (
      <form className={classes.form} onSubmit={confirmHandler}>
         <div className={nameControlClasses}>
            <label htmlFor="name">Your Name</label>
            <input ref={nameRef} type="text" id="name" />
            {!formInputsValidity.name && <p>Please enter a valid name!</p>}
         </div>
         <div className={cityControlClasses}>
            <label htmlFor="city">City</label>
            <input ref={cityRef} type="text" id="city" />
            {!formInputsValidity.city && <p>Please enter a valid city!</p>}
         </div>
         <div className={streetControlClasses}>
            <label htmlFor="street">Street</label>
            <input ref={streetRef} type="text" id="street" />
            {!formInputsValidity.street && <p>Please enter a valid street!</p>}
         </div>
         <div className={postalControlClasses}>
            <label htmlFor="postal">Postal Code</label>
            <input ref={postalRef} type="text" id="postal" />
            {!formInputsValidity.postalCode && (
               <p>Please enter a valid postal code (5 charachters long)!</p>
            )}
         </div>
         <div className={classes.actions}>
            <button type="button" onClick={props.onCancel}>
               Cancel
            </button>
            <button className={classes.submit}>Confirm</button>
         </div>
      </form>
   );
};

export default Form;
