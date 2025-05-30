const errormiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    const extradetails = err.extradetails || "Something went wrong";
    res.status(status).json({
        message,
        extradetails,
    });
}

export default errormiddleware;