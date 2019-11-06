import React from "react";
import DayListItem from "components/DayListItem";

//Initializes a list containing the days of the week and the number of spots available on each day
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

