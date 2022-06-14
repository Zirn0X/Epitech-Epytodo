const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser')
app.use(bodyParser.json());
require('dotenv').config();

require('./routes/auth/auth')(app, bcrypt);

require('./routes/user/user')(app);
require('./routes/todos/todos')(app);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ` + process.env.PORT);
})