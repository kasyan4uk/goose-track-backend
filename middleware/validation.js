const validation = (schema) => {
  const func = (req, res, next) => {
    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
      res.status(400).json({
        message: "missing fields",
      });
      return;
    }

    const { error } = schema.validate(req.body);

    if (error) {
      const errorMessage = res.status(400).json({
        message: `${error.details[0].message}`,
      });

        return errorMessage;
    }
    next();
  };
  return func;
};



module.exports = validation;