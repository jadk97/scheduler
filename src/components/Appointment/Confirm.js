import Button from "components/Button";
import React from "react";

// Initializes that component that renders a confirm box before allowing the user to cancel an appointment
export default function Confirm(props) {
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <Button danger onClick = {props.onCancel}>Cancel</Button>
        <Button danger onClick = {props.onConfirm}>Confirm</Button>
      </section>
    </main>
  );
}