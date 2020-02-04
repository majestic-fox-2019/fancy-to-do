'use strict';

module.exports = {
    errorHandler(err, req, res, next) {
        console.log(err);
        let status = null;
        let message = null;

        if(err.name === 'JsonWebToken') {
            status = 400;
            message = 'Please login first';
        } else if(err.name === 'ValidationError') {
            status = 400;
            let arrMessage = [];
            for(const key in err) {
                arrMessage.push(err.errors[key].message);
            }
            message = arrMessage;
        } else {
            status = err.status || 500;
            message = err.message || 'Internal server error';
        }

        res.status(status).json({ error: message });
    }
}