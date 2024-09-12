//importing modules
const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const User_Event = db.user_event;

const joinEventAsParticipant = async (req, res) => {
  try {
    const { user_id, event_id } = req.params;
    const dataUserEvent = {
      user_id,
      event_id,
    };
    const userEvent = await User_Event.create(dataUserEvent);
    if (userEvent) {
      console.log("userEvent", JSON.stringify(userEvent, null, 2));
      return res.status(201).send(userEvent);
    } else {
      return res.status(404).send("404 Not Found");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
    joinEventAsParticipant,
  };
  
