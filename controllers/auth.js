const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/Users');
const ResponseDB = require('../middlewares/ResponseDB');
const { JWTGenerator } = require('../helpers/jwt');

const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });

        if (user) {
            return ResponseDB({
                res,
                statusCode: 400,
                jsonResponse: {
                    ok: false,
                    msg: 'This email already exists, please login or create a new account'
                }
            })
        }

        user = new User(req.body);

        // * Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const token = await JWTGenerator( user.id, user.name );

        ResponseDB({
            res,
            statusCode: 201,
            jsonResponse: {
                ok: true,
                uid: user.id,
                name: user.name,
                token
            }
        })

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
        // res.status(500).json({
        //     ok: false,
        //     msg: 'Please contact us for solve this error'
        // })
    }

}

const userLogin = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return ResponseDB({
                res,
                statusCode: 400,
                jsonResponse: {
                    ok: false,
                    msg: 'Incorrect email or password'
                }
            })
        }

        // * Confirm passwords
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return ResponseDB({
                res,
                statusCode: 400,
                jsonResponse: {
                    ok: false,
                    msg: 'Incorrect password'
                }
            })
        }

        // * Generate JSON Web Token
        const token = await JWTGenerator( user.id, user.name );

        ResponseDB({
            res,
            statusCode: 200,
            jsonResponse: {
                ok: true,
                uid: user.id,
                name: user.name,
                token
            }
        })

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

const reNewToken = async (req, res = response) => {

    const { uid, name } = req;

    const token = await JWTGenerator( uid, name );

    ResponseDB({
        res,
        statusCode: 200,
        jsonResponse: {
            ok: true,
            token
        }
    })

}

module.exports = {
    createUser,
    userLogin,
    reNewToken
}