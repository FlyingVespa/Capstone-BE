import express from "express";
import fs from "fs-extra";
import uniqid from "uniqid";
import createError from "http-errors";
import { validationResult } from "express-validator";
import {
  writeToFile,
  readFile,
  convertFile,
  uploadFile,
  getDataFilePath,
} from "../../utils/fs-tools.js";

export const loggerMiddleware = (req, res, next) => {
  console.log(`Request --> ${req.method} ${req.url} -- ${new Date()}`);
};
const authorsRouter = express.Router();

//1. GET ALL authors
authorsRouter.get("/", async (req, res, next) => {
  try {
    const authors = await readFile("authors.json");
    res.send(authors);
  } catch (error) {
    next(error);
  }
});

//2, GET SINGLE author
authorsRouter.get("/:authorId", async (req, res, next) => {
  try {
    const authors = await readFile("authors.json");
    const author = authors.find((author) => author._id === req.params.authorId);
    if (author) {
      res.send(author);
    } else {
      next(
        createError(
          404,
          `That author you are looking for, might be no more!  ${req.params.userId} `
        )
      );
    }
    res.send(author);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

//3. POST author
authorsRouter.post("/", async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const { first_name, last_name, email, dob } = req.body;
      const newAuthor = {
        _id: uniqid(),
        first_name,
        last_name,
        email,
        dob,
        avatar: `https://ui-avatars.com/api/?name=${first_name}+${last_name}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const authors = await readFile("authors.json");
      authors.push(newAuthor);
      await writeToFile("authors.json", authors);
      res.status(201).send({ _id: newAuthor._id });
    } else {
      next(createError(400, { erroList: errors }));
    }
  } catch (error) {
    next(error);
  }
});

//  4. PUT Single author
authorsRouter.put("/:authorId", async (req, res, next) => {
  try {
    const authors = await readFile("authors.json");
    const remainingAuthors = authors.filter(
      (author) => author._id !== req.params.authorId
    );
    const updatedAuthor = { ...req.body, _id: req.params.authorId };
    remainingAuthors.push(updatedAuthor);
    await writeToFile("authors.json", remainingAuthors);
    res.send(updatedAuthor);
    if (!authorIndex == -1) {
      createError(
        404,
        `That author you are looking for, might be no more!  ${req.params.userId} `
      );
    }
    const prevAuthorData = fileAsJSONarry[authorIndex];
    const modAuthor = {
      ...prevAuthorData,
      ...req.body,
      avatar: req.file,
      updatedAt: new Date(),
      _id: req.params.id,
    };
    fileAsJSONarry[authorIndex] = modAuthor;
    fs.writeFileSync(
      getDataFilePath("author.json"),
      JSON.stringify(fileAsJSONarry)
    );
    res.send(modAuthor);
  } catch (error) {
    next(error);
  }
});

//5. DELETE  author
authorsRouter.delete("/:authorId", async (req, res, next) => {
  try {
    const authors = await readFile("authors.json");
    const remainingAuthors = authors.filter(
      (author) => author._id !== req.params.authorId
    );

    await writeToFile("authors.json", remainingAuthors);
    res.status(200).send("Deleted!");
  } catch (error) {
    next(error);
  }
});

//POST auhthor avatar
authorsRouter.post("/:authorId/uploadAvatar", async (req, res, next) => {
  try {
    const authorsAvatar = readFile("../public");

    const newAvatar = "test";
    authorsAvatar.push(newAvatar);
    await writeToFile("../public", authorsAvatar);
  } catch (error) {}
});

authorsRouter.post(
  "/:id/avatar",
  convertFile.single("avatar"),
  uploadFile,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        const { first_name, last_name, email, dob } = req.body;
        const newAuthor = {
          _id: uniqid(),
          first_name,
          last_name,
          email,
          dob,
          avatar: `https://ui-avatars.com/api/?name=${first_name}+${last_name}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const authors = await readFile("authors.json");
        authors.push(newAuthor);
        await writeToFile("authors.json", authors);
        res.status(201).send({ _id: newAuthor._id });
      } else {
        next(createError(400, { erroList: errors }));
      }
    } catch (error) {
      next(error);
    }
  }
);

//update avatar
authorsRouter.put("/:authorId/avatar", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(getDataFilePath("author.json"));
    const fileAsString = fileAsBuffer.toString();
    let fileAsJSONarry = JSON.parse(fileAsString);
    const authorIndex = fileAsJSONarry.findIndex(
      (author) => author._id === req.params.id
    );
    if (!authorIndex == -1) {
      createError(
        404,
        `That author you are looking for, might be no more!  ${req.params.userId} `
      );
    }
    const prevAuthorData = fileAsJSONarry[authorIndex];
    const modAuthor = {
      ...prevAuthorData,
      ...req.body,
      avatar: req.file,
      updatedAt: new Date(),
      _id: req.params.id,
    };
    fileAsJSONarry[authorIndex] = modAuthor;
    fs.writeFileSync(
      getDataFilePath("author.json"),
      JSON.stringify(fileAsJSONarry)
    );
    res.send(modAuthor);
  } catch {
    next();
  }
});

export default authorsRouter;
