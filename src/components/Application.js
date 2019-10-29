import React, { useState, useEffect } from "react";
import DayList from "components/DayList"
import axios from "axios";
import "components/Application.scss";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   }
// ];



export default function Application(props) {
  // const [days, setDay] = useState([]);


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));
  ;

  // Promise.all([ Promise.resolve(axios.get("/api/days")), Promise.resolve(axios.get("/api/appointments")), Promise.resolve("third"),
  // ])
  // .then((all) => {
  //     setState(prev => ({ first: all[0], second: all[1], third: all[2] }));
  //   console.log(all[0].data); // first
  //   console.log(all[1].data); // second
  //   console.log(all[2]); // third

  //   // const [first, second, third] = all;

  //   // console.log(first, second, third);
  // });

  useEffect(() => {

    Promise.all([Promise.resolve(axios.get("/api/days")), Promise.resolve(axios.get("/api/appointments"))
    ])
      .then((all) => {

        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data }));


        //  console.log(fgdsds);
        // console.log(all[0].data); // first
        // console.log(all[1].data); // second
        // console.log(all[2]); // third

        // const [first, second, third] = all;

        // console.log(first, second, third);
      });
  }, []);
  // console.log(getAppointmentsForDay(state, state.day));
  let appointments = getAppointmentsForDay(state, state.day);
  console.log(state);
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            key={state.days.id}
            days={state.days}
            day={state.days.name}
            setDay={setDay}
          />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">

        {
  appointments.map(appointment => {
    return (
      <Appointment key={appointment.id} {...appointment} />
    );
  })}
  <Appointment key="last" time="5pm" />

      </section>
    </main>
  );
}
