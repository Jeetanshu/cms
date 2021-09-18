const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./router/user.js');
const adminRoutes = require('./router/admin.js');

const app = express();

app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser : true, useUnifiedTopology : true, 'useFindAndModify' : false})
    .then(() => app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)))
    .catch((error) => console.log(error.message));