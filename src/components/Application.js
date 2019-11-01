import React from "react";
import DayList from "components/DayList"

import "components/Application.scss";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterviewersForDay } from "helpers/selectors";
import { getInterview } from "helpers/selectors";
import useApplicationData from "../hooks/useApplicationData";




export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  } = useApplicationData();


  let appointments = getAppointmentsForDay(state, state.day);
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
            spots = {state.days.spots}
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
           
            const interview = getInterview(state, appointment.interview);
            let interviewers = getInterviewersForDay(state, state.day);
            
    
            return (
              <Appointment
                key={appointment.id}
                id={appointment.id}
                time={appointment.time}
                interview={interview}
                interviewers={interviewers}
                bookInterview={bookInterview}
                cancelInterview={cancelInterview}
              />
            );
          })}
        <Appointment key="last" time="5pm" />

      </section>
    </main>
  );
}
