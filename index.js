
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

// Create the express server

const app = express();

// Database
dbConnection();

// CORS
app.use(cors());

// Public directory
app.use( express.static('public') );

// Lecture and body parse
app.use( express.json() );

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// Listening queries
app.listen( process.env.PORT , () => {
    console.log('\x1b[33m▬▬▬ι═══════ﺤ / ▬▬▬ι═══════ﺤ / ▬▬▬ι═══════ﺤ / ▬▬▬ι═══════ﺤ\x1b[0m')
    console.log('')
    console.log(`\x1b[36mservidor corriendo en puerto ${ process.env.PORT }`)
});
