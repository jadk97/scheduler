import React from "react";
import "components/InterviewerListItem.scss";
import classNames from 'classnames/bind';




export default function InterviewerListItem(props) {
  const interviewers = classNames("li", {
    "interviewers__item": props,
    "interviewers__item--selected": props.selected,
    "interviewers__item-image": props.avatar,

 });
 
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
