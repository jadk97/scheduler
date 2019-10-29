import React from "react";
import "components/InterviewerListItem.scss";
import classNames from 'classnames/bind';


// import { format } from "path";

export default function InterviewerListItem(props) {
  const interviewers = classNames("li", {
    "interviewers__item": props,
    "interviewers__item--selected": props.selected,
    "interviewers__item-image": props.avatar,

 });
//  function formatSpots(props){
//    if(props > 1){
//      return `${props} spots remaining`;
//    }
//    else if (props === 1){
//      return `${props} spot remaining`;
//    }
//    else {
//      return "no spots remaining";
//    }
//  }
 
  return (
<li className={interviewers} onClick={props.setInterviewer}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
    {props.selected && props.name}
  </li>
  );
}
