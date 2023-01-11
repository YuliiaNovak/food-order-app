import React, { useContext, useState } from "react";

import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Form from "./Form";
import classes from "./Cart.module.css";

const Cart = (props) => {
   const [formIsOpen, setFromIsOpen] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [didSubmit, setDidSubmit] = useState(false);
   const cartCtx = useContext(CartContext);

   const orderBtnHandler = () => {
      setFromIsOpen(true);
   };

   const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
   const hasItems = cartCtx.items.length > 0;

   const cartItemRemoveHandler = (id) => {
      cartCtx.removeItem(id);
   };
   const cartItemAddHandler = (item) => {
      cartCtx.addItem({ ...item, amount: 1 });
   };

   const submitOrderHandler = async (userData) => {
      setIsSubmitting(true);
      await fetch(
         "https://food-order-1cdae-default-rtdb.firebaseio.com/orders.json",
         {
            method: "POST",
            body: JSON.stringify({
               user: userData,
               orderedItems: cartCtx.items,
            }),
         }
      );
      setIsSubmitting(false);
      setDidSubmit(true);
      cartCtx.clearCart();
   };

   const cartItems = (
      <ul className={classes["cart-items"]}>
         {cartCtx.items.map((item) => (
            <CartItem
               key={item.id}
               name={item.name}
               amount={item.amount}
               price={item.price}
               onRemoveProp={cartItemRemoveHandler.bind(null, item.id)}
               onAddProp={cartItemAddHandler.bind(null, item)}
            ></CartItem>
         ))}
      </ul>
   );
   const modalActions = (
      <div className={classes.actions}>
         <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
         </button>
         {hasItems && (
            <button className={classes.button} onClick={orderBtnHandler}>
               Order
            </button>
         )}
      </div>
   );

   const cartModalContent = (
      <React.Fragment>
         {cartItems}
         <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
         </div>
         {formIsOpen ? (
            <Form onConfirm={submitOrderHandler} onCancel={props.onClose} />
         ) : (
            modalActions
         )}
      </React.Fragment>
   );

   const isSubmittingModalContent = <p>Sending order data...</p>;
   const didSubmitModalContent = (
      <React.Fragment>
         <p>Successfully sent the order!</p>
         <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClose}>
               Close
            </button>
         </div>
      </React.Fragment>
   );

   return (
      <Modal onClose={props.onClose}>
         {!isSubmitting && !didSubmit && cartModalContent}
         {isSubmitting && isSubmittingModalContent}
         {didSubmit && didSubmitModalContent}
      </Modal>
   );
};

export default Cart;
