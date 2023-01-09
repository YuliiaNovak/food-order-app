import classes from "./Loader.module.css";

const Loader = () => {
   return (
      <div class={classes["lds-ring"]}>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
      </div>
   );
};

export default Loader;
