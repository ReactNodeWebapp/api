function errorHandler(err, req, res, next) {
    switch(err) {
        case 'NOT_REGISTERED': {
            return res
                .status(401)
                .json({
                    message: 'Given e-mail address is not registered.',
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
        case 'NO_TOKEN': {
            return res
                .status(401)
                .json({
                    status: false,
                    message: 'Unauthorized access. Please Sign In.',
                    hasErrors: true
                })
        }
        case 'EXPIRED_SESSION': {
            return res
                .clearCookie("token")
                .status(401)
                .json({
                    status: false,
                    message: 'Your session has expired. Please Sign In again.',
                    hasErrors: true
                });
        }
    }
}

module.exports = errorHandler;