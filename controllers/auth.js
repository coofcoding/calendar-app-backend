const { response } = require('express');
const User = require('../models/Users');
const ResponseDB = require('../middlewares/ResponseDB');

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
                    msg: 'This user already exist, please login or click the "do you forget your password?" link'
                }
            })
        }

        user = new User(req.body);

        await user.save();

        ResponseDB({
            res,
            statusCode: 201,
            jsonResponse: {
                ok: true,
                uid: user.id,
                name: user.name
            }
        })

    } catch (error) {
        
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

const userLogin = (req, res = response) => {

    const { email, password } = req.body;


    res.json({
        ok: true,
        msg: 'login',
        email,
        password,
    })

}

const reNewToken = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'renew'
    })

}

module.exports = {
    createUser,
    userLogin,
    reNewToken
}