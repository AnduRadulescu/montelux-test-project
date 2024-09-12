// import "../../style.css";
import { useContext, useEffect, useState } from "react";
import axios from "../../services/jwtGlobalHandler";
import { useNavigate } from "react-router-dom";
import { GlobalServiceContext } from "../../services/GlobalServiceContext";
import Event from "./Event";
import AddEventModal from "./AddEventModal";
import "./event-style.css";
import { Button } from "react-bootstrap";

axios.defaults.withCredentials = true;

function EventManagement() {
  const navigate = useNavigate();
  const [searchTitle, setSearchTitle] = useState("");
  const [searchStartDate, setSearchStartDate] = useState("");
  const [searchEndDate, setSearchEndDate] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalInputData, setModalInputData] = useState("");
  const [events, setEvents] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const { currentUser } = useContext(GlobalServiceContext);

  function handleShow() {
    setShowModal(true);
  }
  function handleClose() {
    setShowModal(false);
  }

  function handleAddModal() {
    setIsUpdate(false);
    handleShow();
    setModalInputData();
  }

  function handleEditModal(event) {
    setIsUpdate(true);
    handleShow();
    setModalInputData(event);
  }

  useEffect(() => {
    getAllEvents();
  }, []);

  function getAllEvents() {
    axios
      .get("http://localhost:3000/api/event/getAllEvents")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function logout() {
    axios
      .post("http://localhost:3000/api/users/logout")
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log("Log Out ", error);
      });
  }

  // const filteredEvents = events.filter((event) =>
  //   event?.title?.toLowerCase().includes(searchTitle.toLowerCase())
  // );

  function handleAddEvent(eventData) {
    const data = {
      title: eventData.title,
      description: eventData.description,
      date: eventData.date,
      location: eventData.location,
    };

    axios
      .post("http://localhost:3000/api/event/createEvent", data)
      .then((response) => {
        // add event to the screen
        setEvents([...events, response.data]);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleUpdateEvent(eventData) {
    const data = {
      title: eventData.title,
      description: eventData.description,
      date: eventData.date,
      location: eventData.location,
    };
    axios
      .put(`http://localhost:3000/api/event/updateEvent/${eventData.id}`, data)
      .then((response) => {
        setEvents(
          events.map((event) =>
            event.event_id === response.data.event_id ? response.data : event
          )
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleJoinEvent(eventData) {
    axios
      .post(
        `http://localhost:3000/api/user_event/joinEvent/${currentUser.user_id}/${eventData?.event_id}`
      )
      .then((response) => {
        axios
          .get("http://localhost:3000/api/event/getAllEvents")
          .then((response) => {
            setEvents(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleDeleteEvent(eventData) {
    axios
      .delete(
        `http://localhost:3000/api/event/deleteEvent/${eventData?.event_id}`
      )
      .then((response) => {
        // update the view to remove the event
        getAllEvents();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function onSearchByTitle() {
    // search for events by title
    if(searchTitle === "") {
      getAllEvents();
      return;
    }
    axios
      .get(`http://localhost:3000/api/event/getEventsByTitle/${searchTitle}`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function onSearchLocationAndStartEndDate() {
    // search for events
    if(searchLocation === "" && searchStartDate ==="" && searchEndDate === "") {
      getAllEvents();
      return;
    }
    axios
      .get(`http://localhost:3000/api/event/getEventsByLocationAndDate/${searchLocation}/${searchStartDate}/${searchEndDate}`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    //create button for logoutd
    <div>
      <div className="d-flex justify-content-end">
        <button className="btn btn-danger m-2" onClick={logout}>
          Logout!
        </button>

        <button
          className="btn btn-success m-2"
          onClick={() => {
            handleAddModal();
          }}
        >
          Add Event
        </button>
      </div>

      <AddEventModal
        show={showModal}
        handleClose={handleClose}
        handleAddEvent={handleAddEvent}
        handleUpdateEvent={handleUpdateEvent}
        eventInputData={modalInputData}
        isUpdateModal={isUpdate}
      />

      <div>
        <h1 className="d-flex justify-content-center">Upcoming Events</h1>
        <div className="d-flex justify-content-around flex-column align-items-center">
          <div className="d-flex justify-content-around mb-2">
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTitle}
              className="form-control me-2"
              onChange={(e) => setSearchTitle(e.target.value)}
            />
            <Button
              variant="btn btn-primary"
              size="sm"
              onClick={onSearchByTitle}
            >
              Search
            </Button>
          </div>

          <div className="d-flex justify-content-around">
            <input
              type="date"
              placeholder="Start date..."
              value={searchStartDate}
              className="form-control me-2"
              onChange={(e) => setSearchStartDate(e.target.value)}
            />

            <input
              type="date"
              placeholder="End date..."
              value={searchEndDate}
              className="form-control me-2"
              onChange={(e) => setSearchEndDate(e.target.value)}
            />

            <input
              type="text"
              placeholder="Search by location..."
              value={searchLocation}
              className="form-control me-2"
              onChange={(e) => setSearchLocation(e.target.value)}
            />
            <Button variant="primary" size="sm" onClick={onSearchLocationAndStartEndDate}>
              Search
            </Button>
          </div>
          {/* Map over the events array and render an Event component for each event */}
          {events.map((event, index) => (
            <div className="event-management" key={index}>
              <Event
                title={event.title}
                description={event.description}
                date={event.date}
                location={event.location}
                participants={event.users}
                onEdit={() => handleEditModal(event)}
                onJoinEvent={() => handleJoinEvent(event)}
                onDelete={() => handleDeleteEvent(event)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventManagement;
