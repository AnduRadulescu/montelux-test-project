import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddEventModal = ({
  show,
  handleClose,
  handleAddEvent,
  handleUpdateEvent,
  eventInputData,
  isUpdateModal,
}) => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  // useEffect to populate the form with eventInputData when it changes
  useEffect(() => {
    setId(eventInputData?.event_id || ""); // Populate id
    setTitle(eventInputData?.title || ""); // Populate title
    setDescription(eventInputData?.description || ""); // Populate description
    setDate(eventInputData?.date || new Date().toISOString().split("T")[0]); // Populate date
    setLocation(eventInputData?.location || ""); // Populate location
  }, [eventInputData]);

  function handleUpdateSubmit() {
    handleUpdateEvent({ id, title, description, date, location });
    handleModalClose();
  }

  function handleAddSubmit() {
    if(new Date(date) < new Date()) {
      setError("Date must be in the future");
      return;
    }
    setError("");
    handleAddEvent({ title, description, date, location });
    handleModalClose();
  }

  function handleModalClose() {
    // Reset form fields when closing
    setTitle("");
    setDescription("");
    setDate(new Date().toISOString().split("T")[0]);
    setLocation("");
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isUpdateModal ? "Update Event" : "Add Event"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              placeholder="Enter date"
              onChange={(e) => setDate(e.target.value)}
              isInvalid={!!error}
            />
          </Form.Group>
          {/* Inline error message */}
          <p style={{ color: "red" }}>{!!error? error : ''}</p>
          <Form.Group controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Close
        </Button>
        <div>
          {isUpdateModal ? (
            <Button variant="primary" onClick={handleUpdateSubmit}>
              Update Event
            </Button>
          ) : (
            <Button variant="primary" onClick={handleAddSubmit}>
              Add Event
            </Button>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEventModal;
