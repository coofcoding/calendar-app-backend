const { response } = require('express');
const Event = require('../models/Events');
const ResponseDB = require('../middlewares/ResponseDB');
const { JWTGenerator } = require('../helpers/jwt');

const getEvents = async (req, res = response) => {

    const event = await Event.find()
                             .populate('user', 'name')
    
    try {

        ResponseDB({
            res,
            statusCode: 200,
            jsonResponse: {
                ok: true,
                msg: event,
            }
        });

    } catch (error) {
        console.log(error)
        ResponseDB({
            res,
            statusCode: 500,
            jsonResponse: {
                ok: false,
                msg: 'Please contact us for solve this error'
            }
        })
    }

}
const createEvent = async (req, res = response) => {

    const event = new Event( req.body );

    try {

        event.user = req.uid;

        await event.save();

        ResponseDB({
            res,
            statusCode: 200,
            jsonResponse: {
                ok: true,
                msg: 'createEvent',
            }
        });

    } catch (error) {
        console.log(error)
        ResponseDB({
            res,
            statusCode: 500,
            jsonResponse: {
                ok: false,
                msg: 'Please contact us for solve this error'
            }
        })
    }

}
const updateEvent = async (req, res = response) => {

    try {

        ResponseDB({
            res,
            statusCode: 200,
            jsonResponse: {
                ok: true,
                msg: 'updateEvent',
            }
        });

    } catch (error) {
        console.log(error)
        ResponseDB({
            res,
            statusCode: 500,
            jsonResponse: {
                ok: false,
                msg: 'Please contact us for solve this error'
            }
        })
    }

}
const deleteEvent = async (req, res = response) => {

    try {

        ResponseDB({
            res,
            statusCode: 200,
            jsonResponse: {
                ok: true,
                msg: 'deleteEvent',
            }
        });

    } catch (error) {
        console.log(error)
        ResponseDB({
            res,
            statusCode: 500,
            jsonResponse: {
                ok: false,
                msg: 'Please contact us for solve this error'
            }
        })
    }

}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}