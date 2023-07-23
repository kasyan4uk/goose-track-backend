const validateUpdate = (schema) => {
  const func = (req, res, next) => {
    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
      res.status(400).json({
        message: "missing field favorite",
      });
      return;
    };
  };
  return func;
}

module.exports = validateUpdate;