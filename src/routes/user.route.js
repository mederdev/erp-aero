const express = require("express");
const router = express.Router();

const userController = require('../controllers/user.controller');
const jwtStrategy = require('../middlewares/verifyToken');

router.get("/info", jwtStrategy.verifyAccessToken, userController.getInfo);
router.get('/logout', jwtStrategy.verifyAccessToken, userController.logOut);
router.post('/signin', userController.signIn)
router.post('/signup', userController.signUp)
router.post("/signin/new_token", userController.generateToken);

module.exports = router;
