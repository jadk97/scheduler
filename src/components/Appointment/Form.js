import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import React, { useState } from "react";

//Initializes a form that takes in 2 required inputs: A student name, and an interviewer from the list of interviewers available for the day
//The user is then able to either save the appointment, which will transition to the Show component once it's been successfully saved and display the booked appointment
//or cancel the appointment which will revert back to the default Empty component

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  //resets the name field
  function reset() {
    setName("");
    setInterviewer(null);
  }
  //resets the entire Form component and reverts back to the Empty component
  function cancel() {
    reset();
    props.onCancel();
  }

  //ensures that the user has typed in a name and selected an interviewer before being able to save their appointment
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    if(!interviewer){
      setError("Please select an interviewer");
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  }
  
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={event => {
              setName(event.target.value);
            }}
            data-testid="student-name-input"
          />
        <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => { validate() }}>Save</Button>
        </section>
      </section>
    </main>

  );
}