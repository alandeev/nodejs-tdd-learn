const routes = require('express').Router();

const { User } = require('./app/models');

User.create({
  name: "Alan",
  email: "alan@gmail.com",
  password_hash: "123456"
});

module.exports = routes;