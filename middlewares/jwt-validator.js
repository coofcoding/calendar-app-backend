const { response } = require('express');
const jwt = require('jsonwebtoken');
const ResponseDB = require('../middlewares/ResponseDB');


const JWTValidator = (req, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return ResponseDB({
            res,
            statusCode: 401,
            jsonResponse: {
                ok: false,
                msg: 'No token in the request',
            }
        })
    }

    try {

        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid;
        req.name = name;

    } catch (error) {
        return ResponseDB({
            res,
            statusCode: 401,
            jsonResponse: {
                ok: false,
                msg: 'Not valid token',
            }
        })
    }

    next();

}

module.exports = {
    JWTValidator
}
