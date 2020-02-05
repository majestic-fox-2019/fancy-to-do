const { createError } = require('../helper/helper')

module.exports = (err, req, res, next) => {
    console.log(err)
    switch (err.name) {
        case 'SequelizeValidationError': {
            res.status(400).json(createError(err))
            break
        }

        case 'NotFoundError': {
            res.status(404).json({ message: err.message })
            break
        }

        case 'ConflictError': {
            res.status(409).json({ message: err.message })
            break
        }

        case 'JsonWebTokenError': {
            res.status(406).json({ message: err.message })
            break
        }

        case 'ForbiddenError' : {
            res.status(403).json({ message: err.message })
            break
        }

        case 'UnauthorizedError' : {
            res.status(401).json({ message: err.message })
            break
        }
        default: {
            res.status(500).json({
                message: 'Internal server error'
            })
        }
    }
}