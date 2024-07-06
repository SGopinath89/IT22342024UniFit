const errorHandler = (err, res) => {
  //console.log(err);
  if (err.name === "ZodError") {
    const errorMessage = err.errors.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
   res.status(400).json({
        errors: "Validation Error",
        from: "errorHandler",
        messages: errorMessage,
        });
  }
  else if(err.name === "MongoError" && err.code === 11000){
    const key = Object.keys(err.keyValue)[0];
    res.status(400).json({
      errors: "Duplicate Field Error",
      from: "errorHandler",
      message: "Duplicate key error: " + key
    });
  }
  else{
    res.status(500).json({
      errors: "Internal Server Error",
      from: "errorHandler",
      message: err.message,
    });
  }
}

module.exports = errorHandler;