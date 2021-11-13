import createError from "http-errors";

import {JWTAuthenticate, refreshTokens } from "../middlewares/login.middleware.js"
import Client from "../services/customers/clientsSchema.js"
// 1. GET all
// 2. GET Single
// 3. POST Create Single
// 4. PUT Single
// 5. DELETE Single
// 6. REFRESH Token
// 7. LOGIN Single
// 8. LOUGOUT Single


// 1. GET ALL **************************************************************************************/
export const getAllClients = async (req, res, next) => {
  try {
    const clients = await Client.find();
    res.send(clients);
  } catch (error) {
    next();
  }
};

// 2. GET SINGLE with Auth **************************************************************************************/

export const getSingleClient = async (req, res, next) => {
  try {
    const client = await Client.findbyId(req.params.clientID);
    if (!client) {
      return next(
        createError(404, `Client with ID: ${req.params.clientID} not found`)
      );
    }
    res.send(req.client);
  } catch (error) {
    next(error);
  }
};

// 2. GET SINGLE with Auth **************************************************************************************/
export const getMe = async (req, res, next) => {
  try {
    res.send(req.client);
  } catch (error) {
    next(error);
  }
};

// 3. CREATE NEW CLIENT **************************************************************************************/
export const registerClient = async (req, res, next) => {
  try {
    
    Client.findOne({ email: req.body.email }).then((client) => {
      if (client) {
        return res.status(400).json({
          email: "Email already registered, continue to login",
        });
      } else {
        const newClient = new Client(req.body);
        const { _id } = newClient.save();
        return res.status(201).json({ msg: newClient });
      }
    });
  } catch (error) {
    if (error.name === "validationError") {
      next(createError(400, error));
    }
    next(error);
  }
};

// 4. UPDATE SINGLE **************************************************************************************/

export const updateClient = async (req, res, next) => {
  const update = { ...req.body };
  try {
    const updatedClient = await Client.findbyIDandUpdate(
      req.params.clientID,
      update,
      { new: true, runValidators: true }
    );
    if (!updatedClient) {
      return next(createError(404, "Client not found"));
    }

    await req.client.save();
    res.send("Updated successfully");
  } catch (error) {
    next(error);
  }
};

// 5. DELETE SINGLE **************************************************************************************/
export const deleteClient = async (req, res, next) => {
  try {
    await Client.findByIdAndDelete(req.client._id);
    await req.client.deleteOne();
    res.status(204).send("Deleted");
  } catch (error) {
    next(error);
  }
};

// 6. REFRESH TOKEN ************************************************************************************/
export const refreshToken = async (req, res, next) => {
  try {
    const { actualRefreshToken } = req.body;
    const { accessToken, refreshToken } = await refreshTokens(
      actualRefreshToken
    );
    res.send({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

// 7. LOGIN **************************************************************************************/

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const client = await Client.checkCredentials(email, password);
    if (client) {
      const { accessToken, refreshToken } = await JWTAuthenticate(client);
      res.send({ accessToken, refreshToken });
    } else {
      next(createError(401, "Credentials not valid!"));
    }
  } catch (error) {
    next(error);
  }
};

// 8. LOUGOUT **************************************************************************************/
export const logout = async (req, res, next) => {
  try {
    req.session.destroy();
    res.clearCookie("context", { httpOnly: true });
    res.redirect(301, "/login");
  } catch (error) {
    next(error);
  }
};
