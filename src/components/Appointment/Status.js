import React from "react";

// Initializes the status component that displays when either transitioning from:
// 1) The Form component to the Show component, when saving
// 2) The Form component to the Empty component when deleting
export default function Status(props) {
  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{props.message}</h1>
    </main>
  );
}