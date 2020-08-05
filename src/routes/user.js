const express = require("express");
const route = express.Router();
const userModel = require("../models/user");
const { validationHandler } = require("../util/validatorHandler");
const { userValidation } = require("../util/validate");
/*create new user*/
route.post("/signup/", userValidation, async (req, res) => {
  validationHandler(req);
  const user = userModel.build({
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    password: req.body.password,
    email: req.body.email,
  });
  await user.save();
  res.status(201).send(user);
});
/*get all users*/
route.get("/user/", async (req, res) => {
  const users = await userModel.findAll();
  if (users.length == 0) {
    const err = new Error("Not found");
    err.status = 400;
    throw err;
  }
  res.status(200).json(users);
});
/* get user by id */
route.get("/user/:id", async (req, res) => {
  const user = await userModel.findOne({
    attributes: {
      exclude: ["password", "createdAt", "updatedAt"],
    },
    where: {
      id: req.params.id,
    },
  });
  if (!user) {
    const err = new Error("Not found");
    err.status = 400;
    throw err;
  }
  res.status(200).send(user);
});

/* update user */
route.patch("/update/:id", async (req, res) => {
  const user = await userModel.findOne({ where: { id: req.params.id } });
  if (!user) {
    const err = new Error("Not found");
    err.status = 400;
    throw err;
  }
  user.firstName = req.body.firstname;
  user.lastName = req.body.lastname;
  await user.save();
  res.status(200).json(user);
});

/* Delete the user */
route.delete("/delete/:id", async (req, res) => {
  const user = await userModel.findOne({ where: { id: req.params.id } });
  if (!user) {
    const err = new Error("user not found");
    err.status = 400;
    throw err;
  }
  await user.destroy();
  res.status(200).json({ message: "Deleted successfully" });
});
module.exports = route;
