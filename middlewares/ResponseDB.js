
const ResponseDB = ( { res, statusCode, jsonResponse } ) => {

    res.status( statusCode ).json(jsonResponse);

}

module.exports = ResponseDB;