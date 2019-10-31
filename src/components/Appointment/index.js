import React, { useState } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING"


export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY,
    // props.onAdd.onClick()
    // props.onAdd = transition(CREATE)
  );
  // props.interviewers = [];


  async function save(name, interviewer){
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    
    await props.bookInterview(props.id, interview)
    transition(SHOW);
    
   
    // return interview;
  }

  return (

    <article className="appointment">
      <Header time={props.time}>

      </Header>
      {mode === EMPTY && <Empty onAdd={() => {transition(CREATE)}}/>}
      {mode === CREATE && <Form interviewers = {props.interviewers} onSave = {save} bookInterview = {props.bookInterview} />}
      {mode === SAVING && <Status/>}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
    </article>



  );
}