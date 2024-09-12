import React from "react";
import "./event-style.css";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

const Event = ({
  title,
  description,
  date,
  location,
  participants,
  onEdit,
  onJoinEvent,
  onDelete,
}) => {
  const filteredParticipants = participants?.map((user) => {
    return user.username;
  });

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Delete this event
    </Tooltip>
  );

  return (
    <div className="event bg-light position-relative">
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        <Button
          variant="danger"
          size="sm"
          className="position-absolute top-0 end-0 m-2 z-3"
          onClick={onDelete}
        >
          &times;
        </Button>
      </OverlayTrigger>

      <div
        onClick={() => {
          onEdit();
        }}
      >
        <h3>{title}</h3>
        <p>{description}</p>
        <p>
          <strong>Date:</strong> {date}
        </p>
        <p>
          <strong>Location:</strong> {location}
        </p>
        <p>
          <strong>Participants:</strong> {filteredParticipants?.join(", ")}
        </p>
      </div>
      <Button
        variant="success"
        size="sm"
        className="position-absolute bottom-0 end-0 m-2 z-3"
        onClick={onJoinEvent}
      >
        Join +
      </Button>
    </div>
  );
};

export default Event;
