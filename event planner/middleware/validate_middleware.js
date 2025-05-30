const validateMiddleware = (schema) => async (req, res, next) => {
  try {  
    const parsebody = await schema.parseAsync(req.body);
    req.body = parsebody;
    next();
    
  } catch (err) {
      //return res.status(400).json({ error: error.details[0].message });
  const status =  422;
  const message = "Validation Error";
  const extradetails = err.errors[0].message ;
  const error ={
    status,
    message,
    extradetails,
  };
  next(error);
  }

  }

  export default validateMiddleware;
