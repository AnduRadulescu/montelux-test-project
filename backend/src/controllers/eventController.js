//importing modules
const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Assigning event to the variable event
const Event = db.event;
const User = db.users;

const getAllEvents = async (req, res) => {
  try {
    const eventsWithParticipants = await Event.findAll({
      include: {
        model: User, // Include associated User model
        attributes: ["username", "email"], // Specify attributes to include for users
        through: {
          attributes: [], // Optionally exclude attributes from the join table
        },
      },
    });

    return res.status(200).send(eventsWithParticipants);
  } catch (error) {
    console.log(error);
  }
};

// get all events with specific title
const getEventsByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const events = await Event.findAll({
      where: {
        title: title,
      },
    });
    if (events) {
      return res.status(200).send(events);
    } else {
      return res.status(404).send("404 Not Found");
    }
  } catch (error) {
    console.log(error);
  }
};

//get all events with specific location and date range
const getEventsByLocationAndDate = async (req, res) => {
  try {
    const { location, startDate, endDate } = req.body;
    const events = await Event.findAll({
      where: {
        location: location,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    if (events) {
      return res.status(200).send(events);
    } else {
      return res.status(404).send("404 Not Found");
    }
  } catch (error) {
    console.log(error);
  }
};

const createEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    const dataEvent = {
      title,
      description,
      date,
      location,
    };
    const event = await Event.create(dataEvent);
    if (event) {
      console.log("event", JSON.stringify(event, null, 2));
      return res.status(201).send(event);
    } else {
      return res.status(404).send("404 Not Found");
    }
  } catch (error) {
    console.log(error);
  }
};

const updateEvent = async (req, res) => {
  try {
    const { event_id } = req.params;
    const { title, description, date, location } = req.body;
    const updatedEventId = await Event.update(
      {
        title,
        description,
        date,
        location,
      },
      {
        where: {
          event_id: event_id,
        },
      }
    );
    const event = await Event.findOne({
      where: {
        event_id: event_id,
      },
    });
    if (event) {
      return res.status(200).send(event);
    } else {
      return res.status(404).send("404 Not Found");
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { event_id } = req.params;
    const event = await Event.destroy({
      where: {
        event_id: event_id,
      },
    });
    if (event) {
      return res.status(200).send("Event has been deleted");
    } else {
      return res.status(404).send("404 Not Found");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllEvents,
  getEventsByTitle,
  getEventsByLocationAndDate,
  createEvent,
  updateEvent,
  deleteEvent,
};
