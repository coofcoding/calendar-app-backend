
const express = require('express');
require('dotenv').config();

// Create the express server

const app = express();

// Public directory
app.use( express.static('public') );

// Routes
app.use('/api/auth', require('./routes/auth'));

// Listening queries
app.listen( process.env.PORT , () => {
    console.log(`servidor corriendo en puerto ${ process.env.PORT }`)
});
