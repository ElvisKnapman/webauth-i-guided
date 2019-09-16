const db = require("../database/dbConfig.js");
const Users = require("../users/users-model.js");
const bcrypt = require("bcryptjs");

const validateUser = (req, res, next) => {
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      const check = bcrypt.compareSync(password, user.password);
      if (user && check) {
        req.user = user;
        next();
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
};

module.exports = {
  validateUser
};
