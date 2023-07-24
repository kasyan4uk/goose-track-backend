const validateUpdate = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      res.status(400).json({
        message: `missing field favorite`,
      });
      return;
    }
    next();
  };
  return func;
}

module.exports = validateUpdate;