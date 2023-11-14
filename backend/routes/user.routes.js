const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
//* Auth Controller
const userController = require("../controllers/user.controller");

router.use(auth);

//* PATCH-> '/auth/signup' to login a user
router.patch("/update/:id", userController.updateUser);


module.exports = router;