export function getAppointmentsForDay(state, day) {
  let filteredAppointments = state.days.filter(d => d.name === day);
  let result = [];
  if (filteredAppointments.length > 0) {
    filteredAppointments = filteredAppointments[0].appointments;
    for (let states in filteredAppointments) {
      result.push(state.appointments[filteredAppointments[states]])
    }
    return result;
  }
  else {
    return [];
  }
}

export function getInterviewersForDay(state, day) {
  const result = [];
  const filteredDay = state.days.filter(days => days.name === day);
  if(filteredDay.length > 0) {
    filteredDay[0].interviewers.forEach(interviewer => {
      if(state.interviewers[interviewer]) {
        result.push(state.interviewers[interviewer])
      }
    });
  }
  // console.log(result)
  return result;
}


export function getInterview(state, interview) {
  // console.log(interview)
  // let result = {};
  if (interview) {
    // console.log(interview.interviewer)
    // console.log(state.interviewers[interview.interviewer])
    const result = {
      interviewer:state.interviewers[interview.interviewer],
      student: interview.student
    }
    return result;
  }
  else {
    return null;
  }
}