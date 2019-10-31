import React, { useReducer, useEffect } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

export default function useApplicationData() {
  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewer: {}
  };

  const [state, dispatch] = useReducer(reducer, initialState);



  const setDay = day => dispatch({ type: SET_DAY, day });

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.day };
      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers
        };
      case SET_INTERVIEW: {
        // return {
          const appointment = {
            ...state.appointments[action.id],
            interview: { ...action.interview }
          };
          
          const appointments = {
            ...state.appointments,
            [action.id]: appointment
          };
          return {
            ...state, appointments
          }
          // ...state,
          // id: action.id,
          // interview: action.interview
        // };
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }



  // const setDay = day => dispatch({ type: SET_DAY, day });

  function bookInterview(id, interview) {
    console.log(id, interview);
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview });
      });
  }

  function cancelInterview(id, interview) {
    console.log(interview);

    // interview = null;
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview: null });
      });
  }

  useEffect(() => {

    Promise.all([Promise.resolve(axios.get("/api/days")), Promise.resolve(axios.get("/api/appointments")), Promise.resolve(axios.get("/api/interviewers"))])
      .then((all) => {
        // console.log(all[2].data);
        // setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
        // console.log(all[1].data);
        dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data });
      });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}