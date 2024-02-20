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
                events: event,
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
                msg: 'event created successfully.',
                event
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

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById( eventId );

        if ( !event ) {
            ResponseDB({
                res,
                statusCode: 404,
                jsonResponse: {
                    ok: false,
                    msg: 'this event does not exists',
                }
            });
        }

        if ( event.user.toString() !== uid ) {
            return  ResponseDB({
                res,
                statusCode: 401,
                jsonResponse:{
                    ok:false,
                    msg:'You are not the owner of this event'
                }
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        await Event.findByIdAndUpdate( eventId, newEvent, { new: true } );

        ResponseDB({
            res,
            statusCode: 200,
            jsonResponse: {
                ok: true,
                msg: 'Event updated',
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

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById( eventId );

        if ( !event ) {
            ResponseDB({
                res,
                statusCode: 404,
                jsonResponse: {
                    ok: false,
                    msg: 'this event does not exists',
                }
            });
        }

        if ( event.user.toString() !== uid ) {
            return  ResponseDB({
                res,
                statusCode: 401,
                jsonResponse:{
                    ok:false,
                    msg:'You are not the owner of this event'
                }
            })
        }

        await Event.findByIdAndDelete( eventId );

        ResponseDB({
            res,
            statusCode: 200,
            jsonResponse: {
                ok: true,
                msg: 'event deleted successfully',
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