const mongoose = require('mongoose');

const dbConnection = async () => {
    try {

        await mongoose.connect(process.env.DB_CNN);

        console.log('\x1b[42m\x1b[30mDB Online...\x1b[0m ✔️');
        console.log('')
        console.log('\x1b[33m▬▬▬ι═══════ﺤ / ▬▬▬ι═══════ﺤ / ▬▬▬ι═══════ﺤ / ▬▬▬ι═══════ﺤ\x1b[0m')


    } catch (error) {
        throw new Error(`error in the database connection ${error}`)
    }
}

module.exports = {
    dbConnection
}