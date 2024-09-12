//importing modules
const express = require('express')
const sequelize = require('sequelize')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const db = require('../backend/src/models')
const userRoutes = require ('../backend/src/routes/userRoute')
const eventRoutes = require ('../backend/src/routes/eventRoute')
const userEventRoutes = require ('../backend/src/routes/user_eventRoute')
const cors = require('cors');

//setting up port
const PORT = process.env.PORT || 3000;
// assigning express to app
const app = express();
app.use(cors({
    origin: "http://localhost:3001",
    credentials: true
}
));
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync({ force: false }).then(() => {
    console.log("db has been re sync")
})

//routes for the user API
app.use('/api/users', userRoutes)
app.use('/api/event', eventRoutes)
app.use('/api/user_event', userEventRoutes)

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });