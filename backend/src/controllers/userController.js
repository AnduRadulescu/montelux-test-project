//importing modules
const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Assigning users to the variable User
const User = db.users;

//signing a user up
//hashing users password before its saved to the database with bcrypt
const signup = async (req, res) => {
  try {
    //create the user
    const { username, email, password } = req.body;
    const dataUser = {
      username,
      email,
      password: await bcrypt.hash(password, 10),
    };
    //saving the user
    const user = await User.create(dataUser);
    if (user) {
      console.log("user", JSON.stringify(user, null, 2));
      //send users details
      return res.status(201).send(user);
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    //if user is found compare password with bcrypt
    if (user) {
      const compare = await bcrypt.compare(password, user.password);
      if (compare) {
        let token = jwt.sign({ id: user.id }, process.env.secretKey, {
          expiresIn: "1d",
        });

        res.cookie("jwt", token, { httpOnly: true, maxAge: 1 * 24 * 60 * 60 });
        console.log("user", JSON.stringify(user, null, 2));
        console.log(token);
        //send users details
        return res.status(201).send(user);
      } else {
        return res.status(400).json({
          errorMessage: "Authentication failed because password is incorrect",
        });
      }
    } else {
      return res.status(404).json({
        errorMessage:
          "Authentication failed because we could not find the user",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//logout user
const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    return res.status(200).json("User logged out");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signup,
  login,
  logout,
};
