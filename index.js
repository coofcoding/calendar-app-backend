
const express = require('express');

// Create the express server

const app = express();

// Public directory
app.use( express.static('public') );

// Routes
// app.get('/', (req, res) => {

//     res.json({
//         ok: true
//     })

// })

// Listening queries
app.listen(7777, () => {
    console.log(`servidor corriendo en puerto ${7777}`)
});
