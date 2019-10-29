import React from "react";
// import ReactDOM from "react-dom";
import DayListItem from "components/DayListItem";
// const list = days[0];

export default function DayList(props) {
  const list = props.days.map(day => {
    return (
        <DayListItem
          key={day.id}
          name={day.name}
          spots={day.spots}
          selected={day.name === props.day}
          setDay={props.setDay} />
    );
  });
  return (
    <ul>
      {list}
    </ul>
  )
}

// ReactDOM.render(
//   <DayList day = {day} />,
//    document.getElementsByName("root")
// );