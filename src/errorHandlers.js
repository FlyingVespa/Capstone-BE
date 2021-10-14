export const unAuthorizedHandler = (err, req, res, next) => {
  if (err.status === 401) {
    res
      .status(401)
      .send(err.message || "You are not logged in or not autherized!");
  } else {
    next(err);
  }
};

export const notFoundErrHandler = (err, req, res, next) => {
  console.log(err);
  if (err.status === 404) {
    res.status(404).send(err.message || "Whoops, was not found!");
  } else {
    next(err);
  }
};

export const badReqErrHandler = (err, req, res, next) => {
  if (err.status === 400 || err.name === "ValidationError") {
    res.status(400).send(err.errrors);
  } else {
    next(err);
  }
};

export const forbiddenErrHandler = (err, req, res, next) => {
  if (err.status === 403) {
    res.status(403).send("Forbidden! You shall not pass!");
  } else {
    next(err);
  }
};

export const serverErrHandler = (err, req, res, next) => {
  res.status(500).send("Generic Server Error");
};
