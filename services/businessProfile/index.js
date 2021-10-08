import express from "express";

const businessRouter = express.Router();

// READ ALL
businessRouter.get("/", (req, res) => {
  console.log("URL ->", req.url);
  res.status(404).send;
});

// READ INDIVIDUAL

businessRouter.get("/:id", (req, res) => {
  res.semd("Single Endpoint");
});
// POST
businessRouter.post("/", (req, res) => {
  res.send("Hello I'm the post users endpoint");
});

// PUT
businessRouter.put("/:id", (req, res) => {
  res.send("PUT single user endpoint");
});
// DEL
businessRouter.delete("/:id", (req, res) => {
  res.send("DELETE single user endpoint");
});
// DELETE
