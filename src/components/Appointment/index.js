import React, { useState } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY,

  );


  function save(name, interviewer) {
    transition(SAVING, true);
    const interview = {
      student: name,
      interviewer
    };
    
    props.bookInterview(props.id, interview).then(() => transition(SHOW)).catch(error => transition(ERROR_SAVE, true));



  }

  function deleteInterview (name, interviewer){
    
    transition(DELETING, true)
    const interview = {
      student: name,
      interviewer
    }

    props.cancelInterview(props.id, interview).then(() => transition(EMPTY)).catch(error => transition(ERROR_DELETE, true));
  }

 
  return (

    <article className="appointment" data-testid="appointment" >
      <Header time={props.time}>

      </Header>
      {mode === EMPTY && <Empty onAdd={() => { transition(CREATE, true) }} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel = {() => {back()}} bookInterview={props.bookInterview} />}
      {mode === EDIT && <Form interviewers={props.interviewers} onSave={save} onCancel = {() => {back()}} bookInterview={props.bookInterview} name = {props.interview.student} interviewer = {props.interview.interviewer.id}/>} 
      {mode === SAVING && <Status message = "Saving" />}
      {mode === ERROR_SAVE && <Error message = "Couldn't save your appointment" onClose = {() => {back()}} />}
      {mode === ERROR_DELETE && <Error message = "Couldn't cancel your appointment" onClose = {() => {back()}} />}
      {mode === DELETING && <Status message = "Deleting" />}
      {mode === CONFIRM && <Confirm message = "Are you sure you want to delete this?" onConfirm = {deleteInterview} onCancel = {() => {back()}}/>}
      {mode === SHOW  && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete = {() => { transition(CONFIRM, true) }}
          onEdit = {() => transition(EDIT)}
        />
      )}
    </article>



  );
}