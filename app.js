const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/db');
const userRoute = require('./routes/UserRoute');
const movieRoute = require('./routes/MovieRoute');
const ticketRoute = require('./routes/TicketRoute');
const commentRoute = require('./routes/CusCommentRoute');
const contact = require('./routes/ContactRoute');
const bookticketRoute = require('./routes/BookTicketRoute');
const cors = require('cors');
const path = require('path');
// const publicDir = path.join(__dirname, 'public');

// const mongoose = require('mongoose');
// const router = require('./routes/customerRoute');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'image')));
app.use(cors());
app.use(userRoute);
app.use(movieRoute);
app.use(ticketRoute);
app.use(commentRoute);
app.use(contact);
app.use(bookticketRoute);

app.listen(90);
