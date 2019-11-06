import React from "react";
import "components/DayListItem.scss";
import classNames from 'classnames/bind';


export default function DayListItem(props) {
  const dayClass = classNames("li", {
    "day-list__item": props,
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots 
 });
 function formatSpots(props){
   if(props > 1){
     return `${props} spots remaining`;
   }
   else if (props === 1){
     return `${props} spot remaining`;
   }
   else {
     return "no spots remaining";
   }
 }
 
  return (
    <li className ={dayClass} data-testid="day" onClick = {() => props.setDay(props.name)}>  
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
