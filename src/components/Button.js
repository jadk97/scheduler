import React from "react";
import "components/Button.scss";
import classNames from 'classnames/bind';

// initializes the "Cancel" and "Save" buttons used in the Form component and the "Cancel" and "Confirm" buttons in the Confirm component
export default function Button(props) {

   const buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
   });

   return (
      <button
         className={buttonClass}
         onClick={props.onClick}
         disabled={props.disabled}
      >
         {props.children}
      </button>
   );
}
 