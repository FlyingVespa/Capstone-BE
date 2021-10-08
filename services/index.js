import { Router } from "express";

import Model from "../../utils/model/index.js";

const route = Router();

const Authors = new Model("authors", "author_id");

route.get("/", async (req, res, next) => {
  try {
    const dbResponse = await Authors.find(req.query);
    res.send(dbResponse);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
route.get("/:id", async (req, res, next) => {
  try {
    const dbResponse = await Authors.findById(req.params.id);
    res.send(dbResponse);
  } catch (error) {
    res.status(error.code || 500).send({ error: error.message });
  }
});
route.put("/:id", async (req, res, next) => {
  try {
    const dbResponse = await Authors.update(req.params.id, req.body);
    res.send(dbResponse);
  } catch (error) {
    res.status(500).send({ error });
  }
});
route.post("/", async (req, res, next) => {
  try {
    const dbResponse = await Authors.create(req.body);
    res.send(dbResponse);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
route.delete("/:id", async (req, res, next) => {
  try {
    const dbResponse = await Authors.deleteById(req.params.id);
    res.send(dbResponse);
  } catch (error) {
    res.status(500).send({ error });
  }
});

export default route;
