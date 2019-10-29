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