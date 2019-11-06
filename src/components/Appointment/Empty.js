import React from "react";

//Initializes the component that displays an empty appointment slot
//Once it's been clicked, the Form component is then displayed and allows the user to input all the requisite information to set up an appointment
export default function Empty(props){
  return(<main className="appointment__add">
  <img
    className="appointment__add-button"
    src="images/add.png"
    alt="Add"
    onClick = {props.onAdd}
  />
</main>
);
}