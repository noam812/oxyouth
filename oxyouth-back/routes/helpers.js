
 function dbMethodHandler(dbOperation) {
    return async (req, res) => {
      try {
        const result = await dbOperation(req);
        res.send(result);
      } catch (err) {
        res.status(400).send({ message: err });
        console.error(err);
      }
    };
  }

  module.exports = dbMethodHandler;