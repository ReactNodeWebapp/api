function errorHandler(err, req, res, next) {
    switch(err) {
        case 'NOT_REGISTERED': {
            return res
                .status(401)
                .json({
                    message: 'User with given e-mail address is not registered.',
                    hasErrors: true
                });
        }
        case 'BAD_CREDENTIAL': {
            return res
                .status(401)
                .json({
                    message: 'Incorrect password.',
                    hasErrors: true
                });
        }
        case 'ALREADY_EXISTING_USER': {
            return res
                .status(409)
                .json({
                    message: 'Given e-mail address is already registered.',
                    hasErrors: true
                });
        }
    }
}

module.exports = errorHandler;