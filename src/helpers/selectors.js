export function getAppointmentsForDay(state, day){
  let filteredAppointments = state.days.filter(d => d.name === day);
  let result = [];
  if(filteredAppointments.length > 0){
    filteredAppointments = filteredAppointments[0].appointments;
    for (let states in filteredAppointments){
      result.push(state.appointments[filteredAppointments[states]])
    }
    return result;
  }
  else{
    return [];
  }
}

export function getInterview(state, interview){
  let result = {};
  if(interview){
    for (let items in state.interviewers){
      result["interviewer"] = state.interviewers[items];
    }
    result.student = interview.student;
    return result;
  }
  else {
    return null;
  }
}