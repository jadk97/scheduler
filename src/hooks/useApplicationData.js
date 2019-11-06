import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW, SET_SPOTS } from "reducers/application";


// Initializes the default state and handles the changes in state from component to component
// any changes are committed through the application.js in the reducers directory, where the state is updated accordingly
export default function useApplicationData() {

  //sets the default state
  const [state, dispatch] = useReducer(reducer,
    {
      day: "Monday",
      days: [],
      appointments: {},
      interviewer: {}
    });

  // makes a get request to the server to fetch all of the currently booked appointments and interviewers available on each day
  useEffect(() => {

    Promise.all([Promise.resolve(axios.get("/api/days")), Promise.resolve(axios.get("/api/appointments")), Promise.resolve(axios.get("/api/interviewers"))])
      .then((all) => {
        dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data });
      });
  }, []);

  const setDay = day => dispatch({ type: SET_DAY, day });

  function getDayFromAppointment(id) {
    let dayId = 0;
    for (let i = 0; i <= 25; i += 5) {
      if (i < id) {
        dayId++
      } else {
        return dayId
      }
    }
  }

  // This triggers once a user has decided to save an appointment and updates the number of spots passed into the DayList component at the selected day accordingly
  // Makes a put request to the database containing the list of booked appointments in the process

  function bookInterview(id, interview) {
    const dayId = getDayFromAppointment(id);

    let spots;
    if (!state.appointments[id].interview) {
      spots = state.days[dayId - 1].spots - 1;
    } else {
      spots = state.days[dayId - 1].spots;
    }


    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    let days = state.days.map((item, index) => {
      if (index !== dayId - 1) {
        return item
      }
      return {
        ...item,
        spots
      }
    })

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => dispatch({ type: SET_INTERVIEW, appointments }))
      .then(() => dispatch({ type: SET_SPOTS, days }))

  }

  // Triggers once a user decides to cancel an appointment, and updates the number of spots passed into the DayList component at the selected day accordingly
  // Makes a delete request to the database containing the list of all booked appointments in the process
  function cancelInterview(id) {
    const dayId = getDayFromAppointment(id);
    let spots = state.days[dayId - 1].spots + 1;

    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    let days = state.days.map((item, index) => {
      if (index !== dayId - 1) {
        return item
      }
      return {
        ...item,
        spots
      }
    })

    return axios.delete(`/api/appointments/${id}`)
      .then(() => dispatch({ type: SET_INTERVIEW, appointments }))
      .then(() => dispatch({ type: SET_SPOTS, days }))
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}