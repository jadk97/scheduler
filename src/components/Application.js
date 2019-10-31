import React, { useState, useEffect } from "react";
import DayList from "components/DayList"

import "components/Application.scss";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterviewersForDay } from "helpers/selectors";
import { getInterview } from "helpers/selectors";
import useApplicationData from "../hooks/useApplicationData";
// import { getInterviewersForDay}



export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  // const [days, setDay] = useState([]);
  // function bookInterview(id, interview) {
  //   // // console.log(id, interview);
  //   // const appointment = {
  //   //   ...state.appointments[id],
  //   //   interview: { ...interview }
  //   // };
    
  //   // const appointments = {
  //   //   ...state.appointments,
  //   //   [id]: appointment
  //   // };
 
  //   return axios.put(`/api/appointments/${id}`, {interview})
  //   .then( () => 
  //   setState(state => {
  //     const appointment = {
  //       ...state.appointments[id],
  //       interview: { ...interview }
  //     };
      
  //     const appointments = {
  //       ...state.appointments,
  //       [id]: appointment
  //     };
  //     return ({
  //     ...state,
  //     appointments
  //   })}
  //   )
  // );   
  // }
  
  // function cancelInterview(id, interview){
  //   console.log(interview);

  //   // interview = null;
  //   return axios.delete(`/api/appointments/${id}`)
  //   .then( () => 
  //     setState(state => {
  //       const appointment = {
  //         ...state.appointments[id],
  //         interview: null
  //       };
        
  //       const appointments = {
  //         ...state.appointments,
  //         [id]: appointment
  //       };
  //       return ({
  //       ...state,
  //       appointments
  //     })}
  //     )

  //   );  
  // }
  

  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // });

  // const setDay = day => setState({ ...state, day });
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

  // useEffect(() => {

  //   Promise.all([  Promise.resolve(axios.get("/api/days")) , Promise.resolve(axios.get("/api/appointments")) , Promise.resolve(axios.get("/api/interviewers")) ])
  //     .then((all) => {
  //       // console.log(all[2].data);
  //       setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
  //     });
  // }, []);
  let appointments = getAppointmentsForDay(state, state.day);
 
  // console.log(interviewers);
  // console.log(state);
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
            day={state.day}
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
    // console.log(appointment.interview);
    const interview = getInterview(state, appointment.interview);
    let interviewers = getInterviewersForDay(state, state.day);
    // console.log(interview);
    // console.log(interview);
    return (
      <Appointment  
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers = {interviewers}
      bookInterview = {bookInterview} 
      cancelInterview = {cancelInterview}
      />
    );
  })}
  <Appointment key="last" time="5pm" />

      </section>
    </main>
  );
}
