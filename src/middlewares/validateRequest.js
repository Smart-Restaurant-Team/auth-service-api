// middlewares/validate.js

const validateRequest = (schema) => (req, res, next) => {
  try {
    const result = schema.parse(req.body);
    req.validated = true
    next();
  } catch (err) {
    console.log("error",err)
    const formatedError = JSON.parse(err)
    return res.status(400).json({error : formatedError});
  }
};


export default validateRequest