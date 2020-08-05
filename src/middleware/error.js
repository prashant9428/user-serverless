const errorMiddle = (error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message;
    const validationErr = error.validation
    res.status(status).json({
        status,
        message,
        validationErr
    });
};

module.exports = errorMiddle;